<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return UserResource::collection($users);
    }
    public function authenticatedUser()
    {
    $user = auth()->user();

    // Load related accounts for the user
    //$accounts = $user->accounts;

    // Optionally, you can use Laravel Resources to format the response
    return new UserResource($user);
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
        return $this->processUser($request, new User());
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        if (is_null($user)) {
            return response()->json('Data not found', 404);
        }
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        return $this->processUser($request, $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
    private function processUser(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:15',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required|string|min:6',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user->fill($request->only(['name', 'email', 'password']));
        $user->save();

        $action = $user->wasRecentlyCreated ? 'created' : 'updated';

        return response()->json(['message' => "User {$action} successfully", new UserResource($user)]);
    }
    
    public function getAccountsForUser()
    {
        // Get the currently authenticated user
        $user = auth()->user();

        // Check if user is authenticated
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Fetch accounts associated with the authenticated user using eager loading
        $accounts = $user->accounts()->get();

        return response()->json(['accounts' => $accounts], 200);
    }
}
