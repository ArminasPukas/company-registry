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
        Schema::create('companies', function (Blueprint $table) {
            $table->id('company_code');
            $table->string('company_name');
            $table->string('company_name_slug');
            $table->string('address');
            $table->string('registration_date');
            $table->integer('form_code');
            $table->string('form_name');
            $table->integer('status_code');
            $table->string('status_name');
            $table->date('formation_date');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
