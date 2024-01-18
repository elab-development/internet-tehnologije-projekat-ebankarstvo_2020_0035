<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
class TransferController extends Controller
{
    public function transfer(Request $request)
    {
        // Validate the request data
        $request->validate([
            'to_account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'required|numeric|',
        ]);

        // Get the logged-in user's accounts
        $userAccounts = Auth::user()->accounts;

        // Check if the user has any accounts
        if ($userAccounts->isEmpty()) {
            return response()->json(['message' => 'User has no accounts'], 400);
        }

        // Get the ID of the first account
        $fromAccountId = $userAccounts->first()->id;

        // Begin a database transaction
        DB::beginTransaction();

        try {
            // Debit from the source account (first account of the user)
            $debitTransaction = new Transaction();
            $debitTransaction->account_id = $fromAccountId;
            $debitTransaction->amount = $request->amount;
            $debitTransaction->category_id = $request->category;
            $debitTransaction->recipient_id =$request->to_account_id ;
            $debitTransaction->save();

            // Credit to the destination account
            $creditTransaction = new Transaction();
            $creditTransaction->account_id = $request->to_account_id;
            $creditTransaction->amount = $request->amount;
            $creditTransaction->category_id =  $request->category;
            
            $creditTransaction->save();

            $this->updateAccountBalance($fromAccountId, -$request->amount);
            $this->updateAccountBalance($request->to_account_id, $request->amount);
            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Transfer successful'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an exception
            DB::rollback();

            return response()->json(['message' => 'Transfer failed', 'error' => $e->getMessage()], 500);
        }
    }
    private function updateAccountBalance($accountId, $amount)
{
    // Update the account balance based on the given amount
    $account = Account::find($accountId);

    // Check if the amount is positive or negative to determine debit or credit
    if ($amount >= 0) {
        $account->balance += $amount; // Credit
    } else {
        $account->balance -= abs($amount); // Debit (negative amount)
    }

    $account->save();
}
}