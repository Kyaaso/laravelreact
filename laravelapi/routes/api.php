<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserNotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/create-account', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/category/{category}', [NewsController::class, 'category']);
    Route::get('/news/search/{search}', [NewsController::class, 'search']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::middleware(['is_admin'])->group(function (){
        Route::post('/account-update-notify', [UserNotificationController::class, 'accountUpdate']);
        Route::post('/accounts/delete/{id}', [UserController::class, 'destroy']);
        Route::get('/accounts/search/{id}', [UserController::class, 'search']);
        Route::patch('/accounts/update/{id}', [UserController::class, 'update']);
        Route::get('/accounts', [UserController::class, 'index']);
    });
});
