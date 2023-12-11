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

  // Get all drivers
  public function index()
  {
      $drivers = Driver::all();
      return response()->json($drivers);
  }

  // Update driver information
  public function update(Request $request)
  {
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
  }

}
