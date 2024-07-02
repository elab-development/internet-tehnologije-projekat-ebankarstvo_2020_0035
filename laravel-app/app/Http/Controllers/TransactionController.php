<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Validator;
class TransactionController extends Controller
{
    public function index(){
        $transactions = Transaction::all();

        return TransactionResource::collection($transactions);
    }
     
    public function store(Request $request)
    {
        return $this->processTransaction($request, new Transaction());
    }
    
    public function update(Request $request, Transaction $transaction)
    {
        return $this->processTransaction($request, $transaction);
    }
    
    public function show(Transaction $transaction)
    {
        return new TransactionResource($transaction);
    }
    
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
    
        return response()->json(['message' => 'Transaction deleted successfully']);
    }
    
    private function processTransaction(Request $request, Transaction $transaction)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'account_id' => 'required|exists:accounts,id',
            'category_id' => 'required|exists:categories,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        $transaction->fill($request->only(['title', 'amount', 'account_id', 'category_id']));
        $transaction->save();
    
        $action = $transaction->wasRecentlyCreated ? 'created' : 'updated';
    
        return response()->json(['message' => "Transaction {$action} successfully", new TransactionResource($transaction)]);
    }
}