/***************************************Ré des données Produits localstorage au panier**************************************/
let txt = "";
const url = "http://localhost:3000/api/products/"

//                            Création variable pour le prix total et quantité total
let totalPriceOfProduct = 0;

let totalQuantityOfProduct = 0;


for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i));
    let thisProduct = localStorage.key(i);
    let splitArray = localStorage.key(i).split(".");
    let productId = splitArray[0];
    let selectedcolor = splitArray[1];
    let quantity = splitArray[2];

    console.log("ligne 14 " + quantity)
    console.log("Voici l'id " + productId);
    console.log(selectedcolor);
    console.log("Ligne 17 CHeck quantity " + quantity);

    if (localStorage.length == null) {
        document.getElementById("cart__items").innerHTML = "Votre panier est vide ";
    } else {
        fetch(url + productId)

        .then((res) => res.json())
            .then(function diplayBasket(data) {



                txt += `<article class="cart__item" data-id="${productId}" data-color="${selectedcolor}">
                           <div class="cart__item__img">
                           <img src="${data.imageUrl}" alt="${data.altTxt}">
                          </div>
                           <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${ selectedcolor}</p>
              <p>${data.price}€</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :  </p>
              <input id=${thisProduct} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p id="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `;



                calculPrice(data.price, quantity);

                displayPrice();

                displayCart();
                calculTotalQuantity(quantity);
                ifTheQuantityChange();

            })



    }
}

function displayCart() {
    document.getElementById("cart__items").innerHTML = "Voici votre panier" + txt;
}

function calculPrice(price, quantity) {

    totalPriceOfProduct += price * quantity;

}

function calculTotalQuantity(quantity) {

    totalQuantityOfProduct += Number(quantity);
    document.getElementById("totalQuantity").innerHTML = totalQuantityOfProduct;

}

async function ifTheQuantityChange() {
    let changeTheQuantity = document.querySelectorAll(".itemQuantity");

    changeTheQuantity.addEventListener("change", (e) => {
        alert(e.target.value)
    });

    calculTotalQuantity();
    calculPrice();
}



function displayPrice() {

    document.getElementById("totalPrice").innerHTML = totalPriceOfProduct;
    return totalPriceOfProduct;

}
/**********************************Supprimer le produit stocker dans le local Storage *********************************/


/*function removeProductToCart() {
    let removeProductToLocalStorage = document.getElementById("deleteItem");
    removeProductToLocalStorage.addEventListener("click", () => {

        location.reload();
    });
}


/*****************************************Ajout des données Produits Plein OU vide (condition) **************************************/





//   Suprimer l'article au bouton

/*function deleteItems(data) {
    let deleteProduct = cart.find(
        (product) => product.id === data.id && product.selectedColor === data.selectedColor)
    console.log(" ligne 117 items à supprimer" + deleteProduct)
    removeProductToCart();

}


/**************************Formulaire contact*********************************************/



/******************************Prénom*********************************************/
//function dataClient() {
/* let firstName = document.getElementById("firstName").value;
 const checkTheFirstName = document.getElementById("firstNameErrorMsg");

 firstName.addEventListener("checkIfChange", function ev() {
     if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(ev().target.value)) {
         checkTheFirstName.innerHTML = "";
     } else {
         checkTheFirstName.innerHTML = "Attention il doit commencer par une majuscule et ne contenir que des lettres.";
     }
 })


 /*********************************Nom*********************************************/
/*let laststName = document.getElementById("lastName").value;
const checkTheLastName = document.getElementById("lastNameErrorMsg");
laststName.addEventListener("checkIfChange", function ev() {
    if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(ev().target.value)) {
        alert("Enter une email valide il doit contenir un @ : etre@parexamplecommeca.com ");
        return true;
    } else {
        return false;
    }



/******************************Adresse*********************************************/
/*let adresse = document.getElementById("address").value;
    const checkTheAddress = document.getElementById("addressErrorMsg");
    adresse.addEventListener("checkIfChange", function eve() {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(eve().target.value)) {
            alert("Enter une email valide il doit contenir un @ : etre@parexamplecommeca.com ");
            return true;
        } else {
            return false;
        }
   


    /********************************Ville*********************************************/
/*let city = document.getElementById("city").value;
    const checkTheCity = document.getElementById("cityErrorMsg");
    city.addEventListener("checkIfChange", function even() {
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(even().target.value)) {
            alert("Enter une email valide il doit contenir un @ : etre@parexamplecommeca.com ");
            return true;
        } else {
            return false;
        }
  

    /********************************E-mail*********************************************/

/*const element = document.getElementById("email");

element.addEventListener("checkIfChange", emailCheck);
let RegExp = /^[A-Z][A-Za-z\é\è\ê\@\-]+$/;

function emailCheck() {

    if (RegExp(emailCheck().target.value.test)) {

        return true;
    } else {
        alert("Enter une email valide il doit contenir un @ : etre@parexamplecommeca.com ");
        return false;
    }
}*/
let RegExp = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;;
const sub = document.getElementById("order");

function submitTheOrderId() {
    console.log()
}
sub.addEventListener("click", checkTheRequest);
let orderTherequest = checkTheRequest();
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(orderTherequest),
    headers: {
        "Content-Type": "application/json"
    }

})
console.log("Ligne OrderID" + orderTherequest);

function checkTheRequest() {
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    submitOK = "true";

    if (firstName.length > 10) {
        alert("Il ne peut pas y avoir de chiffre");
        submitOK = "false";
    }


    if (!RegExp.test(email)) {
        alert("e-mail non valide !");
        submitOK = "false";
    }

    if (submitOK == "false") {
        return false;
    }
}