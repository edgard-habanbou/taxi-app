<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
class RatingController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function get_ratings(Request $req,$user_id){

        $ratings=Rating::where('user_id',$user_id)->get();
        return response()->json([
            "status"=>"success",
            "ratings"=>$ratings,
        ]);
    }

    public function add_rating(Request $req){
        $role_id = auth()->user()->role_id;

        if($role_id==2 || $role_id==3){
            //if passenger || driver
            $role_id=["role_id"=>auth()->user()->id];
            $req->merge($role_id);
            //make rating between 1 and 5
            if($req->rating > 5 || $req->rating < 1){
                return response()->json([
                    "status"=>"failed",
                    "message"=>"Rating needs to be between 1 and 5"
                ]);
            }
            $rating=Rating::create($req->all());
            return response()->json([
                "status"=>"success",
                "data"=>$rating
            ]);
        }else {
            return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
            ], 403);  
        }
    }

    public function delete_rating(Request $req,$rating_id){
        $role_id = auth()->user()->role_id;
        if($role_id==2 ||$role_id==3){
            $rating=Rating::find($rating_id);
            if(!$rating){
                return response()->json([
                    "status" => "error",
                    "message" => "Couldnt find rating"
                ]);
            }
            $rating->delete();
            return response()->json([
                "status"=>"success",
                "message"=>"Rating deleted"
            ]);
        }
        else{
            return response()->json([
                "status"=>"failed",
                "message" => "Unauthorized",
            ]);
        }
    }

    public function update_rating(Request $req,$rating_id){
        $role_id = auth()->user()->role_id;
        if($role_id==2 ||$role_id==3){
            $rating=Rating::find($rating_id);
            if(!$rating){
                return response()->json([
                    "status" => "error",
                    "message" => "Couldnt find rating"
                ]);
            }
            $rating->update($req->all());
            return response()->json([
                "status" => "success",
                "data" => $rating
            ]);
        }
    }

}
