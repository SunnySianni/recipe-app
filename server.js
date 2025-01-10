import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipe.js';
import sequelize from './config/dbconnection.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/recipe', recipeRoutes);

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
  console.log(`Server listening at http://localhost:${PORT}/recipe`);
});