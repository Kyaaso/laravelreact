<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
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

Route::get('/accounts', [UserController::class, 'index']);
Route::post('/create-account', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/category/{category}', [NewsController::class, 'category']);
Route::get('/news/search/{search}', [NewsController::class, 'search']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
