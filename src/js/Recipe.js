const parseRecipe = require('./parseRecipe');
const trkl = require('trkl');

module.exports = Recipe;

function Recipe(recipeElement, microphone) {
    const recipeData = parseRecipe(recipeElement);
    const stepIndex = trkl(0);
    const steps = flatten([
        "Let's cook " + recipeData.title,
        "Firstly, let's go through the ingredients. You will need...",
        recipeData.ingredients,
        "You are now ready to begin cooking",
        recipeData.instructions.map((instruction, index) => {
            return "Step " + index + ". " + instruction
        }),
        "Your " + recipeData.title + ' is now ready to serve. Enjoy!'
    ]);

    microphone.lastCommand.subscribe(command => {
        const currentIndex = stepIndex();
        switch (command) {
            case 'continue':
            case 'next':
                if (currentIndex < steps.length - 1) {
                    stepIndex(currentIndex + 1);
                }
                break;

            case 'previous':
            case 'back':
                if (currentIndex > 0) {
                    stepIndex(currentIndex -1);
                }
                break;
        }
    });

    this.currentStep = trkl.computed(()=> {
        return steps[stepIndex()];
    });

    this.title = recipeData.title;

}

function flatten(array) {
    return array.reduce((flattenedProduct, thisElement) => {
        if (Array.isArray(thisElement) === false) {
            return flattenedProduct.concat([thisElement]);
        } else {
            return flattenedProduct.concat(flatten(thisElement));
        }
    }, []);
}