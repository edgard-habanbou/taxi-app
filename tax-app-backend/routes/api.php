<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RatingController;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('upload_image','upload_image');
});

Route::get('/get_ratings/{user_id}',[RatingController::class,'get_ratings']);
Route::post('/add_rating',[RatingController::class,'add_rating']);
Route::delete('/delete_rating/{rating_id}',[RatingController::class,'delete_rating']);
Route::patch('/update_rating/{rating_id}',[RatingController::class,'update_rating']);
