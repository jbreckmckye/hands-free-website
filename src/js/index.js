const view = getElementWithData('recipe', document);
const data = getRecipeData(view);

getElementWithData('button', view).addEventListener('click', ()=> {
    window.alert('Boot application');
})


function getRecipeData(recipeEl) {
    return {
        title : extractText('title'),
        description : extractText('description'),
        ingredients : extractTextList('ingredients'),
        method : extractTextList('method')
    };

    function extractText(key) {
        return getElementWithData(key, recipeEl).innerText;
    }

    function extractTextList(key) {
        return getElementWithData(key, recipeEl).map(li => li.innerText);
    }
}

function getElementWithData(key, scope) {
    return scope.querySelector('[data-' + key + ']');
}