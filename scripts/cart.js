let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const priceList = {
  "Espresso": 3.50,
  "Mocha": 4.50,
  "Americano": 3.00,
  "Cappuccino": 4.25,
  "Latte": 4.00,
  "Macchiato": 4.75,
  "Coffee Grinder": 35.00,
  "Drip Coffee Maker": 50.00,
  "Capsule Machine": 80.00,
  "Moka Pot": 25.00,
  "Espresso Machine": 120.00,
  "Coffee Blender": 45.00,
  "Cold Brew Toddy": 30.00,
  "Pour Over Equipment": 40.00
};


const deleteMsg = [];
let timeOutId;

const cartContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const checkoutBtn = document.querySelector(".checkout-btn");

function renderCart() {
  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p class='text-dark text-center mt-3'>Your cart is empty ☕</p>";
    subtotalEl.textContent = "$0.00";
    shippingEl.textContent = "$0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    const price = priceList[item.name] || 5.00;
    item.price = price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div class="cart-item-info">
        <input type="checkbox" class="cart-checkbox" data-index="${index}" onchange="calculateTotal()" />
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h5>${item.name}</h5>
          <p>$${price.toFixed(2)}</p>
        </div>
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </div>

      <div class="removeItem-btn" data-name="${item.name}" onclick="removeItem(${index}, '${item.name}')">✖</div>

    `
    ;
    cartContainer.appendChild(div);
  });

  calculateTotal();
}


const removeItem = (index, name) => {
    cartItems.splice(index, 1);
    deleteMsg.push(`Removed ${name}`);
    console.log(deleteMsg);
    renderDeleteMessages();
    saveData();
    renderCart();

}

const saveData = () => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

const renderDeleteMessages = () => {
  const deleteMsgsContainer = document.querySelector(".delete-msgs-container");
  deleteMsgsContainer.innerHTML = "";
  deleteMsg.forEach(msg => {
    const p = document.createElement("p");
    p.classList.add("delete-msg");
    p.textContent = msg;
    deleteMsgsContainer.appendChild(p);
  })
  clearTimeout(timeOutId);
  removeDelMsgs();
}


const removeDelMsgs = () => {
  timeOutId = setTimeout(() => {
    deleteMsg.shift();
    renderDeleteMessages();
  }, 800)
    
}


function updateQuantity(index, change) {
  
  cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
  saveData();
  renderCart(); 
}






function calculateTotal() {
  const checkboxes = document.querySelectorAll(".cart-checkbox");
  let subtotal = 0;

  checkboxes.forEach(cb => {
    const index = cb.dataset.index;
    if (cb.checked) {
      subtotal += cartItems[index].price * cartItems[index].quantity;
    }
  });

  const shippingFee = subtotal > 0 ? 4.99 : 0;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = `$${shippingFee.toFixed(2)}`;
}

checkoutBtn.addEventListener("click", () => {
  const total = parseFloat(subtotalEl.textContent.replace("$", "")) +
                parseFloat(shippingEl.textContent.replace("$", ""));
  if (total === 0) {
    alert("Please select at least one item to checkout ☕");
    return;
  }
  alert(`✅ Done checking out! Your total is $${total.toFixed(2)}.`);
  localStorage.removeItem("cart"); 
  location.reload();
});

renderCart();
