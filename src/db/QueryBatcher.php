<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\db;

use craft\base\Batchable;
use yii\db\Connection as YiiConnection;
use yii\db\Query as YiiQuery;
use yii\db\QueryInterface;

/**
 * QueryBatcher provides a [[Batchable]] wrapper for a given [[QueryInterface]] object.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 4.4.0
 */
class QueryBatcher implements Batchable
{
    /**
     * Constructor
     *
     * :::warning
     * The query should have [[QueryInterface::orderBy()|`orderBy`]] set on it, ideally to the table’s primary key
     * column. That will ensure that the rows returned in result batches are consecutive.
     * :::
     *
     * @param QueryInterface $query
     * @param YiiConnection|null $db
     */
    public function __construct(
        private QueryInterface $query,
        private ?YiiConnection $db = null,
    ) {
    }

    /**
     * @inheritdoc
     */
    public function count(): int
    {
        try {
            // we can't rely on Yii's ->count() as that doesn't take offset and limit into consideration when counting
            // https://github.com/yiisoft/yii2/issues/13846
            // https://github.com/craftcms/cms/issues/13387
            // https://github.com/craftcms/cms/issues/12526
            $count = $this->query->count(db: $this->db);

            if (isset($this->query->offset)) {
                $count = max($count - (int)$this->query->offset, 0);
            }

            if (isset($this->query->limit)) {
                $count = min((int)$this->query->limit, $count);
            }

            return $count;
        } catch (QueryAbortedException) {
            return 0;
        }
    }

    /**
     * @inheritdoc
     */
    public function getSlice(int $offset, int $limit): iterable
    {
        /** @var YiiQuery $query */
        $query = $this->query;

        if (is_int($query->limit)) {
            // Don't go passed the query's limit
            if ($offset >= $query->limit) {
                return [];
            }
            $limit = min($limit, $query->limit - $offset);
        }

        $queryOffset = $query->offset;
        $queryLimit = $query->limit;

        try {
            $slice = $query
                ->offset((is_int($queryOffset) ? $queryOffset : 0) + $offset)
                ->limit($limit)
                ->all();
        } catch (QueryAbortedException) {
            $slice = [];
        }

        $query->offset($queryOffset);
        $query->limit($queryLimit);

        return $slice;
    }
}
