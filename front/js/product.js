/**************AFFICHER LE PRODUIT SELECTIONNER****************/

//Création de variable vers le serveur
const url = "http://localhost:3000/api/products/"

//Nouveau Paramètre avec UrlSearchParams
let params = new URLSearchParams(document.location.search);
let id = params.get("_id");
let product = "";

console.log("Voici l'id du produit :" + id);

displayProduct();


//             Fonction qui verifie les quantité 
let maxQuantity = 100;
let minQuantity = 1;

function checkQuantity(quantity) {
    if (quantity > maxQuantity || quantity < 1) {
        alert('veuillez choisir une quantité entre 1 et 100');
        return false;
    } else {
        return true;
    }
}

function addItemToCart(productObject) {

    let productName = productObject.idProduct + '.' + productObject.color + '.' + productObject.quantity;

    if (localStorage.getItem(productName)) {
        alert(productName + ' la quantité du produit a été mis à jour ')
    } else {
        alert(productName + ' a été ajouté ')
    }
    localStorage.setItem(productName, JSON.stringify(productObject));

}

function displayProduct() {
    fetch(url + id)
        .then((res) => res.json())
        .then(function displayProduct(data) {

            let img = document.createElement("img");
            img.src = data.imageUrl;
            img.alt = data.altTxt;
            let element = document.getElementById("item__img");
            element.appendChild(img);
            document.getElementById("title").innerHTML = data.name;
            document.getElementById("price").innerHTML = data.price;
            document.getElementById("description").innerHTML = data.description;
            addColors(data);


        })
        .catch((er) => {
            document.querySelector(".item").innerHTML = "<h1>Attention erreur 404</h1>";
            console.log(er);

        })

}

function addColors(data) {

    let colors = "Choissisez la Couleur";

    for (i = 0; i < data.colors.length; i++) {
        colors += '<option>' + data.colors[i] + '</option>';
    }

    document.getElementById("colors").innerHTML = colors;


    /********************Gestion De l'Ajout AU Panier ********************/
    console.log(data);


    let addToCart = document.getElementById("addToCart");
    let selectedcolor = document.getElementById("colors");
    let selectedQuantity = document.getElementById("quantity");


    addToCart.addEventListener("click", function addProductToCart() {


        let productObject = {
            idProduct: id,
            quantity: selectedQuantity.value,
            color: selectedcolor.value
        };

        // Permet de vérifier la quantité
        if (checkQuantity(selectedQuantity.value)) {
            addItemToCart(productObject);

        }

    })

}