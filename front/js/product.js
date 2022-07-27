/**************AFFICHER LE PRODUIT SELECTIONNER****************/

//Création de variable vers le serveur
const url = "http://localhost:3000/api/products/"

//Nouveau Paramètre avec UrlSearchParams
let params = new URLSearchParams(document.location.search);
let id = params.get("_id");

console.log("La variable params =" + params);
console.log("Voici l'id du produit :" + id);
fetch(url + id)
    .then((res) => res.json())
    .then(function(data) {

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

function addColors(data) {

    console.log(data.colors);
    let colors = "Choissisez la Couleur";
    for (i = 0; i < data.colors.length; i++) {

        colors += '<option>' + data.colors[i] + '</option>';
        console.log(data.colors[i]);
    }
    document.getElementById("colors").innerHTML = colors;
};

/********************Gestion De l'Ajout AU Panier ********************/

localStorage.setItem("product", "id");
localStorage.getItem("product");
for (let i = 0; i < localStorage.length; i++) {
    localStorage.key(i);
}
console.log(localStorage);
let addToBasket = document.getElementById("colors");
let productChoise = addToBasket.value;
console.log("test product choix" + productChoise);
/*addToBasket.addEventListener("click", function saveInToLocalStorage() {

    let color = '';
    let quantity = '';
    let product = [id, color, quantity];
    localStorage.setItem('product', product += product);

})
saveInToLocalStorage();*/
//let productInfo = ["id,  "]
/* id: id,
        select: ("Color", document.getElementById("colors").value),
        quantity: ("Quantity", document.getElementById("quantity").value)
    }*/

/* let findProducts = JSON.parse(localStorage.getItem("Kanap"));
    //Si le panier comporte déjà au moins 1 article
    if (findProducts) {
        let resultFind = findProducts.find(
            (res) => res.id === id && res.select === document.getElementById("colors").value);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantity =
                parseInt(productInfo.quantity) + parseInt(resultFind.quantity);
            resultFind.quantity = newQuantity;
            localStorage.setItem("Kanap", JSON.stringify(products));
            alert("Attention déja dans votre panier");
            //Si le produit commandé n'est pas dans le panier
        } else {

            localStorage.setItem("Kanap", JSON.stringify(products));
            products.push(productInfo);
            alert("veuillez ajouter un article");
        }
        //Si le panier est vide
    } else {
        findProducts = [];
        localStorage.setItem("Kanap", JSON.stringify(findProducts));
        products.push(productInfo);

    }
    console.log(productInfo);
    console.log(findProducts);

})*/





//Ajout AU Panier (A vérifier code pas définitif à supprimer si besoin)
/*let button = document.getElementById("addtoCart").innerHTML;
button.addEventListener("click", addToBasket);

function addToBasket(button) {
    let theColorChoice = document.querySelector("#colors").value;
    let theQuantityChoice = document.querySelector("#quantity").value;

    // Si la couleur n'a pas été choisit 
    if (colors == null) {
        alert(" 🚫 ATTENTION Vous n'avez pas choisi de couleur 🚫 !");
        return;
    }
    // Si la quantité est superieur à 100
    else if (quantity > 100) {
        alert("🚫 ATTENTION Le nombres du produit doit être - de 100 ! 🚫");
        return;

    }
    //La commande à bien été enregistré
    else {
        alert("C'est bien ajouté au panier, Merci 😀!");
    }


}
addToBasket();*/