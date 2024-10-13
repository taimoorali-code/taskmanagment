<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    // Check if the user is authenticated
    protected function checkAuthenticatedUser()
    {
        $user = Auth::user();

        // If user is not authenticated, return a JSON error message
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        return $user;
    }

    public function index()
    {
        try {
            // Ensure the user is authenticated
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            // Retrieve the tasks of the authenticated user
            $tasks = $user->tasks;

            // Check if the user has no tasks
            if ($tasks->isEmpty()) {
                return response()->json(['error' => 'No tasks found for the user'], 200);
            }

            // Return tasks if available
            return response()->json($tasks, 200);
        } catch (\Exception $e) {
            // Log the exception message for debugging
            \Log::error('Error fetching tasks: ' . $e->getMessage());

            // Return a more descriptive error message with the exception details
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            // Validate task creation
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            // Check if user is authenticated
            $user = $this->checkAuthenticatedUser();
            if (is_null($user)) {
                return response()->json(['error' => 'Unauthorized'], 401); // Return unauthorized if user is null
            }

            // Create task for authenticated user
            $task = $user->tasks()->create($request->all());

            return response()->json($task, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Task creation failed', 'message' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        try {
            // Check if user is authenticated
            $user = $this->checkAuthenticatedUser();
            if (is_null($user) || $user->getStatusCode() === 401) {
                return $user;
            }

            // Show a specific task
            $task = $user->tasks()->findOrFail($id);

            return response()->json($task, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Task not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve task'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate task update
            $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'completed' => 'boolean',
            ]);

            // Check if user is authenticated
            $user = $this->checkAuthenticatedUser();
            if (is_null($user)) {
                return response()->json(['error' => 'Unauthorized'], 401); // Return unauthorized if user is null
            }

            // Find and update task
            $task = $user->tasks()->findOrFail($id);
            $task->update($request->all());

            return response()->json($task, 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Task not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update task'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Check if user is authenticated
            $user = $this->checkAuthenticatedUser();
            if (is_null($user)) {
                return response()->json(['error' => 'Unauthorized'], 401); // Return unauthorized if user is null
            }

            // Find and delete task
            $task = $user->tasks()->findOrFail($id);
            $task->delete();

            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Task not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete task'], 500);
        }
    }
}
