<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;
use Illuminate\Support\Facades\Log;


class Admin 
{
   
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if ($token) {
            // Log token information
            Log::info("Admin Token: $token");

            if (Auth::guard('admin')->check()) {
                return $next($request);
            }
        }

        // Log unauthorized attempts
        Log::warning('Unauthorized Admin Access');

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
