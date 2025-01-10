import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipe.js';  // Import backend route module
import sequelize from './config/dbconnection.js';
import { rmSync } from 'fs';
import methodOverride from 'method-override';

dotenv.config();

// Get the current directory name for file path calculations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Allow forms to use PUT and DELETE
app.use(methodOverride('_method')); // This should be before the routes

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes - Make sure to use backend routes for /recipe
app.use('/recipe', recipeRoutes); // Routes related to recipes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Test database connectivity and synchronization
sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
