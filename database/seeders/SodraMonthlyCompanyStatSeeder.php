<?php

namespace Database\Seeders;

use Database\Seeders\Traits\ImportCsv;
use Illuminate\Database\Seeder;

class SodraMonthlyCompanyStatSeeder extends Seeder
{
    use ImportCsv;

    public function run(): void
    {
        $this->import(
            tableName: 'sodra_monthly_company_stats',
            filePath: base_path('database/data/monthly-2026.csv'),
            delimiter: ';',
            rowMapper: fn($data, $now) => [
                'insurer_code' => $data[0] ?? null,
                'company_code' => filled($data[1] ?? null) ? $data[1] : null,
                'company_name' => $data[2] ?? null,
                'municipality' => filled($data[3] ?? null) ? $data[3] : null,

                'eco_act_code' => filled($data[4] ?? null) ? $data[4] : null,
                'eco_act_code_str' => filled($data[5] ?? null) ? $data[5] : null,
                'eco_act_name' => filled($data[6] ?? null) ? $data[6] : null,

                'month' => $data[7] ?? null,

                'avg_wage' => filled($data[8] ?? null) ? $data[8] : null,
                'num_insured' => $data[9] ?? null,
                'avg_wage_2' => filled($data[10] ?? null) ? $data[10] : null,
                'num_insured_2' => $data[11] ?? null,

                'tax' => filled($data[12] ?? null) ? $data[12] : null,

            ]
        );
    }
}
