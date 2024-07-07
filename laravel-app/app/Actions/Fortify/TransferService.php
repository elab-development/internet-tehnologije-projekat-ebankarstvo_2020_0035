<?php

namespace App\Actions\Fortify;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;


class TransferService
{
    protected $currencyConversionService;

    public function __construct(CurrencyConversionService $currencyConversionService)
    {
        $this->currencyConversionService = $currencyConversionService;
    }

    public function transfer($fromAccountId, $toAccountId, $amount)
    {
        DB::transaction(function () use ($fromAccountId, $toAccountId, $amount) {
            $fromAccount = Account::findOrFail($fromAccountId);
            $toAccount = Account::findOrFail($toAccountId);

            $fromCurrency = $fromAccount->type === 'devizni-usd' ? 'usd' : 'eur';
            $toCurrency = $toAccount->type === 'devizni-usd' ? 'usd' : 'eur';

            $convertedAmount = $this->currencyConversionService->convert($amount, $fromCurrency, $toCurrency);

            // Update balances
            $fromAccount->balance -= $amount;
            $toAccount->balance += $convertedAmount;

            $fromAccount->save();
            $toAccount->save();

            // Log transactions
            Transaction::create([
                'title' => 'Transfer',
                'amount' => -$amount,
                'account_id' => $fromAccountId,
                'recipient_id' => $toAccountId,
            ]);

            Transaction::create([
                'title' => 'Transfer',
                'amount' => $convertedAmount,
                'account_id' => $toAccountId,
                'recipient_id' => $fromAccountId,
            ]);
        });
    }
}