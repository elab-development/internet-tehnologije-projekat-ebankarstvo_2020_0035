<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        \App\Models\Transaction::truncate();
        \App\Models\Account::truncate();
        \App\Models\User::truncate();
        \App\Models\Category::truncate();

        \App\Models\Transaction::factory(3)->create();

         \App\Models\User::factory()->create([
            'name' => 'Petar Petrovic',
            'email' => 'petar@example.com',
        ]);

        $user=\App\Models\User::factory()->create([
            'name'=>'Ana Jovanovic'
        ]);

        \App\Models\Account::factory(2)->create([
            'user_id'=>$user->id
        ]);
    }
}
