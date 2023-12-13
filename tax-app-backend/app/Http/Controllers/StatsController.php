<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Rating;

use App\Models\UserRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    //
    public function getStats()
    {
        $user = Auth::user();
        $user_role = $user->role_id;
        if ($user_role == 1) { //Admin
            $rides = UserRequest::count();
            $drivers = Driver::where('accepted', 1)->count();

            $busy = Driver::where('busy', 1)->count();
            $DriverAverageRatings = DB::table('ratings')
                ->join('users', 'ratings.rated_user_id', '=', 'users.id')
                ->select('ratings.rated_user_id', 'users.fname', 'users.lname', DB::raw('AVG(ratings.rating) as average_rating'))
                ->where("role_id", 1)
                ->groupBy('ratings.rated_user_id', 'users.fname', 'users.lname')
                ->get();
            $data = [
                'rides' => $rides,
                'drivers' => $drivers,
                'busy' => $busy,
                'driverAverageRatings' => $DriverAverageRatings,
            ];
            return response()->json([
                'status' => 'success',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }
}
