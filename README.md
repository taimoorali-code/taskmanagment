# Task Manager Application

## Overview

This is a Task Manager application that allows users to manage their tasks efficiently. It consists of a backend built with Laravel and a frontend developed using React. 

## Features

### Backend Development
- **RESTful API:** 
  - Create, retrieve, update, and delete tasks.
  - Eloquent ORM for database interactions.
  - Validation for task creation and updating.
- **Database Schema:**
  - Users and tasks tables with appropriate relationships.
- **Authentication:**
  - User authentication implemented using Laravel Sanctum.

### Frontend Development
- **Single Page Application (SPA):**

  - User Login & Registeration.
  - View all tasks.
  - Add a new task.
  - Edit an existing task.
  - Delete a task.
- **UI/UX:**
  - Responsive design using Tailwind CSS.

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

## Deployment

Instructions on how to deploy the application on platforms like Heroku or DigitalOcean will be provided here.

For more information on deploying to DigitalOcean, you can visit:  
[DigitalOcean Cloud](https://try.digitalocean.com/cloud/?utm_campaign=apac_brand_kw_en_cpc&utm_adgroup=digitalocean_exact_phrase&_keyword=digitalocean&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google&gad_source=1&gclid=CjwKCAjw3624BhBAEiwAkxgTOoy__CbvaVBZKzJvQ3w23AfEkbFQB7sp5Rdi5_XV_Zv9UoFcI_bqFBoC4igQAvD_BwE)
