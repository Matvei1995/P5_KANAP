/***************************************Récupération des données Produits localstorage au panier**************************************/

async function getCartInLocalStorage() {
    let cartInLocalStorage = await JSON.parse(localStorage.getItem("cart"));
    if (cartInLocalStorage == null || cartInLocalStorage == 0) {
        document.querySelector("h1").innerHTML = `Votre Panier est vide`;
        cartInLocalStorage = [];
    }
    return cartInLocalStorage;
}
// Récupererations des produits depuis l'APi
async function getDataProduct() {
    let response = await fetch("http://localhost:3000/api/products/");
    const productData = await response.json();
    return productData;
}

// Récupérer les details du produit présent dans le panier depuis l'api

// les mettre dans un nouveau tableau productDisplay
async function getCartProduct() {
    let cart = await getCartInLocalStorage();
    let data = await getDataProduct();
    let productDisplay = [];

    for (let product of cart) {
        let foundProduct = data.find((p) => p._id == product._id);

        if (foundProduct) {
            product.name = foundProduct.name;
            product.imageUrl = foundProduct.imageUrl;
            product.altTxt = foundProduct.altTxt;
            product.price = foundProduct.price;
            productDisplay.push(product);
        }
    }
    return productDisplay;
}

// afficher les produits
async function cartDisplay() {
    const productDisplay = await getCartProduct();

    // //afficher les produit
    const cartItems = document.getElementById("cart__items");
    for (let product of productDisplay) {
        cartItems.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
        deleteProduct(product);
    }
    cartTotal(productDisplay);
    changeQuantity();
}
// //afficher quantité et prix total

async function cartTotal(productDisplay) {
    let sumQuantity = 0;
    let sumPrice = 0;
    for (let product of productDisplay) {
        sumQuantity += parseInt(product.quantity);
        sumPrice += product.price * product.quantity;
    }
    document.getElementById("totalQuantity").innerText = sumQuantity;
    document.getElementById("totalPrice").innerText = sumPrice;
}

//Modifier la quantité de produit
async function changeQuantity() {
    let cartInLocalStorage = await getCartInLocalStorage();
    let cartDisplay = await getCartProduct();
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    for (let input of inputQuantity) {
        input.addEventListener("change", (e) => {
            const productData = input.closest("article");
            let newValue = e.target.value;

            if (newValue <= 0 || newValue >= 100) {
                e.target.value = 1;
                newValue = 1;
            }
            input.innerText = newValue;
            console.log(newValue);

            // enregistré la nouvelle quantité dans le localStorage
            for (let product of cartInLocalStorage) {
                if (
                    product._id == productData.dataset.id &&
                    product.color == productData.dataset.color
                ) {
                    product.quantity = newValue;
                    if (product)
                        localStorage.setItem("cart", JSON.stringify(cartInLocalStorage));
                }
            }

            // enregistrement de la nouvelle quantité dans productDisplay + calcul total
            for (let product of cartDisplay) {
                if (
                    product._id == productData.dataset.id &&
                    product.color == productData.dataset.color
                ) {
                    product.quantity = newValue;
                    console.log(cartDisplay);
                }
                cartTotal(cartDisplay);
            }
        });
    }
}

// Supprimer un produit
async function deleteProduct(product) {
    let cartInLocalStorage = await getCartInLocalStorage();
    let btnDelete = document.querySelectorAll(".deleteItem");
    for (let btn of btnDelete) {
        btn.addEventListener("click", (e) => {
            const foundProduct = cartInLocalStorage.filter(
                (p) => p._id != product.id && p.color != product.color
            );
            if (foundProduct != undefined) {
                localStorage.setItem("cart", JSON.stringify(foundProduct));
                window.location.reload();
            }
        });
    }
}

cartDisplay();

// /////////////////////////////////////////////////////////
// /FORMULAIRE/ //
// Permet de vérifier les informations de l'utilisateur

const form = document.querySelector(".cart__order__form");

// RegExp
const nameRegExp = new RegExp("^[a-zA-Z, .'-]+$");
const addressRegExp = new RegExp("(?:[A-Z][a-zA-Z0-9,-]+[ ]?)+");
const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

//Ecouter la modification du Prénom
form.firstName.addEventListener("change", function() {
    validFirstName(this);
});
//Ecouter la modification du Nom
form.lastName.addEventListener("change", function() {
    validLastName(this);
});

//Ecouter la modification de l'adresse
form.address.addEventListener("change", function() {
    validAddress(this);
});
//Ecouter la modification de la ville
form.city.addEventListener("change", function() {
    validCity(this);
});
//Ecouter la modification de l'email
form.email.addEventListener("change", function() {
    validEmail(this);
});

// Validation du Prénom
const validFirstName = function(inputFirstName) {
    if (nameRegExp.test(inputFirstName.value)) {
        document.getElementById("firstNameErrorMsg").innerText = "";
        return true;
    } else {
        document.getElementById("firstNameErrorMsg").innerText =
            "Prénom non valide";
        return false;
    }
};


// Validation du Nom
const validLastName = function(inputLastName) {
    if (nameRegExp.test(inputLastName.value)) {
        document.getElementById("lastNameErrorMsg").innerText = "";
        return true;
    } else {
        document.getElementById("lastNameErrorMsg").innerText = "Nom non valide";
        return false;
    }
};


// Validation de l'Addresse
const validAddress = function(inputAddress) {
    if (addressRegExp.test(inputAddress.value)) {
        document.getElementById("addressErrorMsg").innerText = "";
        return true;
    } else {
        document.getElementById("addressErrorMsg").innerText = "Addresse non valide";
        return false;
    }
};


// Validation de la Ville
const validCity = function(inputCity) {
    if (addressRegExp.test(inputCity.value)) {
        document.getElementById("cityErrorMsg").innerText = "";
        return true;
    } else {
        document.getElementById("cityErrorMsg").innerText = "Ville non valide";
        return false;
    }
};

// Validation de l'Email
const validEmail = function(inputEmail) {
    if (emailRegExp.test(inputEmail.value)) {
        document.getElementById("emailErrorMsg").innerText = "";
        return true;
    } else {
        document.getElementById("emailErrorMsg").innerText = "Email non valide";
        return false;
    }
};


// Envoie du formulaire
async function postOrder() {
    let cart = await getCartInLocalStorage();
    let products = [];
    form.addEventListener("submit", function(e) {
        e.preventDefault(); //stop l'action par defaut
        if (
            validFirstName(form.firstName) &&
            validLastName(form.lastName) &&
            validAddress(form.address) &&
            validCity(form.city) &&
            validEmail(form.email)
        ) {
            //Constituer un objet contact (à partir des données du formulaire)
            let contact = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value,
            };
            // tableau de produits
            for (let product of cart) {
                products.push(product._id);
            }
            const options = {
                method: "POST",
                body: JSON.stringify({ contact, products }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    document.location.href = "confirmation.html?id=" + data.orderId;
                    localStorage.clear();
                });
        } else {
            console.log("Non ok");
        }
    });
}
postOrder();
console.log();