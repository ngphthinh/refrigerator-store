/**
 * Handle back button click event
 * @returns {void}
 * @description This function handles the click event of the back button. When clicked, it navigates the user back to the previous page in the browser history.
 * @event click #back-button - Navigates back to the previous page in the browser history.
 */
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", function () {
    window.history.back();
  });
});

/**
 * Display product information on the payment page
 * @returns {void}
 * @description This function retrieves product information from localStorage and displays it on the payment page.
 * It updates the product image, name, price, and total price based on the selected quantity.
 */
document.addEventListener("DOMContentLoaded", function () {
  //get product from localStorage
  const product = JSON.parse(localStorage.getItem("product"));
  const productImg = document.getElementById("productImg");

  productImg.src = product.image;

  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");

  productName.textContent = product.name;
  productPrice.textContent = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const quantityInput = document.getElementById("quantity");
  const totalPriceElement = document.querySelector(".total-price");
  const totalPriceEndElement = document.querySelector(".total-price-end");

  totalPriceElement.textContent = `Tổng tiền: ${product.price.toLocaleString(
    "vi-VN",
    { style: "currency", currency: "VND" }
  )}`;
  totalPriceEndElement.textContent = `Tổng tiền: ${product.price.toLocaleString(
    "vi-VN",
    { style: "currency", currency: "VND" }
  )}`;

  quantityInput.addEventListener("input", function () {
    const totalPrice = product.price * quantityInput.value;
    totalPriceElement.textContent = `Tổng tiền: ${totalPrice.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    )}`;
    totalPriceEndElement.textContent = `Tổng tiền: ${totalPrice.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    )}`;
  });
});

/**
 * Handle shipping method selection
 * @returns {void}
 * @description This function handles the selection of shipping methods. When a shipping method is clicked, it adds the 'shipping-active' class to the selected method and removes it from others.
 * It also adds the 'shipping-hover' class to all methods except the selected one.
 * @event click .shipping-method > div - Adds 'shipping-active' class to the clicked method and removes it from others.
 * @event click .shipping-method > div - Adds 'shipping-hover' class to all methods except the clicked one.
 */
document.addEventListener("DOMContentLoaded", function () {
  const shippingMethods = document.querySelectorAll(".shipping-method > div");
  shippingMethods.forEach(function (method) {
    method.addEventListener("click", function () {
      shippingMethods.forEach(function (m) {
        m.classList.remove("shipping-active");
        m.classList.add("shipping-hover");
      });
      this.classList.add("shipping-active");
      this.classList.remove("shipping-hover");
    });
  });
});

/**
 * Apply voucher code and calculate total price
 * @returns {void}
 * @description This function applies a voucher code and calculates the total price based on the product price and quantity.
 * It updates the total price displayed on the page.
 * @event click #apply-voucher - Applies the voucher code when the button is clicked.
 * @event input #quantity - Updates the total price when the quantity input changes.
 *
 * Voucher : IUH - 20% discount, KTPM - 10% discount
 */
document.addEventListener("DOMContentLoaded", function () {
  const applyVoucherButton = document.getElementById("apply-voucher");
  const voucherInput = document.getElementById("voucher");
  const totalPriceEndElement = document.querySelector(".total-price-end");
  const quantityInput = document.getElementById("quantity");
  const product = JSON.parse(localStorage.getItem("product"));
  let discount = 0;

  const warningVoucher = document.querySelector(".warning-voucher");

  applyVoucherButton.addEventListener("click", function () {
    const voucherCode = voucherInput.value.trim();
    if (voucherCode === "KTPM") {
      discount = 0.1; // 10% discount
      warningVoucher.textContent = "Mã giảm giá đã được áp dụng!";
    } else if (voucherCode === "IUH") {
      discount = 0.2; // 20% discount
      warningVoucher.textContent = "Mã giảm giá đã được áp dụng!";
    } else {
      discount = 0;
      warningVoucher.textContent = "Mã giảm giá không hợp lệ!";
    }

    const quantity = parseInt(quantityInput.value, 10) || 1;
    const totalPrice = product.price * quantity * (1 - discount);
    totalPriceEndElement.textContent = `Tổng tiền: ${totalPrice.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    )}`;
  });
});

/**
 * Handle payment button click event
 * @returns {void}
 * @description This function handles the click event of the payment button. It validates the input fields and displays an alert if the information is valid.
 * @event click #payment-button - Validates the input fields and displays an alert if the information is valid.
 *
 *
 */
document.addEventListener("DOMContentLoaded", function () {
  const paymentButton = document.getElementById("payment-button");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const paymentSelect = document.getElementById("payment");

  paymentButton.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const paymentMethod = paymentSelect.value;

    const patterName = /^[A-Z][a-zà-ỹ]*(\s[A-Z][a-zà-ỹ]*)+$/;

    const patterPhone = /^0[2|3|5|7|8|9]\d{8}$/;

    let isValid = true;

    if (name === "") {
      document.querySelector(".valid-name").textContent =
        "Vui lòng nhập họ tên!";
      nameInput.focus();
      isValid = false;
    } else if (!patterName.test(name)) {
      document.querySelector(".valid-name").textContent =
        "Họ tên không hợp lệ!";
      nameInput.focus();
      isValid = false;
    } else if (phone === "") {
      document.querySelector(".valid-phone").textContent =
        "Vui lòng nhập số điện thoại!";
      phoneInput.focus();
      isValid = false;
    } else if (!patterPhone.test(phone)) {
      document.querySelector(".valid-phone").textContent =
        "Số điện thoại không hợp lệ!";
      phoneInput.focus();
      isValid = false;
    } else if (address === "") {
      document.querySelector(".valid-address").textContent =
        "Vui lòng nhập địa chỉ!";
      addressInput.focus();
      isValid = false;
    } else {
      document.querySelector(".valid-name").textContent = "";
      document.querySelector(".valid-phone").textContent = "";
      document.querySelector(".valid-address").textContent = "";
    }

    if (isValid) {
      alert("Đặt hàng thành công!");
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  });
});

/**
 * Handle address confirmation
 * @returns {void}
 * @description This function handles the confirmation of the selected address. It retrieves the selected address from the modal and updates the address input field on the payment page.
 * @event click .btn-confirm-address - Updates the address input field with the selected address when clicked.
 */
document.addEventListener("DOMContentLoaded", function () {
  const provinceSelect = document.getElementById("province");
  const districtSelect = document.getElementById("district");
  const wardSelect = document.getElementById("ward");
  const customAddressInput = document.getElementById("customAddress");
  const addressInput = document.getElementById("address");

  const locationData = {
    "Hồ Chí Minh": {
      "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành"],
      "Quận 2": ["Phường Thảo Điền", "Phường An Phú"],
    },
    "Hà Nội": {
      "Quận Ba Đình": ["Phường Ngọc Hà", "Phường Điện Biên"],
      "Quận Hoàn Kiếm": ["Phường Hàng Bạc", "Phường Hàng Buồm"],
    },
  };

  // when select province
  provinceSelect.addEventListener("change", function () {
    const selectedProvince = this.value;
    districtSelect.innerHTML = `<option selected disabled></option>`;
    wardSelect.innerHTML = `<option selected disabled></option>`;

    if (selectedProvince && locationData[selectedProvince]) {
      Object.keys(locationData[selectedProvince]).forEach((district) => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      });
    }
  });

  // when select district
  districtSelect.addEventListener("change", function () {
    const selectedProvince = provinceSelect.value;
    const selectedDistrict = this.value;
    wardSelect.innerHTML = `<option selected disabled></option>`;

    if (
      selectedProvince &&
      selectedDistrict &&
      locationData[selectedProvince][selectedDistrict]
    ) {
      locationData[selectedProvince][selectedDistrict].forEach((ward) => {
        const option = document.createElement("option");
        option.value = ward;
        option.textContent = ward;
        wardSelect.appendChild(option);
      });
    }
  });

  // when select ward
  window.confirmAddress = function () {
    const province = provinceSelect.value;
    const district = districtSelect.value;
    const ward = wardSelect.value;
    const custom = customAddressInput.value.trim();

    const fullAddress = [custom, ward, district, province]
      .filter((part) => part && part !== "")
      .join(", ");

    addressInput.value = fullAddress;
  };
});
