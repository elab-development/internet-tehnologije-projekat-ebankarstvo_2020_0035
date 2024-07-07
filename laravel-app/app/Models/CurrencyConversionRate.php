<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CurrencyConversionRate extends Model
{
    protected $fillable = [
        'usd_to_eur',
        'eur_to_usd',
    ];

}