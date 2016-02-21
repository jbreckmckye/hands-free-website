const Overlay = require('./overlay');
const events = require('./events');
const parseRecipe = require('./parseRecipe');
const microphone = require('./microphone');

const recipeElement = document.querySelector('.h-recipe');
const recipe = parseRecipe(recipeElement);
const button = recipeElement.querySelector('[data-recipe-button]');

new Overlay(recipe);

button.addEventListener('click', ()=> {
    microphone.beginListening();
    events.emit('start');
});