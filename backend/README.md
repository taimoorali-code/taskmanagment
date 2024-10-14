# API Documentation: Task Management Application

This documentation provides a detailed guide on how to use the API endpoints for managing tasks in your Task Management Application. The application backend is built using **Laravel**, while the frontend is built using **React.js**.

## Base URL

All API requests will be made to the following base URL:

## Endpoints

### 1. Create Task

-   **URL:** `POST /api/tasks`
-   **Description:**  
    This endpoint is used to create a new task. A task must have a `title` and `description`.

-   **Request Body:**
    ```json
    {
        "title": "Task Title",
        "description": "Task Description"
    }
    ```
-   **Response Success (201 Created):**

    ```json
    {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "created_at": "2024-10-12T10:00:00.000Z",
        "updated_at": "2024-10-12T10:00:00.000Z"
    }
    ```

-   **Response Failure (400 Bad Request):**
    ```json
    {
        "error": "Validation error message"
    }
    ```

### 2. Get All Tasks

-   **URL:** `GET /api/tasks`
-   **Description:**  
    This endpoint retrieves a list of all tasks.

-   **Response Success (201 Created):**

    ```json
    [
        {
            "id": 1,
            "title": "Task Title 1",
            "description": "Task Description 1",
            "created_at": "2024-10-12T10:00:00.000Z",
            "updated_at": "2024-10-12T10:00:00.000Z"
        },
        {
            "id": 2,
            "title": "Task Title 2",
            "description": "Task Description 2",
            "created_at": "2024-10-12T11:00:00.000Z",
            "updated_at": "2024-10-12T11:00:00.000Z"
        }
    ]
    ```

-   **Response Failure (404 Not Found):**
    ```json
    {
        "error": "error message"
    }
    ```

### 3. Update Task

-   **URL:** `PUT /api/tasks/{id}`
-   **Description:**  
    This endpoint is used to update an existing task. The task ID is required in the URL.

-   **Request Body:**

    ```json
    {
        "title": "Updated Task Title",
        "description": "Updated Task Description"
    }
    ```

-   **Response Success Success (200 OK):**

    ```json
    {
        "id": 1,
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "created_at": "2024-10-12T10:00:00.000Z",
        "updated_at": "2024-10-12T12:00:00.000Z"
    }
    ```

-   **Response Failure (404 Not Found):**
    ```json
    {
        "error": "Task not found"
    }
    ```

### 4. Delete Task

-   **URL:** `GET /api/tasks`
-   **Description:**  
    This endpoint retrieves a list of all tasks.

-   **Response Success (200 OK):**

    ```json
    {
        "message": "Task deleted successfully"
    }
    ```

-   **Response Failure (404 Not Found):**
    ```json
    {
        "error": "error message"
    }
    ```
