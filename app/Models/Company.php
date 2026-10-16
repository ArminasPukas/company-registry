<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory;
    protected $fillable = [];
    protected $table = 'companies';
    
    public function sodra_monthly_company_stats(): HasMany{
        return $this->hasMany(SodraMonthlyCompanyStat::class,'company_code','company_code');
    }
}
