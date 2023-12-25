<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AccountResource;
class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts=Account::all();
        return $accounts;
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
            "title" => "required|string|max:255",
            "number" => "required|string|unique:accounts",
            "type" => "required|string|in:tekuci,devizni",
            "balance" => "numeric",
            "user_id" => "required|exists:users,id",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $account = Account::create([
            "title" => $request->title,
            "number" => $request->number,
            "type" => strtolower($request->type),
            "balance" => $request->balance ?? 0.00,
            "user_id" => $request->user_id, 
        ]);

        return response()->json(['Account created successfully', $account->fresh()]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $accounts = Account::find($id);
        if (is_null($accounts)) {
            return response()->json('Data not found', 404);
        }
        return $accounts;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:255",
            "number" => "required|string|unique:accounts,number," . $account->id,
            "type" => "required|string|in:tekuci,devizni",
            "balance" => "numeric",
            "user_id" => "required|exists:users,id",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $account->title=$request->title;
        $account->number=$request->number;
        $account->type=$request->type;
        $account->balance=$request->balance;
        $account->user_id=$request->user_id;

        $account->save();

      

        return response()->json(['Account updated successfully', new AccountResource($account)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return response()->json(['Account deleted successfully']);
    }
}
