import React, { useEffect, useState } from "react"
import UserP from "../../components/UserP"
import axios from "axios"


const UserProfile=()=>{
    const [userinfo,setuserinfo]=useState([]);
    function get_info(){
        axios.get("http://localhost:8000/api/show",{
            headers:{
                Authorization :`Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(function(res){
            setuserinfo(res.data.userinfo)
       })
    } 

    useEffect(()=>{
        get_info()
    },[])

    return(
        <>
        {userinfo && (
            <UserP
                fname={userinfo.fname}
                lname={userinfo.lname}
                email={userinfo.email}
                gender={userinfo.gender}
                image={userinfo.image_url}
            />
        )}
    </>
);
};

export default UserProfile