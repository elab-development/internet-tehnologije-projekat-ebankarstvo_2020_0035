<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Validation\ValidationException;
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
    Route::get('/user', [UserController::class, 'authenticatedUser']);
    Route::post('/transfer', [TransferController::class, 'transfer']);
    Route::post('/transaction', [TransactionController::class, 'transaction']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/myAccounts', [UserController::class, 'getAccountsForUser']);
    #Route::get('/usersName/{id}', [UserController::class, 'getById'])->name('users.getById');
    Route::get('/accounts/transactions/{accountId}', [TransactionController::class, 'getAllTransactions']);
    #Route::get('/transactions/{account_id}/{start_date}/{end_date}', [TransactionController::class, 'transactionsBetweenDates']);
    Route::get('/userTransactions', [TransactionController::class, 'transactionsBetweenDates']);
});
#{account_id}/{start_date}/{end_date}
Route::group(['middleware' => ['auth:sanctum', 'admin']],function () {//3.tip
    Route::resource('accounts', AccountController::class)->only(['update','store','destroy']);
    //Route::resource('transactions', TransactionController::class)->only([ 'update', 'destroy']);
    Route::resource('users', UserController::class);
    //fali mi za usere
    //ne bih da dodaje kategoriju
    Route::get('/users', [UserController::class, 'index']); //api/users
    Route::get('/users/{id}', [UserController::class, 'show']); //api/users/id
    //Route::get('/transactions/{start_date}/{end_date}', [TransactionController::class, 'transactionsBetweenDates']);
    //Route::get('/transactions/{id}', [TransactionController::class, 'show']); //api/users/id
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/accounts', [AccountController::class, 'index']); //api/accounts
    Route::get('/accounts/{id}', [AccountController::class, 'show']);  //api/accounts/id
    Route::get('/categories', [CategoryController::class, 'index']); //api/categories
    Route::get('/categories/{id}', [CategoryController::class, 'show']);  //api/categories/id
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/forgot-password', function () {
    return 'Nesto';
})->middleware('guest')->name('password.request');
Route::post('/forgot-password', function (Request $request) {
        $request->validate(['email' => 'required|email']);
        try {
            $status = Password::sendResetLink(
                $request->only('email')
            );
    
            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => 'Password reset link sent successfully']);
            } else {
                throw ValidationException::withMessages([
                    'email' => [trans($status)],
                ]);
            }
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to send reset link: ' . $e->getMessage()], 500);
        }
    })->name('password.email');

Route::get('/reset-password/{token}',  function () {
    return 'stranica za reset';
})->name('password.reset');

Route::post('/reset-password', function (Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
        try{
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
    
                event(new \Illuminate\Auth\Events\PasswordReset($user));
            }
        );
    
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Promenili smoo']);
        } 
    } catch (\Exception $e) {
        return response()->json(['error' => 'Nismo promenili problem ima: ' . $e->getMessage()], 500);
    }
    })->name('password.update');
Route::get('/transactions/{account_id}/{start_date}/{end_date}', [TransactionController::class, 'transactionsBetweenDates']);
//Route::post('/admin/register', [AdminReqistrationController::class, 'register']);//2.tip
//Route::post('/admin/login', [AdminReqistrationController::class, 'login'])->name('admin.login.post');
//Route::post('/admin/logout', [AdminReqistrationController::class, 'logout']);
//Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('admin.login');//1.tip