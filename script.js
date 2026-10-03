
/* =========================================
   LUMA JEWELRY PRODUCTS
========================================= */


const products = [

    {
        id: 1,
        name: "Elegant Ring",
        price: 99,
        category: "rings",
        image: "images/Ring1.jpg"
    },

    {
        id: 2,
        name: "Classic Necklace",
        price: 129,
        category: "necklaces",
        image: "images/Necklace1.jpg"
    },

    {
        id: 3,
        name: "Elegant Bracelet",
        price: 119,
        category: "bracelets",
        image: "images/Bracelet1.jpg"
    },

    {
        id: 4,
        name: "Classic Earrings",
        price: 89,
        category: "earrings",
        image: "images/Earrings1.jpg"
    }

];


/* =========================================
   CART
========================================= */


let cart = JSON.parse(localStorage.getItem("lumaCart")) || [];


/* DISPLAY PRODUCTS */

function displayProducts(list) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `

            <div class="product">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>

                <h3>${product.name}</h3>

                <p class="price">
                    AED ${product.price}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;

    });

}


/* FILTER PRODUCTS */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

    } else {

        const filtered =
            products.filter(
                product => product.category === category
            );

        displayProducts(filtered);

    }

}


/* ADD TO CART */

function addToCart(id) {

    const product =
        products.find(product => product.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    alert(product.name + " added to cart!");
}


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "lumaCart",
        JSON.stringify(cart)
    );

}


/* UPDATE CART */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById("cart-count")
        .textContent = count;


    const container =
        document.getElementById("cart-items");


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        AED ${item.price}
                    </p>

                    <div class="quantity-buttons">

                        <button
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        ${item.quantity}

                        <button
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                        <button
                            onclick="removeFromCart(${item.id})">
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById("cart-total")
        .textContent = total;

}


/* CHANGE QUANTITY */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCart();

}


/* REMOVE */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

}


/* OPEN CART */

function openCart() {

    document.getElementById(
        "cart-overlay"
    ).style.display = "block";

}


/* CLOSE CART */

function closeCart() {

    document.getElementById(
        "cart-overlay"
    ).style.display = "none";

}


/* OPEN CHECKOUT */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    closeCart();


    document.getElementById(
        "checkout-overlay"
    ).style.display = "block";

}


/* CLOSE CHECKOUT */

function closeCheckout() {

    document.getElementById(
        "checkout-overlay"
    ).style.display = "none";

}


/* CHECKOUT */

document
    .getElementById("checkout-form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customer-name"
                ).value;


            const phone =
                document.getElementById(
                    "customer-phone"
                ).value;


            const email =
                document.getElementById(
                    "customer-email"
                ).value;


            const address =
                document.getElementById(
                    "customer-address"
                ).value;


            const city =
                document.getElementById(
                    "customer-city"
                ).value;


            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            let orderText =
                "LUMA JEWELRY ORDER%0A%0A";


            orderText +=
                "Customer: " +
                encodeURIComponent(name) +
                "%0A";


            orderText +=
                "Phone: " +
                encodeURIComponent(phone) +
                "%0A";


            orderText +=
                "Email: " +
                encodeURIComponent(email) +
                "%0A";


            orderText +=
                "Address: " +
                encodeURIComponent(address) +
                "%0A";


            orderText +=
                "City: " +
                encodeURIComponent(city) +
                "%0A";


            orderText +=
                "Payment: " +
                encodeURIComponent(payment) +
                "%0A%0A";


            orderText += "ITEMS:%0A";


            cart.forEach(item => {

                orderText +=
                    encodeURIComponent(
                        item.name +
                        " x " +
                        item.quantity
                    ) +
                    "%0A";

            });


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            orderText +=
                "%0ATotal: AED " +
                total;


            /*
              REPLACE THE NUMBER BELOW
              WITH YOUR BUSINESS WHATSAPP NUMBER.

              Format:
              country code + number
              WITHOUT + or spaces.

              Example:
              971501234567
            */

            const whatsappNumber =
                "YOURWHATSAPPNUMBER";


            if (
                whatsappNumber ===
                "YOURWHATSAPPNUMBER"
            ) {

                alert(
                    "Please add your Luma Jewelry WhatsApp number in script.js."
                );

                return;

            }


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                orderText;


            window.open(
                whatsappURL,
                "_blank"
            );


            cart = [];

            saveCart();

            updateCart();

            closeCheckout();

        }
    );


/* START WEBSITE */

displayProducts(products);

updateCart();
