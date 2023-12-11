<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/update_request_location', [RequestController::class, 'updateLocation']);
Route::post('/create_request', [RequestController::class, 'createRequest']);
Route::post('/update_request_status', [RequestController::class, 'updateStatus']);
Route::post('/update_request_driver', [RequestController::class, 'updateDriver']);
