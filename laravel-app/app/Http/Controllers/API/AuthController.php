<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\AccountResource;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        //uopste mi ne treba token za register
        // Validation rules for registration
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create a new admin
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // You can customize the response as needed
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
    public function login(Request $request) {//ne postoji u bazi kao
        if(!Auth::attempt($request->only('email','password')))//Auth se koristi za pristup autentif korisniku
            return response()->json(['message'=>'Unauthorized'],401);
        
        $user = Auth::user();
        //$user=User::where('email',$request['email'])->firstOrFail();//prvi na koji naketis vrati
        //treba da dobijemo novi token sa kojim mozemo da se krecemo dalje kroz str
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(['message'=>'Welcome, '.$user->name,'access_token'=>$token,'token_type'=>'Bearer']);
    }
    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }
    
}
