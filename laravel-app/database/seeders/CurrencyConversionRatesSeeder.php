<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CurrencyConversionRate;
use App\Actions\Fortify\FreeCurrencyApiService;

class CurrencyConversionRatesSeeder extends Seeder
{
    protected $freeCurrencyApiService;

    public function __construct(FreeCurrencyApiService $freeCurrencyApiService)
    {
        $this->freeCurrencyApiService = $freeCurrencyApiService;
    }

    public function run()
    {
        $rates = $this->freeCurrencyApiService->getConversionRates();

        // Insert into database
        CurrencyConversionRate::create([
            'usd_to_eur' => $rates['EUR'],
            'eur_to_usd' => 1 / $rates['EUR'], // Reverse conversion rate
        ]);
    }
}
