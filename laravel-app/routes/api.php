<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\API\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function(Request $request) {
        return auth()->user();
    });
    Route::resource('accounts', AccountController::class)->only(['update','store','destroy']);
    Route::resource('transactions', TransactionController::class)->only(['store', 'update', 'destroy']);
    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/users', [UserController::class, 'index']); //api/users
Route::get('/users/{id}', [UserController::class, 'show']); //api/users/id

Route::resource('transactions', TransactionController::class); //api/transactions
//Route::get('/transactions/{id}', [TransactionController::class, 'show']);  //api/transactions/id

Route::get('/accounts', [AccountController::class, 'index']); //api/accounts
Route::get('/accounts/{id}', [AccountController::class, 'show']);  //api/accounts/id

Route::get('/categories', [CategoryController::class, 'index']); //api/categories
Route::get('/categories/{id}', [CategoryController::class, 'show']);  //api/categories/id
