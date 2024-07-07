<?php

namespace App\Actions\Fortify;

class CurrencyConversionService
{
    protected $freeCurrencyApiService;

    public function __construct(FreeCurrencyApiService $freeCurrencyApiService)
    {
        $this->freeCurrencyApiService = $freeCurrencyApiService;
    }

    public function convert($amount, $from, $to)
    {
        $rates = $this->freeCurrencyApiService->getConversionRates();

        if ($from === 'usd' && $to === 'eur') {
            return $amount * $rates['EUR'];
        } elseif ($from === 'eur' && $to === 'usd') {
            return $amount / $rates['EUR'];
        }

        return $amount;
    }
}