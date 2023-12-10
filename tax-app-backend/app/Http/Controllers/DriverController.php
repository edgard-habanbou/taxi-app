<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DriverController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function acceptDriver($driverId)
    {
        $driver = Driver::findOrFail($driverId);
        $driver->update(['accepted' => true]);

        return response()->json($driver);
    }

    public function rejectDriver($driverId)
    {
        $driver = Driver::findOrFail($driverId);
        $driver->delete();

        return response()->json(null, 204);
    }
}
