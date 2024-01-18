<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AdminReqistrationController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use App\Http\Controllers\TransferController;

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
    //Route::get('/user', function(Request $request) {
    //    return auth()->user();
    //});
    Route::get('/user', [UserController::class, 'authenticatedUser']);
    Route::resource('transactions', TransactionController::class)->only( 'store');
    Route::post('/transfer', [TransferController::class, 'transfer']);
   //i jos da dodam rutu da moze pravi Transakciju
    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::group(['middleware' => ['auth:sanctum', 'admin']],function () {//3.tip
    Route::resource('accounts', AccountController::class)->only(['update','store','destroy']);
    Route::resource('transactions', TransactionController::class)->only([ 'update', 'destroy']);
    Route::resource('accounts', AccountController::class)->only(['update','store','destroy']);
    Route::resource('transactions', TransactionController::class)->only(['store', 'update', 'destroy']);
    Route::get('/users', [UserController::class, 'index']); //api/users
    Route::get('/users/{id}', [UserController::class, 'show']); //api/users/id
    Route::get('/transactions/{id}', [TransactionController::class, 'show']); //api/users/id
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/accounts', [AccountController::class, 'index']); //api/accounts
    Route::get('/accounts/{id}', [AccountController::class, 'show']);  //api/accounts/id
    Route::get('/categories', [CategoryController::class, 'index']); //api/categories
    Route::get('/categories/{id}', [CategoryController::class, 'show']);  //api/categories/id
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware(['guest'])
    ->name('password.request');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware(['guest'])
    ->name('password.email');

Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware(['guest'])
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware(['guest'])
    ->name('password.update');

Route::post('/admin/register', [AdminReqistrationController::class, 'register']);//2.tip
Route::post('/admin/login', [AdminReqistrationController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AdminReqistrationController::class, 'logout']);
Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('admin.login');//1.tip