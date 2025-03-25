<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\TransferService;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    protected $transferService;

    public function __construct(TransferService $transferService)
    {
        $this->transferService = $transferService;
    }

    public function transfer(Request $request)
    {
        $request->validate([
            'from_account_id' => 'required|exists:accounts,id',
            'to_account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $this->transferService->transfer(
            $request->input('from_account_id'),
            $request->input('to_account_id'),
            $request->input('amount')
        );

        return response()->json(['message' => 'Transfer successful']);
    }
}
