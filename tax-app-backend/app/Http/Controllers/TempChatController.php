<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TempChatController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function fetchMessages($id)
    {
        return DB::table('temp_chats')
            ->where('request_id', $id)
            ->join('users', 'temp_chats.user_id', '=', 'users.id')
            ->select('temp_chats.message', 'temp_chats.created_at', 'temp_chats.user_id','users.fname', 'users.lname', 'users.image_url')
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function sendMessage(Request $request, $id)
    {
        $user = Auth::user();

        $user->tempChat()->create([
            'message' => $request->input('message'),
            'user_id' => $user->id,
            'request_id' => $id,

        ]);
        return ['status' => 'Message Sent!'];
    }
}
