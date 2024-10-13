# Task Manager Application

## Overview

This is a Task Manager application that allows users to manage their tasks efficiently. It consists of a backend built with Laravel and a frontend developed using Vue.js (or React). 

## Features

### Backend Development
- **RESTful API:** 
  - Create, retrieve, update, and delete tasks.
  - Eloquent ORM for database interactions.
  - Validation for task creation and updating.
- **Database Schema:**
  - Users and tasks tables with appropriate relationships.
- **Authentication:**
  - User authentication implemented using Laravel Passport.

### Frontend Development
- **Single Page Application (SPA):**
  - View all tasks.
  - Add a new task.
  - Edit an existing task.
  - Delete a task.
- **UI/UX:**
  - Responsive design using Bootstrap (or Tailwind CSS).

## Deployment

Instructions on how to deploy the application on platforms like Heroku or DigitalOcean will be provided here.

## API Documentation

### Endpoints
- **Create Task:** `POST /api/tasks`
- **Get All Tasks:** `GET /api/tasks`
- **Update Task:** `PUT /api/tasks/{id}`
- **Delete Task:** `DELETE /api/tasks/{id}`

## Setup Instructions

### Backend
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using Composer:
   ```bash
   composer install
    ```
4. Setup .env copy .env.example to .env
```bash
cp .env.example .env
```
5. Migrate database 
```bash
php artisan migrate
```
6. Start the server
```bash
php artisan serve
```

### Frontend
1. Clone the repository.
2. Navigate to the `task-manager-frontend` directory.
3. Install dependencies using npm:
   ```bash
    npm install
    ```
4. Start the development server
```bash
npm run start
```