<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'isAdmin' =>  False,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'Account Successfully Created',
            ]);
        }
    }

    public function update(){
        
    }

    public function destroy($id){
        User::where('id', $id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Student Deleted Successfully',
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages(),
            ]);
        }
        if (!auth()->attempt($request->only('email', 'password'), $request->remember_me)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid login details',
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Logged In',
                'isLogged' => true, 
                'data' => auth()->user(),
            ]);
        }
    }
}
