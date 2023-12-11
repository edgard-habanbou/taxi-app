<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/update_location', [RequestController::class, 'updateLocation']);
