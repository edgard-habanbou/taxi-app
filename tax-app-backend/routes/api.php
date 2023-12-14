<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\SupportMessageController;
use App\Http\Controllers\TempChatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\StatsController;

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
    Route::post('upload_image', 'upload_image');
    Route::post('upload_image', 'upload_image');
});





// Route for creating a user request
Route::post('/user-requests/create', [RequestController::class, 'createRequest']);
// Route for updating request with driver
Route::post('/user-requests/update-with-driver', [RequestController::class, 'updateRequestWithDriver']);
// Route for canceling a request
Route::post('/user-requests/cancel', [RequestController::class, 'cancelRequest']);
// Route for getting all requests with status 1
Route::get('/user-requests/status-1', [RequestController::class, 'getRequestsStatusOne']);
// Route for checking passenger requests
Route::get('/user-requests/checkDriverStatus', [RequestController::class, 'checkDriverStatus']);
Route::get('/user-request/active', [RequestController::class, 'getUserActiveRequests']);
Route::get('/all-requests', [RequestController::class, 'getAllRequests']);
Route::get('/User-Active-Requests', [RequestController::class, 'getUserActiveRequests']);
Route::post('/driver-location', [RequestController::class, 'getDriverLocation']);



// Route::post('/register', [UserController::class, 'store']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::put('/update_user', [UserController::class, 'update']);
Route::post('/destroy', [UserController::class, 'destroy']);

Route::post('/update_location', [UserController::class, 'updateLocation']);
Route::post('/update_picture', [UserController::class, 'updatePicture']);
Route::get('/show', [UserController::class, 'show']);
Route::post('/update_profile', [UserController::class, 'updateProfile']);

Route::post('/update_status', [DriverController::class, 'update']);
Route::get('/verify', [UserController::class, 'verify']);

Route::post('/getpendingdrivers', [DriverController::class, 'getPendingDrivers']);

Route::post('/getstats', [StatsController::class, 'getStats']);

Route::post('/update_request_location', [RequestController::class, 'updateLocation']);
Route::post('/create_request', [RequestController::class, 'createRequest']);
Route::post('/update_request_status', [RequestController::class, 'updateStatus']);
Route::post('/update_request_driver', [RequestController::class, 'updateDriver']);

Route::get('/messages/{id}', [TempChatController::class, 'fetchMessages']);
Route::post('/messages/{id}', [TempChatController::class, 'sendMessage']);

Route::post('/support', [SupportMessageController::class, 'fetchMessages']);
Route::post('/fetch_chats', [SupportMessageController::class, 'getChats']);
Route::post('/send_support_message', [SupportMessageController::class, 'sendMessage']);
Route::post('/create_chat', [SupportMessageController::class, 'createChat']);
Route::post('/concludeChat', [SupportMessageController::class, 'concludeChat']);

Route::get('/get_ratings/{user_id}', [RatingController::class, 'get_ratings']);
Route::post('/add_rating', [RatingController::class, 'add_rating']);
Route::delete('/delete_rating/{rating_id}', [RatingController::class, 'delete_rating']);
Route::patch('/update_rating/{rating_id}', [RatingController::class, 'update_rating']);
Route::get('/verify', [UserController::class, 'verify']);
