/***************************************Ajout des données Produits localstorage au panier**************************************/

let basketInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(basketInLocalStorage);


//                            Création variable pour le prix total et quantité total

let totalPriceOfProduct = [];
let totalQuantityOfProduct = [];


/*****************************************Ajout des données Produits Plein OU vide (condition) **************************************/

if (basketInLocalStorage == null) {
    document.getElementById("cart__items").innerHTML = "Votre panier est vide 😱";
} else {
    document.getElementById("cart__items").innerHTML = "Voici votre panier" + '';
    //                          Création de boucle et de HTML afin d'aficher les produits

    for (i = 0; i < basketInLocalStorage.length; i += 1) {


        document.getElementById("cart__items").innerHTML +=

            `<article class="cart__item" data-id="${basketInLocalStorage[i].data.id}" data-color="${basketInLocalStorage[i].data.selectedcolor}">
                     <div class="cart__item__img">
                     <img src="${basketInLocalStorage[i].data.image}" alt="${basketInLocalStorage[i].data.alt}">
                    </div>
                     <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${basketInLocalStorage[i]+ data.name}</h2>
        <p>${basketInLocalStorage[i]+ data.selectedcolor}</p>
        <p>${totalPriceOfProduct}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${totalQuantityOfProduct}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketInLocalStorage[i].selectedQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem"> productId= "${basketInLocalStorage[i].id}" productColor="${basketInLocalStorage[i].selectedcolor}" productQuantity= "${basketInLocalStorage[i].selectedQuantity}"Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;


        //                            Transformer LE TYPE EN NOMBRE

        let quantityIsANumber = parseInt(basketInLocalStorage[i].selectedQuantity);
        let priceIsANumber = parseInt(basketInLocalStorage[i].prix * basketInLocalStorage[i].selectedQuantity);

        //                         PUSH DES NOMBRES DANS LES VARIABLES TABLEAUX
        totalPriceOfProduct.push(priceIsANumber);
        totalQuantityOfProduct.push(quantityIsANumber);

    }
}