//API FETCH
//Afficher tout les produits

let url = "http://localhost:3000/api/products";
let txt = "";
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

        console.log(data);
        displayProducts(data);
        document.getElementById("items").innerHTML = txt;
    })
    .catch((er) => {
        document.querySelector("#items").innerHTML = "<h1>Attention pensée à allumer le serveur API <br> <br>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + er);
    });


function displayProducts(data) {
    let i = 0;

    for (i = 0; i < data.length; i++) {

        console.log(data[i]._id)
        txt += '<a href="./product.html?_id=' + data[i]._id + '" > \
            <article>\
              <img src ="' + data[i].imageUrl + '"  alt="' + data.altTxt + '">\
              <h3 class="productName">' + data[i].name + '</h3>\
              <p class="productDescription">' + data[i].description + 'Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>\
            </article>\
          </a> ';

    }
    
}
