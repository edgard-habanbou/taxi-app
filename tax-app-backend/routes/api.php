<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SupportMessageController;
use App\Http\Controllers\TempChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequestController;

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

Route::post('/register',[UserController::class, 'store']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/login' ,[AuthController::class, 'login']);
Route::put('/update_user', [UserController::class, 'update']);
Route::post('/destroy' , [UserController::class , 'destroy']);
Route::post('/update_location', [UserController::class, 'updateLocation']);

Route::post('/update_status' , [DriverController::class , 'update']);




Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/update_request_location', [RequestController::class, 'updateLocation']);
Route::post('/create_request', [RequestController::class, 'createRequest']);
Route::post('/update_request_status', [RequestController::class, 'updateStatus']);
Route::post('/update_request_driver', [RequestController::class, 'updateDriver']);
Route::get('/messages/{id}', [TempChatController::class, 'fetchMessages']);
Route::post('/messages/{id}', [TempChatController::class, 'sendMessage']);

Route::get('/support/{id}', [SupportMessageController::class, 'fetchMessages']);
Route::post('/support', [SupportMessageController::class, 'sendMessage']);
