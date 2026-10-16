<?php

namespace Database\Seeders\Traits;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * @property Command $command
 */

trait ImportCsv
{
    /**
     * Declare the method as public static
     */
    public function import(
        string $tableName,
        string $filePath,
        callable $rowMapper,
        string $delimiter = '|',
        int $batchSize = 1000,
    ): int {
        if (!file_exists($filePath)) {
            $this->outputError("❌ File not found at: {$filePath}");
            return 0;
        }

        DB::table($tableName);

        $file = fopen($filePath, 'r');
        $firstLine = true;
        $records = [];
        $totalInserted = 0;
        $now = now();

        $this->outputInfo("🚀 Starting CSV import into '{$tableName}'...");
        while (($data = fgetcsv($file, 0, $delimiter)) !== false) {
            if ($firstLine) {
                $firstLine = false;
                continue;
            }

            if (empty($data) || count($data) < 2) {
                continue;
            }

            $mapped = $rowMapper($data, $now);
            if (!empty($mapped)) {
                $records[] = $mapped;
            }

            if (count($records) >= $batchSize) {
                DB::table($tableName)->insert($records);
                $totalInserted += count($records);
                $this->outputInfo("   Inserted {$totalInserted} records...");
                $records = [];
            }
        }

        if (!empty($records)) {
            DB::table($tableName)->insert($records);
            $totalInserted += count($records);
        }

        fclose($file);
        
        $this->outputInfo("🎉 Done! Total records inserted into '{$tableName}': {$totalInserted}");

        return $totalInserted;
    }

    protected function outputInfo(string $message): void
    {
        if (isset($this->command)) {
            $this->command->info($message);
        }
    }

    protected function outputError(string $message): void
    {
        if (isset($this->command)) {
            $this->command->error($message);
        }
    }
}