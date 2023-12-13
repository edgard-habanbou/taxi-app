<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //get all users
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
    // get user by id
    public function show()
    {
        $user = auth()->user();
        return response()->json(['userinfo' => $user]);
    }

        // get user by id
    public function verify()
        {
            $user = Auth::user();
                    // Check if user is authenticated and exists in the database
            if ($user && User::where('id', $user->id)->exists()) {
                return response()->json($user);
            }
        
            return response()->json(['message' => 'User not found'], 404);
        }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|integer',
            'latitude' => 'string',
            'longitude' => 'string',
            'image_url' => 'string',
            'gender' => 'required|integer',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email|unique:users,email,',
            'role_id' => 'required|integer',
            'password' => 'required|string|min:6',
            'latitude' => 'string',
            'longitude' => 'string',
            'image_url' => 'string',
            'gender' => 'required|integer',
        ]);

        $user = User::findOrFail($request->id);
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user->update($validatedData);

        return response()->json($user);
    }

    public function updateLocation(Request $request)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            'latitude' => 'required|string',
            'longitude' => 'required|string',
        ]);
    
        $user = User::findOrFail($user->id);
    
        $user->update([
            'latitude' => $validatedData['latitude'],
            'longitude' => $validatedData['longitude'],
        ]);
    
        return response()->json($user);
    }


    public function destroy(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();

        return response()->json(null, 204);
    }
}
