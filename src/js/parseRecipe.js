module.exports = parseRecipe;

function parseRecipe(recipeElement) {
    return {
        title:
            queryRecipe('.p-name')[0].innerText,
        ingredients:
            queryRecipe('.p-ingredient').map(el => el.innerText),
        instructions:
            toArray(queryRecipe('.e-instructions')[0].children)
            .map(el => el.innerText)
    };

    function queryRecipe(key) {
        const nodes = recipeElement.querySelectorAll(key);
        return toArray(nodes);
    }

    function toArray(x) {
        return Array.prototype.slice.call(x);
    }
}