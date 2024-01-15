<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function index(){
      return 'Hello, admin';
    }
    public function showLoginForm()
  {
    // Your logic to display the admin login form goes here
    return 'Ovde ce biti login forma';
  }
}
