<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\Traits\ImportCsv;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    use ImportCsv;
    public function run(): void
    {
        $this->import(
            tableName: 'companies',
            filePath: base_path('database/data/companies.csv'),
            delimiter: '|',
            rowMapper: fn($data, $now) => [
                'company_code'      => $data[0] ?? null,
                'company_name'      => $data[1] ?? '',
                'company_name_slug'      => $this->processCompanyName($data[1]) ?? '',
                'address'           => $data[2] ?? null,
                'registration_date' => !empty($data[3]) ? $data[3] : null,
                'form_code'         => $data[4] ?? null,
                'form_name'         => $data[5] ?? null,
                'status_code'       => $data[6] ?? null,
                'status_name'       => $data[7] ?? null,
                'formation_date'    => !empty($data[8]) ? $data[8] : null,
                'created_at'        => $now,
                'updated_at'        => $now,
            ]
        );
    }

    public function processCompanyName(string $inputString): string|null
    {
        preg_match('/"([^"]+)"/', $inputString, $matches);

        $companyName = $matches[1] ?? null;

        if (!$companyName) {
            return Str::slug($inputString);
        }

        $slug = Str::slug($companyName);

        return $slug;
    }
}
