<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sodra_monthly_company_stats', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('insurer_code');
            $table->foreignId('company_code')->nullable();
            // $table->foreignId('company_code')->nullable()->constrained('companies','company_code');
            $table->string('company_name');

            $table->unsignedInteger('month');

            $table->decimal('avg_wage', 10, 2)->nullable();
            $table->decimal('avg_wage_2', 10, 2)->nullable();
            $table->unsignedInteger('num_insured')->default(0);
            $table->unsignedInteger('num_insured_2')->default(0);
            $table->decimal('tax', 12, 2)->nullable();

            // Veiklos ir savivaldybės duomenys
            $table->string('eco_act_name')->nullable();
            $table->decimal('eco_act_code', 8, 2)->nullable();
            $table->string('eco_act_code_str', 20)->nullable();
            $table->string('municipality', 100)->nullable();

            $table->timestamps();

            $table->index('month');
            $table->index('company_code');
            $table->index('municipality');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sodra_monthly_company_stats');
    }
};
