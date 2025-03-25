<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AccountResource;
class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::all();
        return $accounts;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:255",
            "number" => "required|string|unique:accounts",
            "type" => "required|string|in:tekuci-eur,devizni-usd",
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

        return response()->json(['message' => 'Account created successfully', 'data' => new AccountResource($account->fresh())]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $account = Account::find($id);

        if (is_null($account)) {
            return response()->json('Data not found', 404);
        }

        return $account;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:255",
            "number" => "required|string|unique:accounts,number," . $account->id,
            "type" => "required|string|in:tekuci-eur,devizni-usd",
            "balance" => "numeric",
            "user_id" => "required|exists:users,id",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $account->update($request->all());

        return response()->json(['message' => 'Account updated successfully', 'data' => new AccountResource($account)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
