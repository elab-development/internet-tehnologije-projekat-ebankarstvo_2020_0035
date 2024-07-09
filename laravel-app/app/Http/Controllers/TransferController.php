<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
class TransferController extends Controller
{
    public function transfer(Request $request)
    { 
        Log::debug('Majku vam jebem');
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|exists:accounts,id,user_id,' . Auth::id(),
            'number' => 'required|exists:accounts,number',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'required|numeric|',
        ]);
        if ($validator->fails()) {
            Log::debug('Validation failed for transfer request.', [
                'errors' => $validator->errors()->toArray(),
                'request' => $request->all(),
            ]);
            return response()->json(['error' => $validator->errors()], 422);
        }
        
        $toAccount = Account::where('number', $request->number)->first();
       
        DB::beginTransaction();
        $id=$toAccount->id;
        try {
            // Create a single transaction for both debit and credit
            $transaction = new Transaction();
            $transaction->account_id = $request->account_id; // Sender
            $transaction->recipient_id = $id; // Recipient
            $transaction->amount = $request->amount;
            $transaction->category_id = $request->category;
            $transaction->save();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Transfer successful'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an exception
            DB::rollback();
            Log::debug('Transfer failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
            ]);
            return response()->json(['message' => 'Transfer failed', 'error' => $e->getMessage()], 500);
            
        }
    }
   
}