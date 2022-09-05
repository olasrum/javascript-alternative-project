document.getElementById('search').addEventListener('click', function(e) {
    e.preventDefault()

    const cocktail = document.getElementById('cocktail').value;

    document.getElementById('cocktail').value = ''

    document.getElementById('cocktail-recipes').innerHTML = ''

    fetch ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail)
    .then(resp => resp.json())
    .then(cocktail => displayCocktail(cocktail))
    })  

    function displayCocktail(cocktail) {
        console.log(cocktail);
        const results = cocktail.drinks;
        console.log(cocktail.drinks);
        for (let i = 0; i < results.length; i++) {
            const cocktailRecipes = document.getElementById('cocktail-recipes'); 

            const button = document.createElement('button');
            button.innerHTML = `<button id="like-cocktail" class="btn btn-like"> <span class="btn-icon btn--icon-default"> <span class="fa fa-heart"></span> </span> <span class="btn-icon btn--icon-liked"> <span class="fa fa-heart"> </span> </span> <span class="btn-content  btn-content--liked">Liked</span> <span class="btn-content btn-content--default">Like</span></button>`
            cocktailRecipes.append(button);

            button.addEventListener('click', () => {
                button.classList.toggle('liked')
            })

            const name = document.createElement('h2');
            name.innerHTML = results[i].strDrink;
            cocktailRecipes.append(name);

            const image = document.createElement('img');
            image.src = results[i].strDrinkThumb;
            cocktailRecipes.append(image);

            let ingredients = [];
            let measures = [];

            for (let key in results[i]) {
                if (key.includes('strIngredient')) {
                    if (results[i][key]) {
                        ingredients.push(results[i][key]);
                        keyIndex = key.substr(key.length - 1);
                        if (results[i]['strMeasure' + keyIndex]) {
                            measures.push(results[i]['strMeasure' + keyIndex])
                        } else {
                            measures.push('');
                        }
                    }
                }
            }
            const list = document.createElement('ul');
            for (let j = 0; j < ingredients.length; j++) {
                const item = document.createElement('li');
                item.innerHTML = measures[j] + ' ' + ingredients[j];
                list.append(item);
            }
            cocktailRecipes.append(list);
            
            const instructions = document.createElement('p');
            instructions.innerHTML = results[i].strInstructions;
            cocktailRecipes.append(instructions);

            document.getElementById('cocktail-container').append(cocktailRecipes)

        }
    }


//$("#search").on("click", function() {
   // var cocktail = $("#cocktail").val();
   // var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail;
   // $.ajax({
    //  url: queryURL,
    //  method: "GET"
  //  }).then(function(response) {
    //  console.log(response);
     // var results = response.drinks;
    //  for (var i = 0; i < results.length; i++) {
     //   var cocktailDiv = $("<div class='well'>");
      //  var name = $("<h2>").text(results[i].strDrink);
      //  cocktailDiv.append(name);
      //  var image = $("<img>").attr("src", results[i].strDrinkThumb);
      //  cocktailDiv.append(image);
      //  var recipe = $("<p>").text(results[i].strInstructions);
      //  cocktailDiv.append(recipe);
      //  var ingredients = [];
      //  var measures = [];
       // for (var key in results[i]) {
         // if (key.includes("strIngredient")) {
           // if (results[i][key]) {
           //   ingredients.push(results[i][key]);
             // keyIndex = key.substr(key.length - 1);
             // if (results[i]["strMeasure" + keyIndex]) {
             //   measures.push(results[i]["strMeasure" + keyIndex]);
             // } else {
             //   measures.push("");
         //     }
         //   }
         // }
      //  }
      //  var list = $("<ul>");
      //  for (var j = 0; j < ingredients.length; j++) {
      //    var item = $("<li>");
      //    item.text(measures[j] + " " + ingredients[j]);
      //    list.append(item);
       // }
      //  cocktailDiv.append(list);
      //  $("#cocktail-recipes").append(cocktailDiv);
     // }
  //  });
 // });       
       