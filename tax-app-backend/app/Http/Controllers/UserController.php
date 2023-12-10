<?php

namespace App\Http\Controllers;

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
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|integer',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'image_url' => 'required|string',
            'gender' => 'required|integer',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email|unique:users,email,' .$id,
            'role_id' => 'required|integer',
            'password' => 'required|string|min:6',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'image_url' => 'required|string',
            'gender' => 'required|integer',
        ]);

        $user = User::findOrFail($id);
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user->update($validatedData);

        return response()->json($user);
    }

    public function updateLocation(Request $request, $id)
    {
        $validatedData = $request->validate([
            'latitude' => 'required|string',
            'longitude' => 'required|string',
        ]);
    
        $user = User::findOrFail($id);
    
        $user->update([
            'latitude' => $validatedData['latitude'],
            'longitude' => $validatedData['longitude'],
        ]);
    
        return response()->json($user);
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
