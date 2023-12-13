<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\UserRequest;
use App\Models\User;
class RequestController extends Controller
{
    // Function to create a user request
    public function createRequest(Request $request)
    {
        $user = Auth::user();
        $requests = UserRequest::where('passenger_id',$user->id)->whereIn('status', [1,2])->get();
        if ($requests!='[]'){
            return response()->json(['message' => "another request found"], 403);
        }
        else{
        if ($user->role_id === 2) {
            $userRequest = new UserRequest();
            $userRequest->passenger_id = $user->id;
            $userRequest->status = 1;
            $userRequest->origin=$request->origin;
            $userRequest->destination=$request->destination;
                $userRequest->save();

            return response()->json(['id' => $userRequest->id]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }}
    }

    // Function to update request with driver
    public function updateRequestWithDriver(Request $request)
    {
        $user = Auth::user();
        if ($user->role_id === 3) {
            $userRequest = UserRequest::findOrFail($request->id);
            $userRequest->driver_id = $user->id;
            $userRequest->status = 2;
            $userRequest->save();

            return response()->json(['message' => 'Request updated with driver']);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

        // Function to complete a request
        public function completeRequest($request_id)
        {   $user = Auth::user();
            $userRequest = UserRequest::findOrFail($request_id);
            if($user->id==$userRequest->driver_id){
            $userRequest->status = 3;
            $userRequest->save();
    
            return response()->json(['message' => 'Request canceled']);  
            }else {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

        }

    // Function to cancel a request
    public function cancelRequest(Request $request)
    {   $user = Auth::user();
        $userRequest = UserRequest::findOrFail($request->id);
        if($user->id==$userRequest->driver_id || $user->id==$userRequest->passenger_id ){
        $userRequest->status = 4;
        $userRequest->save();

        return response()->json(['message' => 'Request canceled']);}
        else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    // Function to get all requests with status 1
    public function getRequestsStatusOne()
    {
        $requests = UserRequest::where('status', 1)->get();
        return response()->json($requests);
    }

    // Function to check if a passenger has any requests with status 2
    public function checkDriverStatus(Request $driver_id)    {
        $hasStatusTwo = UserRequest::where('driver_id', $driver_id)
            ->where('status', 2)
            ->exists();

        return response()->json(['hasStatusTwo' => !$hasStatusTwo]);
    }

    public function getDriverLocation(Request $request)    {
        $request = UserRequest::findOrFail($request->id);

        $driverInfo= User::where('id',$request->driver_id)->get()  ;  

        if($driverInfo->isEmpty()){
        return response()->json(['driver' => null]);

        }
        else
        {return response()->json(['driver' => $driverInfo]);}

        
    }

    public function getUserActiveRequests()    {
        $user =Auth::user(); // Fetch the user by their ID
        $request= UserRequest::where('passenger_id',$user->id)->whereIn('status', [1,2])->get();
    // $requests now holds all the requests for the user as an array
        return response()->json($request);
    }

    public function getAllRequests()    {
        $user =Auth::user(); // Fetch the user by their ID
        $request= UserRequest::whereIn('status', [1])->get();

        $Active= UserRequest::where('driver_id',$user->id)->where('status', [2])->get();

        if($Active->isEmpty()){
            return response()->json($request);
        }
    // $requests now holds all the requests for the user as an array
        else{
            return response()->json($Active);
        }
    }

    
}