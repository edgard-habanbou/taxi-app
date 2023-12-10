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
    
        public function createRequest(Request $request, $id)
        {
            $validatedData = $request->validate([
                'latitude' => 'required|string',
                'longitude' => 'required|string',
                'status' => 'required|integer',
                'passenger_id' => 'required|integer'.$id
              ]);
    
            $request = Request::create($validatedData);
    
            return response()->json($user, 201);
        }
    
        public function updateRequest(Request $request, $id)
        {
            $validatedData = $request->validate([

            ]);
    
            $request = Request::findOrFail($id);

    
            $request->update($validatedData);
    
            return response()->json($request);
        }
    

    

}
