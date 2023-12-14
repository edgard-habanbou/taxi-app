<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DriverController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Get all drivers
    public function index()
    {
        $user_role = auth()->user()->role_id;
        if ($user_role == 1) { //Admin
            $drivers = Driver::all();
            return response()->json($drivers);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }

    // Update driver information
    public function update(Request $request)
    {
        $user_role = auth()->user()->role_id;
        if ($user_role == 1) {
            // Validate the request data
            $validatedData = $request->validate([
                'accepted' => 'integer',
                'busy' => 'integer',
            ]);
            // Find the driver by ID
            $driver = Driver::where("user_id", $request->id);

            // Update the driver information
            $driver->update($validatedData);

            // Return the updated driver
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Driver updated successfully',
                ],
                200
            );
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }
    public function getPendingDrivers()
    {
        $user = Auth::user();

        $user_role = $user->role_id;
        if ($user_role == 1) { //Admin
            return DB::table('drivers')
                ->where('accepted', 0)
                ->join('users', 'drivers.user_id', '=', 'users.id')
                ->select(
                    'users.fname',
                    'users.lname',
                    'users.image_url',
                    'users.id'
                )
                ->get();
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }
}
