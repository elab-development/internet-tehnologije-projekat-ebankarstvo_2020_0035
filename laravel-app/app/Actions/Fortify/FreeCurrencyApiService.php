<?php

namespace App\Actions\Fortify;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class FreeCurrencyApiService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('FREECURRENCYAPI_KEY');
    }

    public function getConversionRates()
    {
        // Check if rates are cached
        if (Cache::has('conversion_rates')) {
            return Cache::get('conversion_rates');
        }

        $response = $this->client->get('https://api.freecurrencyapi.com/v1/latest', [
            'query' => [
                'apikey' => $this->apiKey,
                'base_currency' => 'USD',
                'currencies' => 'EUR'
            ]
        ]);

        $rates = json_decode($response->getBody()->getContents(), true);

        // Cache the rates for an hour
        Cache::put('conversion_rates', $rates['data'], 3600);

        return $rates['data'];
    }
}