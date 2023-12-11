<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RequestController extends Controller
{
    
        //get all requests
        public function index()
        {
            $requests = Request::all();
            return response()->json($requests);
        }
        // get request by id
        public function show($id)
        {
            $request = Request::findOrFail($id);
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
    
            $request = Request::create($validatedData);
    
            return response()->json($user, 201);
        }
    
        public function updateLocation(Request $request)
        {
            $validatedData = $request->validate([
                'latitude' => 'required|string',
                'longitude' => 'required|string',
            ]);
        
            $request = Request::findOrFail($request->id);
        
            $request->update([
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
            ]);
        
            return response()->json($request);
        }
    

    

}
