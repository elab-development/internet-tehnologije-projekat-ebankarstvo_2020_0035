<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->randomElement(['Salary account', 'Savings','Personal account','Deposit account']),
            'number'=>fake()->numberBetween(1,999999), //broj racuna
            'type'=>fake()->randomElement(['dinarski','devizni']), //tip racuna
            'balance'=>fake()->randomFloat(2,0,999999), 
            'user_id'=>\App\Models\User::factory(),
        ];
    }
}
