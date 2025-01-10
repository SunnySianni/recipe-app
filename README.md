# Recipe Application

This is a simple recipe management application built with Node.js, Express, and MySQL.

## Project Overview

This application allows users to create, read, update, and delete recipes. It uses a MySQL database to store recipe information and EJS templates for rendering views.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database
4. Create a `.env` file with your database credentials and port (see `.env.example`)
5. Run the application: `npm run dev`

## Available Features

- View all recipes
- View details of a specific recipe
- Create a new recipe
- Edit an existing recipe
- Delete a recipe

## Dependencies

- Express.js: Web application framework
- Sequelize: ORM for database operations
- MySQL2: MySQL client for Node.js
- EJS: Templating engine
- Dotenv: Environment variable management

## Basic Troubleshooting

- If the application fails to start, ensure that your MySQL server is running and that the credentials in your `.env` file are correct.
- If you encounter a "SequelizeConnectionError", check your database connection settings and make sure your MySQL server is accessible.
- For any other issues, check the console output for error messages and stack traces.