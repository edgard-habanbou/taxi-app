<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRequest;
class RequestController extends Controller
{
    
        //get all requests
        public function index()
        {
            $requests = UserRequest::all();
            return response()->json($requests);
        }
        // get request by id
        public function show($id)
        {
            $request = UserRequest::findOrFail($id);
            return response()->json($request);
        }
    
        public function createRequest(Request $request)
        {
            $validatedData = $request->validate([
                'latitude' => 'required|string',
                'longitude' => 'required|string',
                'status' => 'required|integer',
                'passenger_id' => 'required|integer'
              ]);
    
            $request = UserRequest::create($validatedData);
    
            return response()->json($user, 201);
        }
    
        public function updateDriver(Request $request)
        {
            $validatedData = $request->validate([
                'driver_id' => 'required|integer',
                'status' => 'required|integer',
            ]);
        
            $request = UserRequest::findOrFail($request->id);
        
            $request->update([
                'driver_id' => $validatedData['driver_id'],
                'status' => $validatedData['status'],
            ]);
        
            return response()->json($request);
        }
        public function updateLocation(Request $request)
        {
            $validatedData = $request->validate([
                'latitude' => 'required|string',
                'longitude' => 'required|string',
            ]);
        
            $request = UserRequest::findOrFail($request->id);
        
            $request->update([
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
            ]);
        
            return response()->json($request);
        }
        public function updateStatus(Request $request)
        {
            $validatedData = $request->validate([
                'status' => 'required|integer',
              ]);
        
            $request = UserRequest::findOrFail($request->id);
        
            $request->update([
                'status' => $validatedData['status'],
  
            ]);
        
            return response()->json($request);
        }
    

    

}
