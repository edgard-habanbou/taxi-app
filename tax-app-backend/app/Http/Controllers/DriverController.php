<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

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
                'accepted' => 'required|integer',
                'busy' => 'required|integer',
            ]);

            // Find the driver by ID
            $driver = Driver::findOrFail($request->id);

            // Update the driver information
            $driver->update($validatedData);

            return response()->json($driver);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }
}
