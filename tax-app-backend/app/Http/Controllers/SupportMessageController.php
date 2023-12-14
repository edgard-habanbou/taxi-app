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
            ->where('support_messages.admin_chat_id', '=', $request->input('admin_chat_id'))
            ->orderBy('support_messages.created_at', 'asc')
            ->get();
    }

    public function sendMessage(Request $request)
    {
        if (is_array($request->input('message'))) {
            $message = json_encode($request->input('message'));
            $data = json_decode($message, true);
            $user = Auth::user();
            $user->supportMessage()->create([
                'message' => $data['message'],
                'user_id' => $user->id,
                'admin_chat_id' => $request->input('admin_chat_id')
            ]);
        } else {
            $user = Auth::user();
            $user->supportMessage()->create([
                'message' => $request->message,
                'user_id' => $user->id,
                'admin_chat_id' => $request->input('admin_chat_id')
            ]);
        }
        return ['status' => 'Message Sent!'];
    }

    public function createChat()
    {
        $user = Auth::user();
        $chat = $user->adminChat()->create([
            'user_id' => $user->id
        ]);

        return ['status' => 'success', 'admin_chat_id' => $chat->id];
    }

    public function getChats()
    {
        $user = Auth::user();
        if ($user->role_id == 1) {
            return DB::table('admin_chats')
                ->select('admin_chats.*', 'users.fname', 'users.lname', 'users.image_url', 'users.id as user_id')
                ->join('users', 'admin_chats.user_id', '=', 'users.id')
                ->where('admin_chats.is_concluded', 0)
                ->orderBy('created_at', 'asc')
                ->get();
        }
    }
    public function concludeChat(Request $request)
    {
        $user = Auth::user();
        if ($user->role_id == 1) {
            $chat = DB::table('admin_chats')
                ->where('id', $request->input('admin_chat_id'))
                ->update(['is_concluded' => 1]);
            return ['status' => 'success'];
        }
    }
}
