const Application = require('./Application');
const Microphone = require('./Microphone');
const Overlay = require('./Overlay');
const Recipe = require('./Recipe');
const Speaker = require('./Speaker');
const StartButton = require('./StartButton');

// Find our HTML view
const recipeElement = document.querySelector('.h-recipe');
// Instantiate global state
const app = new Application();
// Create the toggle button
new StartButton(app, recipeElement.querySelector('[data-recipe-button]'));
// Listen to voices
const microphone = new Microphone(app);
// Track where we are in that recipe data
const recipe = new Recipe(recipeElement, microphone);
// Display the state of the application
new Overlay(app, microphone, recipe);
// Create a speaker that can read out the recipe
new Speaker(app, recipe, microphone);