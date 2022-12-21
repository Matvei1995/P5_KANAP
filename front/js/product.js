/**************AFFICHER LE PRODUIT SELECTIONNER****************/


//Récupération de l'id via les paramètres de l'url

const productId = new URLSearchParams(window.location.search).get("_id");
console.log(productId);

let pageTitle = document.title;
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productdescription = document.getElementById("description");
let selectColors = document.getElementById("colors");
//Récupération du produit grace a son id
async function getProduct() {
    let response = await fetch("http://localhost:3000/api/products/" + productId);
    const productData = await response.json();

    document.title = productData.name;
    productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    productTitle.innerHTML = productData.name;
    productPrice.innerHTML = productData.price;
    productdescription.innerHTML = productData.description;
    productData.colors.forEach((colors) => {
            let optionColors = document.createElement("option");
            selectColors.appendChild(optionColors);
            optionColors.value = colors;
            optionColors.innerHTML = colors;
        })
        /*.catch((er) => {
            document.querySelector(".item").innerHTML = "<h1>Attention erreur 404</h1>";
            console.log(er);

        });*/
}
getProduct();

//Ajout un produit au panier

document.getElementById("addToCart").onclick = (data) => {
    const color = selectColors.value;
    const quantity = document.getElementById("quantity").value;
    if (color == "") {
        alert("Veuillez choisir une couleur");
        return;
    }
    if (quantity <= 0 || quantity >= 100) {
        alert("Veuillez choisir une comprise entre 0 et 100");
        return;
    }
    let productSave = {
        _id: productId,
        color: color,
        quantity: parseInt(quantity),
    };

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Votre produit à bien été ajouté " + productId + " \n" + color + "\n" + quantity)
    }

    function getCart() {
        let cart = localStorage.getItem("cart");
        if (cart == null) {
            return [];
        } else {
            return JSON.parse(cart);
        }
    }


    function addCart(product) {
        let cart = getCart();
        let foundProduct = cart.find(
            (p) => p.id == product.id && p.color == product.color
        );
        if (foundProduct != undefined) {
            product.quantity = parseInt(quantity);
            foundProduct.quantity += parseInt(quantity);
        } else {
            cart.push(product);
        }
        saveCart(cart);
    }
    addCart(productSave);
};


//Création de variable vers le serveur
//const url = "http://localhost:3000/api/products/"

//Nouveau Paramètre avec UrlSearchParams
/*let params = new URLSearchParams(document.location.search);
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

    //********************Gestion De l'Ajout AU Panier ********************
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

}*/

//Création de variable vers le serveur
//const url = "http://localhost:3000/api/products/"

//Nouveau Paramètre avec UrlSearchParams
/*let params = new URLSearchParams(document.location.search);
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

    document.getElementById("colors").innerHTML = colors;*/


/********************Gestion De l'Ajout AU Panier ********************/
/*console.log(data);


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
*/