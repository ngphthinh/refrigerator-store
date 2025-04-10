document.addEventListener("DOMContentLoaded", function () {
  clearLocalStorage();
  displayAllProduct();
  setQuantityCarts();
  handleSortProduct();
  setupPromotionGuideTabs();
});

function setupPromotionGuideTabs() {
  const promotionSection = document.querySelector(".promotion");
  const guideSection = document.querySelector(".guide");
  const promotionBtn = document.querySelector("#pills-tab li:nth-child(1) a");
  const guideBtn = document.querySelector("#pills-tab li:nth-child(2) a");

  // Mặc định ban đầu: hiển thị promotion, ẩn guide
  guideSection.style.display = "none";
  promotionSection.style.display = "flex";

  // Xử lý sự kiện khi nhấn vào nút "Khuyến mãi"
  promotionBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Thêm/xoá class active cho các nút
    promotionBtn.classList.add("active");
    guideBtn.classList.remove("active");

    // Hiển thị/ẩn các phần tương ứng
    promotionSection.style.display = "flex";
    guideSection.style.display = "none";
  });

  // Xử lý sự kiện khi nhấn vào nút "Hướng dẫn"
  guideBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Thêm/xoá class active cho các nút
    promotionBtn.classList.remove("active");
    guideBtn.classList.add("active");

    // Hiển thị/ẩn các phần tương ứng
    promotionSection.style.display = "none";
    guideSection.style.display = "flex";
  });
}

function handleSortProduct() {
  const sortButton = document.getElementById("sort");
  const sortSelect = document.getElementById("select-sort");
  const productsContainer = document.querySelector(".products");

  sortButton.addEventListener("click", function () {
    const sortValue = sortSelect.value; // Lấy giá trị được chọn trong select
    const productCards = Array.from(productsContainer.children); // Lấy tất cả các card sản phẩm

    if (sortValue === "price-asc") {
      // Sắp xếp giá tăng dần
      productCards.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".fw-bold.text-danger")
            .textContent.replace(/[^\d]/g, "")
        );
        const priceB = parseFloat(
          b
            .querySelector(".fw-bold.text-danger")
            .textContent.replace(/[^\d]/g, "")
        );
        return priceA - priceB;
      });
    } else if (sortValue === "price-desc") {
      // Sắp xếp giá giảm dần
      productCards.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".fw-bold.text-danger")
            .textContent.replace(/[^\d]/g, "")
        );
        const priceB = parseFloat(
          b
            .querySelector(".fw-bold.text-danger")
            .textContent.replace(/[^\d]/g, "")
        );
        return priceB - priceA;
      });
    } else {
      // Mặc định: không sắp xếp
      return;
    }

    // Cập nhật thứ tự các sản phẩm trong DOM
    productCards.forEach((card) => productsContainer.appendChild(card));
  });
}

function displayAllProduct() {
  const cards = document.querySelectorAll(".products .card");
  const initialVisibleCount = 8; // Số lượng card hiển thị ban đầu
  let isExpanded = false;

  // Ẩn tất cả card trước
  cards.forEach((card) => {
    card.classList.add("hidden-card");
    card.classList.remove("visible-card");
  });

  // Hiển thị các card ban đầu
  cards.forEach((card, index) => {
    if (index < initialVisibleCount) {
      card.classList.add("visible-card");
      card.classList.remove("hidden-card");
    }
  });

  const showMoreLink = document.createElement("a");
  showMoreLink.innerHTML =
    "Xem thêm sản phẩm <i class='fa-solid fa-chevron-down'></i> ";
  showMoreLink.className = "btn d-block text-center border-0 text-danger";
  showMoreLink.href = "#";
  document.querySelector(".suggest").appendChild(showMoreLink);

  // Xử lý sự kiện khi nhấn vào "Xem thêm sản phẩm"
  showMoreLink.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
    if (!isExpanded) {
      // Hiển thị tất cả các card
      cards.forEach((card) => {
        card.classList.add("visible-card");
        card.classList.remove("hidden-card");
      });
      showMoreLink.innerHTML = "Thu gọn <i class='fa-solid fa-chevron-up'></i>"; // Đổi tên thành "Thu gọn"
      isExpanded = true;
    } else {
      // Ẩn bớt card, chỉ hiển thị initialVisibleCount card đầu tiên
      cards.forEach((card, index) => {
        if (index >= initialVisibleCount) {
          card.classList.add("hidden-card");
          card.classList.remove("visible-card"); // Sửa từ visible thành visible-card
        }
      });
      showMoreLink.innerHTML =
        "Xem thêm sản phẩm <i class='fa-solid fa-chevron-down'></i> ";
      isExpanded = false;
    }
  });
}

/**
 * Function clear local storage when user first time visit the page.
 */
function clearLocalStorage() {
  if (!localStorage.getItem("alreadyCleared")) {
    localStorage.clear();
    localStorage.setItem("alreadyCleared", "true");
  }
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
