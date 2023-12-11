<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'gender' => 'required|integer',
            'role_id' => 'required|integer|in:2,3',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'image_url' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fname' => $request->fname,
            'lname' => $request->lname,
            'gender' => $request->gender,
            'role_id' => $request->role_id,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image_url' => $imageUrl,
        ]);
        if ($request->role_id == 3) {
            Driver::create([
                'user_id' => $user->id,
            ]);
        }

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    
    private function generateBase64Image($path)
    {
        $absolutePath = storage_path('app/' . $path);
    
        if (file_exists($absolutePath)) {
            $data = file_get_contents($absolutePath);
    
            if ($data !== false) {
                $type = pathinfo($absolutePath, PATHINFO_EXTENSION);
    
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    
                return $base64;
            } else {
                echo "Failed to read file contents.\n";
            }
        } else {
            echo "File does not exist: $absolutePath";
        }
    
        return null;
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    
    public function upload_image(Request $req){
        $user=Auth::user();
        if ($request->hasFile('image_url')) {
            $uploadedImage = $request->file('image_url');
            $path = $uploadedImage->store('public/images'); 
            $imageUrl = $this->generateBase64Image($path);
        } else {
            $imageUrl = null;
        }
    }
        
}
