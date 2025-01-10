import express from 'express';
import Recipe from '../models/recipe.js';

const router = express.Router();

// List all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.render('index', { recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).send(err.message);
  }
});

// Show form to create a new recipe
router.get('/new', (req, res) => {
  res.render('recipeForm', { recipe: null });
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = await Recipe.create({ title, ingredients, instructions });
    res.redirect(`/recipe/${newRecipe.id}`);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(400).send(err.message);
  }
});

// Show recipe details
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.render('recipeDetails', { recipe });
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).send(err.message);
  }
});

// Show form to edit a recipe
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.render('recipeForm', { recipe });
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error("Error fetching recipe for editing:", err);
    res.status(500).send(err.message);
  }
});

// Update after editing a recipe
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      const { title, ingredients, instructions } = req.body;
      await recipe.update({ title, ingredients, instructions });
      res.redirect(`/recipe/${recipe.id}`);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(400).send(err.message);
  }
});

// Delete a recipe
router.post('/:id/delete', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.destroy();
      res.redirect('/recipe');
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).send(err.message);
  }
});

export default router;
