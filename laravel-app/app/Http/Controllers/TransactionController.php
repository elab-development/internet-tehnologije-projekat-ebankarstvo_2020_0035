<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Validator;
class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trans=Transaction::all();
        return TransactionResource::collection($trans);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

        $transaction = Transaction::create([
            "title" => $request->title,
            "amount" => $request->amount,
            "account_id" => $request->account_id,
            "category_id" => $request->category_id, 
        ]);

        return response()->json(['message' => 'Transaction created successfully',new TransactionResource($transaction)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        return new TransactionResource($transaction);
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
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

        $transaction->title=$request->title;
        $transaction->amount=$request->amount;
        $transaction->account_id=$request->account_id;
        $transaction->category_id=$request->category_id;
       

        $transaction->save();

        return response()->json(['message' => 'Transaction updated successfully', new TransactionResource($transaction)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(['Transaction deleted successfully']);
    }
}
