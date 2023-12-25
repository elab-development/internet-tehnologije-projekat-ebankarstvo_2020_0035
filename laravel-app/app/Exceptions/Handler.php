<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // You can add additional reporting logic here if needed
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $exception
     * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Throwable $exception)
    {
        return $this->handleException($exception);
    }

    /**
     * Handle an exception and return a JSON response.
     *
     * @param Throwable $exception
     * @return \Illuminate\Http\JsonResponse
     */
    private function handleException(Throwable $exception)
    {
        return response()->json([
            'message' => $exception->getMessage(),
        ], $this->isHttpException($exception) ? $exception->getStatusCode() : 500);
    }

    /**
     * Get the HTTP status code for the exception.
     *
     * @param Throwable $exception
     * @return int
     */
    private function getStatusCodeForException(Throwable $exception)
    {
        // Customize the logic to determine the status code based on the exception
        // For example, you can check for specific exception types and return appropriate status codes
        return method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;
    }
}