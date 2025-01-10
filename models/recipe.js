import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconnection.js';

const Recipe = sequelize.define(
  'Recipe',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'recipeapp', // Specify the table name
    timestamps: true, // Enable createdAt and updatedAt fields
    createdAt: 'created_at',  // Specify the column name for createdAt
    updatedAt: 'updated_at',  // Specify the column name for updatedAt
  }
);

export default Recipe;
