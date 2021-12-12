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

    public function update(Request $request, $id){
        $user = User::find($id);

        if($request->email == $user->email){
            $validator = Validator::make($request->all(),[
                'name' => 'required|max:255',
            ]);

            if($validator->fails()){
                return response()->json([
                    'validate_err' => $validator->messages(),
                ]);
            }else{
                User::where('id', $id)->update([
                    'name' => $request->name,
                    'isAdmin' => $request->isAdmin,
                ]);
            }
        }else{
            $validator = Validator::make($request->all(),[
                'name' => 'required|max:255',
                'email' => 'required|email|max:255|unique:users,email',
            ]);
            if($validator->fails()){
                return response()->json([
                    'validate_err' => $validator->messages(),
                ]);
            }else{
                User::where('id', $id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'isAdmin' => $request->isAdmin,
                ]);
            }
        }
        
        return response()->json([
            'status'=>200,
            'message' => 'User Updated Sucessfully']);
    }

    public function search($id){
        $user = User::find($id);
        if($user){
            return response()->json([
                'status' => 200,
                'message' => $user,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'User not found!',
            ]);
        }
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
