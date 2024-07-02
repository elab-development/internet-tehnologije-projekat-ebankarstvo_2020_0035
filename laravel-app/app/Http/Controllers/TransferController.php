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

        DB::beginTransaction();

        try {
            // Create a single transaction for both debit and credit
            $transaction = new Transaction();
            $transaction->account_id = $fromAccountId; // Sender
            $transaction->recipient_id = $request->to_account_id; // Recipient
            $transaction->amount = $request->amount;
            $transaction->category_id = $request->category;
            $transaction->save();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Transfer successful'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an exception
            DB::rollback();

            return response()->json(['message' => 'Transfer failed', 'error' => $e->getMessage()], 500);
        }
    }
   
}