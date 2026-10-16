<?php

use App\Http\Controllers\CompanyController;
use App\Models\Company;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $top_companies = Company::inRandomOrder()->limit(5)->get();
    $company_count = Company::count();
    $companies_registered_this_year = Company::whereYear('registration_date', now()->year)->count();

    return Inertia::render('welcome', [
        'top_companies' => $top_companies,
        'company_count' => $company_count,
        'companies_registered_this_year' => $companies_registered_this_year

    ]);
})->name('home');

Route::controller(CompanyController::class)->group(function () {});

Route::post('/companies/search', [CompanyController::class, 'search'])->name('companies.search');
Route::resource('companies', CompanyController::class);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});


require __DIR__ . '/settings.php';
