const menuData = [
  {
    id: "americano",
    name: "Americano",
    price: 80,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "latte",
    name: "Latte",
    price: 100,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 120,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    price: 120,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    price: 120,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "mocha",
    name: "Mocha",
    price: 120,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "white-mocha",
    name: "White Mocha",
    price: 120,
    image: "./Images/image (1).png",
    type: "Espresso",
  },
  {
    id: "espresso-shot",
    name: "Espresso Shot",
    price: 30,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "vanilla-syrup",
    name: "Vanilla Syrup",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "caramel-syrup",
    name: "Caramel Syrup",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "hazelnut-syrup",
    name: "Hazelnut Syrup",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "caramel-sauce",
    name: "Caramel Sauce",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "white-chocolate-sauce",
    name: "White Chocolate Sauce",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },
  {
    id: "chocolate-sauce",
    name: "Chocolate Sauce",
    price: 20,
    image: "./Images/image (1).png",
    type: "Add On",
  },

  // Non-Coffee section
  {
    id: "strawberry-milk",
    name: "Strawberry Milk",
    price: 90,
    image: "./Images/image (1).png",
    type: "Non-Coffee",
  },
  {
    id: "chocolate-milk",
    name: "Chocolate Milk",
    price: 80,
    image: "./Images/image (1).png",
    type: "Non-Coffee",
  },
  {
    id: "matcha-milk",
    name: "Matcha Milk",
    price: 120,
    image: "./Images/image (1).png",
    type: "Non-Coffee",
  },
  {
    id: "matcha-milk",
    name: "Matcha Milk",
    price: 120,
    image: "./Images/image (1).png",
    type: "Non-Coffee",
  },

  // Fruit Tea section
  {
    id: "passion-fruit",
    name: "Passion Fruit",
    price: 80,
    image: "./Images/image (1).png",
    type: "Fruit Tea",
  },
  {
    id: "lychee",
    name: "Lychee",
    price: 80,
    image: "./Images/image (1).png",
    type: "Fruit Tea",
  },
  {
    id: "green-apple",
    name: "Green Apple",
    price: 80,
    image: "./Images/image (1).png",
    type: "Fruit Tea",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    price: 80,
    image: "./Images/image (1).png",
    type: "Fruit Tea",
  },

  // Others section
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 120,
    image: "./Images/image (1).png",
    type: "Others",
  },
  {
    id: "letter-set",
    name: "Letter Set",
    price: 299,
    image: "./Images/image (1).png",
    type: "Others",
  },
];

const categories = [...new Set(menuData.map((item) => item.type))];

const renderMenu = (containerId = ".menu-grid", data) => {
  data.map((product, index) => {
    const container = document.createElement("div");
    container.className = "menu-item";
    container.setAttribute("data-aos", "fade-up");
    container.setAttribute("data-aos-delay", `${index * 100}`);

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    container.appendChild(img);

    const itemContent = document.createElement("div");
    itemContent.className = "item-content";
    container.appendChild(itemContent);

    const itemTitle = document.createElement("h3");
    itemTitle.className = "item-title";
    itemTitle.textContent = product.name;
    itemContent.appendChild(itemTitle);

    const span = document.createElement("span");
    span.className = `type`;
    span.textContent = product.type;
    itemContent.appendChild(span);

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `P${product.price.toFixed(2)}`;
    itemContent.appendChild(price);

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add";
    addButton.onclick = () =>
      addToCart(product.id, product.name, product.price);
    itemContent.appendChild(addButton);

    document.getElementById(containerId).appendChild(container);
  });
};

const espressoProducts = menuData.filter((item) => item.type === "Espresso");
renderMenu("espresso-section", espressoProducts);

const nonCoffeeProducts = menuData.filter((item) => item.type === "Non-Coffee");
renderMenu("non-coffee-section", nonCoffeeProducts);

const fruitTeaProducts = menuData.filter((item) => item.type === "Fruit Tea");
renderMenu("fruit-tea-section", fruitTeaProducts);

const addOnProducts = menuData.filter((item) => item.type === "Add On");
renderMenu("add-on-section", addOnProducts);

const othersProducts = menuData.filter((item) => item.type === "Others");
renderMenu("others-section", othersProducts);

let cart = {};
let currentTip = 0;

function addToCart(id, name, price) {
  if (!cart[id]) {
    cart[id] = {
      name: name,
      price: price,
      quantity: 0,
    };
  }
  cart[id].quantity++;
  updateCartDisplay();
}

function removeFromCart(id) {
  if (cart[id] && cart[id].quantity > 0) {
    cart[id].quantity--;
    if (cart[id].quantity === 0) {
      delete cart[id];
    }
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";
  let subtotal = 0;

  for (const [id, item] of Object.entries(cart)) {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <div>
                    <div>${item.quantity}x ${item.name}</div>
                    <div>₱${itemTotal.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-button" onclick="removeFromCart('${id}')">−</button>
                    <button class="quantity-button" onclick="addToCart('${id}', '${
      item.name
    }', ${item.price})">+</button>
                </div>
            </div>
        `;
  }

  const tipAmount = subtotal * (currentTip / 100);
  const total = subtotal + tipAmount;
  document.getElementById("totalAmount").textContent = `₱${total.toFixed(2)}`;
}


// Add active class to the current nav link based on scroll position
const sections = document.querySelectorAll("section");
const categoryLinks = document.querySelectorAll(".categories-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop + 700;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  categoryLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// CHECKOUT
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", () => {
  if (Object.entries(cart)?.length === 0) {
    return swal("Cart is empty!", "Please add items to your cart.", "error");
  }
  swal("Order Success!", "Thank you for your purchase!", "success");
  cart = {};
  updateCartDisplay();
});
