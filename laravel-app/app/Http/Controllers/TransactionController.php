<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log; 
use Illuminate\Support\Facades\Auth;
use App\Models\Account;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
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
    public function transaction(Request $request)
    { 
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
    
    public function getAllTransactions($accountId)
    {
        try {
            $account = auth()->user()->accounts()->find($accountId);

            if (!$account) {
                return response()->json(['error' => 'Unauthorized access to account'], 403);
            }
            $paginatedTransactions = DB::table('transactions')
            ->select(
                'transactions.*',
                'sender_users.name as sender_name',
                'recipient_users.name as recipient_name'
            )
            ->join('accounts as sender_accounts', 'transactions.account_id', '=', 'sender_accounts.id')
            ->join('users as sender_users', 'sender_accounts.user_id', '=', 'sender_users.id')
            ->join('accounts as recipient_accounts', 'transactions.recipient_id', '=', 'recipient_accounts.id')
            ->join('users as recipient_users', 'recipient_accounts.user_id', '=', 'recipient_users.id')
            ->where(function ($query) use ($accountId) {
                $query->where('sender_accounts.id', $accountId)
                      ->orWhere('recipient_accounts.id', $accountId);
            })
            ->paginate(3);
            $allTransactions = DB::table('transactions')
            ->select(
            'transactions.*',
            'sender_users.name as sender_name',
            'recipient_users.name as recipient_name'
            )
            ->join('accounts as sender_accounts', 'transactions.account_id', '=', 'sender_accounts.id')
            ->join('users as sender_users', 'sender_accounts.user_id', '=', 'sender_users.id')
            ->join('accounts as recipient_accounts', 'transactions.recipient_id', '=', 'recipient_accounts.id')
            ->join('users as recipient_users', 'recipient_accounts.user_id', '=', 'recipient_users.id')
            ->where(function ($query) use ($accountId) {
            $query->where('sender_accounts.id', $accountId)
                ->orWhere('recipient_accounts.id', $accountId);
            })
            ->get();
            Log::info($allTransactions->toArray());
            return [
                'paginatedTransactions' => $paginatedTransactions,
                'allTransactions' => $allTransactions,
            ];
       

        } catch (\Exception $e) {
            Log::error('Failed to fetch transactions: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
            return response()->json(['error' => 'Failed to fetch transactions'], 500);
        }
    }
    public function transactionsBetweenDates(Request $request)
    {
        try {
        $request->validate([
            'account_id' => [
                'required',
                Rule::exists('accounts', 'id')->where(function ($query) use ($request) {
                    $query->where('user_id', auth()->id())
                          ->where('id', $request->account_id);
                }),
            ],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Retrieve validated input
        $account_id = $request->input('account_id');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');

        // Query to fetch transactions between dates
        $transactions = Transaction::where('account_id', $account_id)
        ->whereBetween('created_at', [$start_date, $end_date])
        ->get();
        
        // Return JSON response
        return response()->json($transactions);
        } catch (\Exception $e) {
        // Handle exceptions if any
        Log::info('Error occurred: ' . $e->getMessage());
            Log::error('Error occurred: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while processing your request'], 500);
        }
    }

}