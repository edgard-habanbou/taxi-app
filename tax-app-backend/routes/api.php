<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SupportMessageController;
use App\Http\Controllers\TempChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
Route::get('/messages/{id}', [TempChatController::class, 'fetchMessages']);
Route::post('/messages', [TempChatController::class, 'sendMessage']);

Route::get('/support/{id}', [SupportMessageController::class, 'fetchMessages']);
Route::post('/support', [SupportMessageController::class, 'sendMessage']);
