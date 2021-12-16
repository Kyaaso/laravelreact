<?php

namespace App\Http\Controllers;

use App\Mail\UserUpdateNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserNotificationController extends Controller
{
    public function accountUpdate(Request $request){
        Mail::to($request->adminEmail)->send(new UserUpdateNotification($request->adminName));

        return response()->json([
            'status'=>200,
            'adminName' => $request->adminName,
            'adminEmail' => $request->adminEmail,]);
            

    }
}
