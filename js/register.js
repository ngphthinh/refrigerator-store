document.addEventListener("DOMContentLoaded", function () {
  checkFormValid();
  initializeAddressSelection();
});

function checkFormValid() {
  const patternPhone = /^0[^14]\d{8}$/;
  const patternPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*=])(?=.*\d)(?!.*\s).{8,}$/;
  const patternName = /^([A-ZÀ-Ỹ][a-zà-ỹ]+)(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/;
  const patternEmail =
    /^(?!.*\\.\\.)[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@([a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$/i;

  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const dob = document.getElementById("birthdate");
  const terms = document.getElementById("terms");
  const address = document.getElementById("address");

  // Field bắt buộc
  phone.oninput = () =>
    isValid(
      phone,
      document.querySelector(".valid-phone"),
      patternPhone,
      "Số điện thoại không hợp lệ"
    );
  password.oninput = () =>
    isValid(
      password,
      document.querySelector(".valid-pass"),
      patternPass,
      "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
    );
  fullname.oninput = () =>
    isValid(
      fullname,
      document.querySelector(".valid-name"),
      patternName,
      "Tên phải có ít nhất 2 từ, viết hoa chữ cái đầu"
    );

  // Kiểm tra xác nhận mật khẩu khi gõ
  confirmPassword.oninput = () =>
    isPasswordMatch(
      password,
      confirmPassword,
      document.querySelector(".valid-repass")
    );

  // Field không bắt buộc
  email.oninput = () =>
    isValidOptional(
      email,
      document.querySelector(".valid-email"),
      patternEmail,
      "Email không hợp lệ"
    );

  // Submit
  document
    .getElementById("register-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let isFormValid = true;

      if (
        !isValid(
          phone,
          document.querySelector(".valid-phone"),
          patternPhone,
          "Số điện thoại không hợp lệ"
        )
      )
        isFormValid = false;
      if (
        !isValid(
          password,
          document.querySelector(".valid-pass"),
          patternPass,
          "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
        )
      )
        isFormValid = false;
      if (
        !isValid(
          fullname,
          document.querySelector(".valid-name"),
          patternName,
          "Tên phải có ít nhất 2 từ, viết hoa chữ cái đầu"
        )
      )
        isFormValid = false;
      // Xác nhận mật khẩu
      if (
        !isPasswordMatch(
          password,
          confirmPassword,
          document.querySelector(".valid-repass")
        )
      )
        isFormValid = false;

      // Field không bắt buộc
      if (
        !isValidOptional(
          email,
          document.querySelector(".valid-email"),
          patternEmail,
          "Email không hợp lệ"
        )
      )
        isFormValid = false;
      if (!isValidBirthDate(dob, document.querySelector(".valid-dob")))
        isFormValid = false;

      if (!isTerms(terms, document.querySelector(".valid-terms")))
        isFormValid = false;

      if (isFormValid) {
        alert("🎉 Đăng ký thành công!");
        window.history.back();
      }
    });

  function isValid(elem, valid, pattern, message) {
    const value = elem.value.trim();
    if (value === "") {
      valid.innerHTML = "Không được để trống trường này";
      return false;
    }
    if (!pattern.test(value)) {
      valid.innerHTML = message;
      return false;
    }
    valid.innerHTML = "";
    return true;
  }

  function isValidOptional(elem, valid, pattern, message) {
    const value = elem.value.trim();
    if (value !== "" && !pattern.test(value)) {
      valid.innerHTML = message;
      return false;
    }
    valid.innerHTML = "";
    return true;
  }

  function isPasswordMatch(passwordElem, confirmElem, valid) {
    const confirmVal = confirmElem.value.trim();
    if (confirmVal === "") {
      valid.innerHTML = "Không được để trống trường này";
      return false;
    }
    if (passwordElem.value !== confirmElem.value) {
      valid.innerHTML = "Mật khẩu không khớp";
      return false;
    }
    valid.innerHTML = "";
    return true;
  }

  function isValidBirthDate(dob, valid) {
    const value = dob.value;

    if (value === "") {
      valid.innerHTML = "";
      return true;
    }

    const yearOfBirth = new Date(value).getFullYear();
    const currentYear = new Date().getFullYear();

    if (currentYear <= yearOfBirth) {
      valid.innerHTML = "Ngày sinh không hợp lệ";
      return false;
    }

    valid.innerHTML = "";
    return true;
  }

  function isTerms(elemTerms, valid) {
    if (!elemTerms.checked) {
      valid.innerHTML = "Bạn phải chấp nhận điều khoản sử dụng";
      elemTerms.focus();
      return false;
    }
    valid.innerHTML = "";
    return true;
  }
}

function initializeAddressSelection() {
  const provinceSelect = document.getElementById("province");
  const districtSelect = document.getElementById("district");
  const wardSelect = document.getElementById("ward");
  const customAddressInput = document.getElementById("customAddress");
  const addressInput = document.getElementById("address");

  // Dummy data - bạn có thể thay bằng dữ liệu thật hoặc fetch từ API
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

  // Khi chọn tỉnh/thành phố
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

  // Khi chọn quận/huyện
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

  // Xác nhận địa chỉ và đổ vào input readonly
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
}

function togglePassword(fieldId, iconSpan) {
  const input = document.getElementById(fieldId);
  const icon = iconSpan.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}
