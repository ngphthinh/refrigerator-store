document.addEventListener("DOMContentLoaded", function () {
  handlePayment();

  addToCart();

  setQuantityCarts();
});

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
 * Function to add product details to cart stored in localstorage
 */
function addToCart() {
  document
    .querySelector(".group-btn-purcharse button.btn-outline-danger")
    .addEventListener("click", function () {
      const productName = document.querySelector(".product-name h1");
      const productPrice = document.querySelector(".sale-price");
      const productImage = document.querySelector("#productImg").src;
      const quantity = 1;
      const valuePrice = parseFloat(
        productPrice.innerText.replace(/[^\d]/g, "")
      );

      const product = {
        name: productName.innerText,
        price: valuePrice,
        image: productImage,
        quantity: quantity,
      };

      const carts = JSON.parse(localStorage.getItem("carts")) || [];
      carts.push(product);
      localStorage.setItem("carts", JSON.stringify(carts));

      // Update the cart count in the header
      setQuantityCarts();
      alert("Thêm vào giỏ hàng thành công!");
    });
}

/**
 * Function get product details and store in local storage. Later, redirect to payment page.
 */
function handlePayment() {
  document
    .querySelector(".group-btn-purcharse button.btn-warning")
    .addEventListener("click", function () {
      const productName = document.querySelector(".product-name h1");
      const productPrice = document.querySelector(".sale-price");
      const productImage = document.querySelector("#productImg").src;

      const valuePrice = parseFloat(
        productPrice.innerText.replace(/[^\d]/g, "")
      );

      const product = {
        name: productName.innerText,
        price: valuePrice,
        image: productImage,
      };

      localStorage.setItem("product", JSON.stringify(product));
      window.location.href = "../html/payment.html";
    });
}
