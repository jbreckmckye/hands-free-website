const overlay = require('./overlay');
const parseRecipe = require('./parseRecipe');
const microphone = require('./microphone');

const recipeElement = document.querySelector('.h-recipe');
const recipe = parseRecipe(recipeElement);

window.begin = microphone.beginListening;

window.o = new overlay();