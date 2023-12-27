<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    public function run(): void
    {

        $numberOfAccounts = 10;

        factory(Account::class, $numberOfAccounts)->create();
    }
}
