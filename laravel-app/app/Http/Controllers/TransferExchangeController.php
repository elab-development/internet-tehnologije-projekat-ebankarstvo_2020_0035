<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\TransferService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TransferExchangeController extends Controller
{
    protected $transferService;

    public function __construct(TransferService $transferService)
    {
        $this->transferService = $transferService;
    }

    public function transfer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'from_account_id' => 'required|exists:accounts,id',
            'to_account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $this->transferService->transfer(
                $request->input('from_account_id'),
                $request->input('to_account_id'),
                $request->input('amount')
            );
            return response()->json(['message' => 'Transfer successful']);
        } catch (\Exception $e) {
            Log::error('Transfer failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Transfer failed. Please try again later.'], 500);
        }
    }
}
