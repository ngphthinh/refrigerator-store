document.addEventListener("DOMContentLoaded", function () {
  setupLoginEventHandlers();
setUpChatbot();

});

function setupLoginEventHandlers() {
  const phone = document.getElementById("phone-login");
  const password = document.getElementById("password-login");
  const toggleIcon = document.querySelector(".toggle-password i");

  const patternPhone = /^0[^14]\d{8}$/;
  const patternPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*=])(?=.*\d)(?!.*\s).{8,}$/;

  // Show/Hide Password Toggle
  document
    .querySelector(".toggle-password")
    .addEventListener("click", function () {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
    });

  // Real-time Validation
  phone.oninput = () =>
    isValid(
      phone,
      document.querySelector(".valid-phone-login"),
      patternPhone,
      "Số điện thoại không hợp lệ"
    );
  password.oninput = () =>
    isValid(
      password,
      document.querySelector(".valid-pass-login"),
      patternPass,
      "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
    );

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let isFormValid = true;

      if (
        !isValid(
          phone,
          document.querySelector(".valid-phone-login"),
          patternPhone,
          "Số điện thoại không hợp lệ"
        )
      )
        isFormValid = false;
      if (
        !isValid(
          password,
          document.querySelector(".valid-pass-login"),
          patternPass,
          "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
        )
      )
        isFormValid = false;

      if (isFormValid) {
        alert("🎉 Đăng nhập thành công!");
        // Thực hiện xử lý đăng nhập ở đây
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
}

function setUpChatbot() {
  const chatButton = document.getElementById("chatbot-button");
  const chatBox = document.getElementById("chatbot-box");
  const btnClose = document.getElementById("close-chat");

  chatButton.addEventListener("click", () => {
    chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
  });

  btnClose.addEventListener("click",function(){
    chatBox.style.display = "none";
    chatButton.style.display = "block";
  })

}
