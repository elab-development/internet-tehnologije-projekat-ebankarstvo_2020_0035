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
            'title'=>$this->faker->randomElement(['Salary account', 'Savings','Personal account','Deposit account']),
            'number'=>$this->faker->numberBetween(1,999999), //broj racuna
            'type'=>$this->faker->randomElement(['tekuci-eur','devizni-usd']), //tip racuna
            'balance'=>$this->faker->randomFloat(2,0,999999), 
            'user_id'=>\App\Models\User::factory(),
        ];
    }
}
