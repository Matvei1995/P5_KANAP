/**************AFFICHER LE PRODUIT SELECTIONNER****************/

//Création de variable vers le serveur
const url = "http://localhost:3000/api/products/"

//Nouveau Paramètre avec UrlSearchParams
let params = new URLSearchParams(document.location.search);
let id = params.get("_id");
let product = "";

console.log("Voici l'id du produit :" + id);
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
        product = data;

    })
    .catch((er) => {
        document.querySelector(".item").innerHTML = "<h1>Attention erreur 404</h1>";
        console.log(er);

    })

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
    let basketInLocalStorage = "";
    let loop = 0;
    addToCart.addEventListener("click", function addProductToCart() {




        /*************************************************PERMET DE VERIFIER LES QUANTITES***********************************************/
        if (selectedQuantity.value >= 101) {
            alert("Veuillez ajouté une quantité comprise entre 1 et 100");
            return false

        }

        if (selectedQuantity.value <= 0) {

            return alert("Veuillez ajouté une quantité");

        } else if (selectedQuantity.value >= 1 && selectedQuantity.value < 101) {

            let productObject = {
                idProduct: id,
                Quantity: selectedQuantity.value,
                color: selectedcolor.value
            };
            localStorage.setItem("product", JSON.stringify(productObject));





            alert("Ajout de l\'article " + product.name + " Couleur: " + selectedcolor.value + " Quantite: " + selectedQuantity.value);

            // Si le localStorage est vide
            if (!productObject) { //(!basketInLocalStorage) { //(!localStorage.getItem("product")) {
                console.log("Ligne 79");
                localStorage.getItem("product");
                basketInLocalStorage = [];
                //basketInLocalStorage.push(productObject);

                console.log(" Si le localStorage est vide " + selectedcolor.value);
                console.log(" Si le localStorage est vide " + selectedQuantity.value);


            }


            // Si le localStorage contient un produit 
            else {
                console.log("le localstorage n'est pas vide");
                console.log("les Object du tableau " + productObject);

                basketInLocalStorage = localStorage.getItem("product");
                basketInLocalStorage += productObject;
                localStorage.setItem("product", (basketInLocalStorage));
                /*for (i = 0; i < basketInLocalStorage.length; i++) {

                    if (basketInLocalStorage[i].selectedcolor === selectedcolor.value && basketInLocalStorage[i].selectedQuantity === selectedQuantity.value) {
                        selectedQuantity.value == selectedQuantity.value++;
                        basketInLocalStorage.push(selectedQuantity.value);
                        localStorage.setItem("product", JSON.stringify(basketInLocalStorage));
                        loop = 1;
                        console.log(basketInLocalStorage);
                        basketInLocalStorage = JSON.parseInt(localStorage.getItem("product"));
                        basketInLocalStorage.push(productObject)
                    }

                    if (loop == 0) {
                        basketInLocalStorage.push(productObject);
                    }
                }*/
            }


        }
    })
};