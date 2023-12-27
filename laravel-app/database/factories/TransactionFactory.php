<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->randomElement(['Car insurance', 'Check', 'Credit', 'Cash payment']),
            'amount' => $this->faker->randomFloat(2, -99999, 99999),
            'account_id' => \App\Models\Account::factory(),
            'category_id' => \App\Models\Category::factory(),
        ];
    }
}
