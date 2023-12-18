<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']); //api/users
Route::get('/users/{id}', [UserController::class, 'show']); //api/users/id

Route::get('/transactions', [TransactionController::class, 'index']); //api/transactions
Route::get('/transactions/{id}', [TransactionController::class, 'show']);  //api/transactions/id

Route::get('/accounts', [AccountController::class, 'index']); //api/accounts
Route::get('/accounts/{id}', [AccountController::class, 'show']);  //api/accounts/id

Route::get('/categories', [CategoryController::class, 'index']); //api/categories
Route::get('/categories/{id}', [CategoryController::class, 'show']);  //api/categories/id
