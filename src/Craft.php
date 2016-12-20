<?php
/**
 * @link      https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license   https://craftcms.com/license
 */

use craft\db\Query;
use craft\helpers\FileHelper;
use craft\services\Config;
use GuzzleHttp\Client;
use yii\base\ExitException;
use yii\helpers\VarDumper;
use yii\web\Request;

/**
 * Craft is helper class serving common Craft and Yii framework functionality.
 *
 * It encapsulates [[Yii]] and ultimately [[YiiBase]], which provides the actual implementation.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since  3.0
 */
class Craft extends Yii
{
    // Constants
    // =========================================================================

    // Edition constants
    const Personal = 0;
    const Client = 1;
    const Pro = 2;

    // Properties
    // =========================================================================

    /**
     * @var \craft\web\Application The application instance.
     *
     * This may return a [[\craft\console\Application]] instance if this is a console request.
     */
    public static $app;

    /**
     * @var array The default cookie configuration.
     */
    private static $_baseCookieConfig;

    // Public Methods
    // =========================================================================

    /**
     * Displays a variable.
     *
     * @param mixed   $var       The variable to be dumped.
     * @param integer $depth     The maximum depth that the dumper should go into the variable. Defaults to 10.
     * @param boolean $highlight Whether the result should be syntax-highlighted. Defaults to true.
     *
     * @return void
     */
    public static function dump($var, $depth = 10, $highlight = true)
    {
        VarDumper::dump($var, $depth, $highlight);
    }

    /**
     * Displays a variable and ends the request. (“Dump and die”)
     *
     * @param mixed   $var       The variable to be dumped.
     * @param integer $depth     The maximum depth that the dumper should go into the variable. Defaults to 10.
     * @param boolean $highlight Whether the result should be syntax-highlighted. Defaults to true.
     *
     * @return void
     * @throws ExitException if the application is in testing mode
     */
    public static function dd($var, $depth = 10, $highlight = true)
    {
        VarDumper::dump($var, $depth, $highlight);
        static::$app->end();
    }

    /**
     * Generates and returns a cookie config.
     *
     * @param array        $config  Any config options that should be included in the config.
     * @param Request|null $request The request object
     *
     * @return array The cookie config array.
     */
    public static function cookieConfig(array $config = [], $request = null)
    {
        if (self::$_baseCookieConfig === null) {
            $configService = static::$app->getConfig();

            $defaultCookieDomain = $configService->get('defaultCookieDomain');
            $useSecureCookies = $configService->get('useSecureCookies');

            if ($useSecureCookies === 'auto') {
                if ($request === null) {
                    $request = static::$app->getRequest();
                }

                $useSecureCookies = $request->getIsSecureConnection();
            }

            self::$_baseCookieConfig = [
                'domain' => $defaultCookieDomain,
                'secure' => $useSecureCookies,
                'httpOnly' => true
            ];
        }

        return array_merge(self::$_baseCookieConfig, $config);
    }

    /**
     * Class autoloader.
     *
     * @param string $className
     *
     * @return void
     */
    public static function autoload($className)
    {
        if (
            $className === \craft\behaviors\ContentBehavior::class ||
            $className === \craft\behaviors\ContentTrait::class ||
            $className === \craft\behaviors\ElementQueryBehavior::class ||
            $className === \craft\behaviors\ElementQueryTrait::class
        ) {
            $storedFieldVersion = static::$app->getInfo()->fieldVersion;
            $compiledClassesPath = static::$app->getPath()->getRuntimePath().DIRECTORY_SEPARATOR.'compiled_classes';

            $contentBehaviorFile = $compiledClassesPath.DIRECTORY_SEPARATOR.'ContentBehavior.php';
            $contentTraitFile = $compiledClassesPath.DIRECTORY_SEPARATOR.'ContentTrait.php';
            $elementQueryBehaviorFile = $compiledClassesPath.DIRECTORY_SEPARATOR.'ElementQueryBehavior.php';
            $elementQueryTraitFile = $compiledClassesPath.DIRECTORY_SEPARATOR.'ElementQueryTrait.php';

            if (
                static::_isFieldAttributesFileValid($contentBehaviorFile, $storedFieldVersion) &&
                static::_isFieldAttributesFileValid($contentTraitFile, $storedFieldVersion) &&
                static::_isFieldAttributesFileValid($elementQueryBehaviorFile, $storedFieldVersion) &&
                static::_isFieldAttributesFileValid($elementQueryTraitFile, $storedFieldVersion)
            ) {
                return;
            }

            // Get the field handles
            $fieldHandles = (new Query())
                ->select(['handle'])
                ->distinct(true)
                ->from(['{{%fields}}'])
                ->column();

            $properties = [];
            $methods = [];
            $propertyDocs = [];
            $methodDocs = [];

            foreach ($fieldHandles as $handle) {
                $properties[] = <<<EOD
    /**
     * @var mixed Value for field with the handle “{$handle}”.
     */
    public \${$handle};
EOD;

                $methods[] = <<<EOD
    /**
     * Sets the [[{$handle}]] property.
     * @param mixed \$value The property value
     * @return \\yii\\base\\Component The behavior’s owner component
     */
    public function {$handle}(\$value)
    {
        \$this->{$handle} = \$value;
        return \$this->owner;
    }
EOD;

                $propertyDocs[] = " * @property mixed \${$handle} Value for the field with the handle “{$handle}”.";
                $methodDocs[] = " * @method \$this {$handle}(\$value) Sets the [[{$handle}]] property.";
            }

            static::_writeFieldAttributesFile(
                static::$app->getBasePath().DIRECTORY_SEPARATOR.'behaviors'.DIRECTORY_SEPARATOR.'ContentBehavior.php.template',
                ['{VERSION}', '/* PROPERTIES */'],
                [$storedFieldVersion, implode("\n\n", $properties)],
                $contentBehaviorFile
            );

            static::_writeFieldAttributesFile(
                static::$app->getBasePath().DIRECTORY_SEPARATOR.'behaviors'.DIRECTORY_SEPARATOR.'ContentTrait.php.template',
                ['{VERSION}', '{PROPERTIES}'],
                [$storedFieldVersion, implode("\n", $propertyDocs)],
                $contentTraitFile
            );

            static::_writeFieldAttributesFile(
                static::$app->getBasePath().DIRECTORY_SEPARATOR.'behaviors'.DIRECTORY_SEPARATOR.'ElementQueryBehavior.php.template',
                ['{VERSION}', '/* METHODS */'],
                [$storedFieldVersion, implode("\n\n", $methods)],
                $elementQueryBehaviorFile
            );

            static::_writeFieldAttributesFile(
                static::$app->getBasePath().DIRECTORY_SEPARATOR.'behaviors'.DIRECTORY_SEPARATOR.'ElementQueryTrait.php.template',
                ['{VERSION}', '{METHODS}'],
                [$storedFieldVersion, implode("\n", $methodDocs)],
                $elementQueryTraitFile
            );
        }
    }

    /**
     * Returns a PSR-7 Guzzle client created with config options merged.
     *
     * @param array $config Any request specific config options to merge in.
     *
     * @return Client
     */
    public static function createGuzzleClient(array $config = [])
    {
        // Set the Craft header by default.
        $defaultConfig = [
            'headers' => [
                'User-Agent' => 'Craft/'.Craft::$app->version.' '.\GuzzleHttp\default_user_agent()
            ],
        ];

        // Grab the config from craft/config/guzzle.php that is used on every Guzzle request.
        $guzzleConfig = Craft::$app->getConfig()->getConfigSettings(Config::CATEGORY_GUZZLE);

        // Merge default into guzzle config.
        $guzzleConfig = array_replace_recursive($guzzleConfig, $defaultConfig);

        // Maybe they want to set some config options specifically for this request.
        $guzzleConfig = array_replace_recursive($guzzleConfig, $config);

        return new Client([
            $guzzleConfig
        ]);
    }

    /**
     * Determines if a field attribute file is valid.
     *
     * @param string $path
     * @param string $storedFieldVersion
     *
     * @return boolean
     */
    private static function _isFieldAttributesFileValid($path, $storedFieldVersion)
    {
        if (file_exists($path)) {
            // Make sure it's up-to-date
            $f = fopen($path, 'rb');
            $line = fgets($f);
            fclose($f);

            if (preg_match('/\/\/ v([a-zA-Z0-9]{12})/', $line, $matches)) {
                if ($matches[1] === $storedFieldVersion) {
                    include $path;

                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Writes a field attributes file.
     *
     * @param $templatePath
     * @param $search
     * @param $replace
     * @param $destinationPath
     */
    private static function _writeFieldAttributesFile($templatePath, $search, $replace, $destinationPath)
    {
        $fileContents = file_get_contents($templatePath);
        $fileContents = str_replace($search, $replace, $fileContents);
        FileHelper::writeToFile($destinationPath, $fileContents);
        include $destinationPath;
    }
}

spl_autoload_register(['Craft', 'autoload'], true, true);
