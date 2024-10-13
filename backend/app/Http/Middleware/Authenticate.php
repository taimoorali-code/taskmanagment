<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Ensure that no redirection happens if the request expects JSON
        return $request->expectsJson() ? null : null; // No redirection
    }

    /**
     * Handle unauthenticated requests.
     */
    protected function unauthenticated($request, array $guards)
    {
        // If the request expects JSON, return a JSON response with an error message
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Otherwise, just throw an AuthenticationException without redirecting
        throw new AuthenticationException(
            'Unauthenticated.', $guards
        );
    }
}
