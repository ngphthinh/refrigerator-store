document.addEventListener("DOMContentLoaded", function () {
  setQuantityCarts(); // Set the initial cart quantity on page load

  loadProducts(); // Load products when the page is loaded

  loadTotalPrice(getCarts());
});

function loadTotalPrice(carts) {
  const totalPrice = document.getElementById("total-price");
  const totalPriceEnd = document.getElementById("total-price-end");
  let total = 0;
  carts.forEach((product) => {
    total += product.price * product.quantity;
  });
  totalPrice.innerText = total.toLocaleString("vi-VN") + "đ";
  totalPriceEnd.innerText = total.toLocaleString("vi-VN") + "đ";
}

/**
 * Function set quantity of carts in header.
 */
function setQuantityCarts() {
  const carts = JSON.parse(localStorage.getItem("carts")) || [];
  const cartCount = document.querySelector(".product-quantity");

  // when there are no carts, hide the cart count
  if (carts.length === 0) {
    cartCount.style.display = "none";
    return;
  }

  // show the cart count
  cartCount.style.display = "block";
  cartCount.innerText = carts.length;
}

/**
 *  Function to load products from localStorage and display them in the cart.
 */
function loadProducts() {
  const carts = getCarts(); // get carts from localStorage
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = ""; // reset the container

  // Create title
  const title = document.createElement("h4");
  title.className = "text-center fs-3 fw-bold my-5";
  title.textContent = "Sản phẩm trong giỏ hàng";
  productsContainer.appendChild(title);

  // Check if there are no products in the cart
  if (carts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "text-center text-muted";
    emptyMessage.textContent = "Giỏ hàng của bạn đang trống.";
    productsContainer.appendChild(emptyMessage);
    return;
  }

  carts.forEach((element, index) => {
    const { name, price, image, quantity } = element;

    // product card
    const productCard = document.createElement("div");
    productCard.className =
      "product d-flex align-items-start mb-3 p-3 border rounded shadow-sm";

    // create product img
    const img = document.createElement("img");
    img.src = image || "../img/pd21.jpg"; // fallback nếu không có ảnh
    img.alt = name;
    img.className = "me-3";
    img.style.width = "120px";
    img.style.objectFit = "cover";

    const contentDiv = document.createElement("div");
    contentDiv.className = "flex-grow-1";

    // create product name
    const nameP = document.createElement("p");
    nameP.className = "product-name fs-5 fw-semibold mb-2";
    const nameLink = document.createElement("a");
    nameLink.href = "#";
    nameLink.textContent = name;
    nameP.appendChild(nameLink);

    const bottomDiv = document.createElement("div");
    bottomDiv.className = "d-flex justify-content-between align-items-center";

    const quantityDiv = document.createElement("div");
    quantityDiv.className = "d-flex align-items-center";

    // create quantity label and input
    const quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", `quantity-${index}`);
    quantityLabel.className = "me-2 mb-0";
    quantityLabel.textContent = "Số lượng:";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.id = `quantity-${index}`;
    quantityInput.className = "form-control";
    quantityInput.value = quantity;
    quantityInput.min = 1;
    quantityInput.style.width = "80px";

    quantityInput.addEventListener("input", () => {
      const qty = parseInt(quantityInput.value) || 1;
      const total = price * qty;
      priceP.textContent = total.toLocaleString("vi-VN") + "đ";

      // Update the quantity in the carts array
      carts[index].quantity = qty;

      localStorage.setItem("carts", JSON.stringify(carts));

      loadTotalPrice(carts); // Update the total price in the order details
    });

    quantityDiv.appendChild(quantityLabel);
    quantityDiv.appendChild(quantityInput);

    const priceP = document.createElement("p");
    priceP.className =
      "product-price text-danger fw-bold mb-0 text-decoration-underline";
    priceP.textContent = price.toLocaleString("vi-VN") + "đ";

    bottomDiv.appendChild(quantityDiv);
    bottomDiv.appendChild(priceP);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.className = "btn btn-link text-danger p-0 ms-2";
    deleteButton.addEventListener("click", () => {
      handleproductDelete(index); // Call the delete function
      alert("Đã xóa sản phẩm khỏi giỏ hàng.");
    });

    const purcharseButton = document.createElement("button");
    purcharseButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
    purcharseButton.className = "btn btn-link text-danger p-0";
    purcharseButton.style.marginLeft = "33em";
    purcharseButton.addEventListener("click", () => {
      const product = {
        name: name,
        price: price,
        image: image,
        quantity: quantityInput.value,
      };
      localStorage.setItem("product", JSON.stringify(product));
      window.location.href = "../html/payment.html"; // Redirect to product page
    });

    contentDiv.appendChild(nameP);
    contentDiv.appendChild(bottomDiv);
    contentDiv.appendChild(deleteButton);
    contentDiv.appendChild(purcharseButton);

    productCard.appendChild(img);
    productCard.appendChild(contentDiv);

    productsContainer.appendChild(productCard);
  });
}

function handleproductDelete(index) {
  const carts = getCarts();
  // Remove the product from the carts array
  carts.splice(index, 1);

  localStorage.setItem("carts", JSON.stringify(carts));
  setQuantityCarts();
  loadTotalPrice(carts);
  loadProducts();
}

/**
 * Function to load products from localStorage and display them in the cart.
 */
function getCarts() {
  const productsRaw = localStorage.getItem("carts");

  const products = JSON.parse(productsRaw) || [];

  const carts = [];

  products.forEach((product) => {
    const existing = carts.find((p) => p.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      carts.push({ ...product, quantity: 1 });
    }
  });

  return carts;
}
