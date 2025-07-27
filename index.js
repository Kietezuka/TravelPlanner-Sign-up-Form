const passwordInput = document.getElementById("password");
const passwordPatternDiv = document.getElementById("password-pattern");
const viewBtn = document.getElementById("view-btn");

const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const signUpFormData = new FormData(signUpForm);
  //When you want to get data(first name) from the formData object
  const firstName = signUpFormData.get("firstName");
  console.log("First Name: ", firstName);
  signUpForm.reset();
});

const checkElements = {
  length: document.querySelector("#check-length span"),
  upperCase: document.querySelector("#check-uppercase span"),
  lowerCase: document.querySelector("#check-lowercase span"),
  number: document.querySelector("#check-number span"),
  special: document.querySelector("#check-special span"),
};

function updatedInput() {
  const value = passwordInput.value.trim();
  const vLength = value.length;
  return { value, vLength };
}

let isVisible = false;

viewBtn.addEventListener("click", () => {
  const { vLength } = updatedInput();
  if (vLength > 0) {
    //change password toggle state
    viewBtn.disabled = false;
    isVisible = !isVisible;
    console.log("clicked");
    if (isVisible) {
      viewBtn.innerHTML = `<img src="./images/view.png" alt="Show password" />`;
      passwordInput.type = "text";
    } else {
      viewBtn.innerHTML = `<img src="./images/hide.png" alt="Hide password" />`;
      passwordInput.type = "password";
    }
  }
});

//check the patterns
passwordInput.addEventListener("input", function () {
  const { value, vLength } = updatedInput();

  if (vLength <= 0) {
    viewBtn.innerHTML = `<img src="./images/hide.png" alt="Hide password" />`;
    passwordInput.type = "password";
  }
  //check length
  if (vLength >= 8 && vLength <= 15) {
    checkElements.length.innerText = "✅";
  } else {
    checkElements.length.innerText = "";
  }

  //check contain patterns in the input value
  function checkChar(pattern) {
    return pattern.test(value);
  }

  //check upperCase
  if (checkChar(/[A-Z]/)) {
    checkElements.upperCase.innerText = "✅";
  } else {
    checkElements.upperCase.innerText = "";
  }

  //check lowerCase
  if (checkChar(/[a-z]/)) {
    checkElements.lowerCase.innerText = "✅";
  } else {
    checkElements.lowerCase.innerText = "";
  }

  //check Number
  if (checkChar(/[0-9]/)) {
    checkElements.number.innerText = "✅";
  } else {
    checkElements.number.innerText = "";
  }

  //check Special Char
  if (checkChar(/[?!@#$%^&*]/)) {
    checkElements.special.innerText = "✅";
  } else {
    checkElements.special.innerText = "";
  }
});
