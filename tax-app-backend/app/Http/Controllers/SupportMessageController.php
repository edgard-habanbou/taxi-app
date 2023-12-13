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

    public function fetchMessages(Request $request)
    {
        return DB::table('support_messages')
            ->select('support_messages.*', 'users.fname', 'users.lname', 'users.image_url', 'users.id')
            ->join('users', 'support_messages.user_id', '=', 'users.id')
            ->where('support_messages.user_id', '=', $request->input('user_id'))
            ->where('support_messages.admin_chat_id', '=', $request->input('admin_chat_id'))
            ->orderBy('support_messages.created_at', 'asc')
            ->get();
    }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $user->supportMessage()->create([
            'message' => $request->input('message'),
            'user_id' => $user->id,
            'chat_id' => $request->input('admin_chat_id')


        ]);
        return ['status' => 'Message Sent!'];
    }

    public function createChat()
    {
        $user = Auth::user();
        $chat = $user->adminChat()->create([
            'user_id' => $user->id
        ]);

        return ['status' => 'success', 'chat' => $chat];
    }

    public function getChats()
    {
        $user = Auth::user();
        if ($user->role_id == 1) {
            return DB::table('admin_chats')
                ->select('admin_chats.*', 'users.fname', 'users.lname', 'users.image_url', 'users.id')
                ->join('users', 'admin_chats.user_id', '=', 'users.id')
                ->where('admin_chats.is_concluded', 0)
                ->orderBy('created_at', 'asc')
                ->get();
        }
    }
}
