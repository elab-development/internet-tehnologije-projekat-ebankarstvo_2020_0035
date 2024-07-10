<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate the tables
        \App\Models\Transaction::truncate();
        \App\Models\Account::truncate();
        \App\Models\User::truncate();
        \App\Models\Category::truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Seed the tables
        \App\Models\Transaction::factory(3)->create();

        \App\Models\User::factory()->create([
            'name' => 'Petar Petrovic',
            'email' => 'petar@example.com',
        ]);

        $user = \App\Models\User::factory()->create([
            'name' => 'Ana Jovanovic',
        ]);

        \App\Models\Account::factory(2)->create([
            'user_id' => $user->id,
        ]);

        $this->call(CurrencyConversionRatesSeeder::class);
    }
}
