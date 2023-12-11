<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SupportMessageController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function fetchMessages()
    {
        return DB::table('support_messages')
            ->orderBy('created_at', 'asc')
            ->join('users', 'support_messages.user_id', '=', 'users.id')
            ->select('support_messages.*', 'users.fname', 'users.lname', 'users.image_url')
            ->get();
    }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $user->supportMessage()->create([
            'message' => $request->input('message'),
            'user_id' => $user->id,

        ]);
        return ['status' => 'Message Sent!'];
    }
}
