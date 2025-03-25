<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrencyConversionRatesTable extends Migration
{
    public function up()
    {
        Schema::create('currency_conversion_rates', function (Blueprint $table) {
            $table->id();
            $table->decimal('usd_to_eur', 8, 4);
            $table->decimal('eur_to_usd', 8, 4);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('currency_conversion_rates');
    }
}
