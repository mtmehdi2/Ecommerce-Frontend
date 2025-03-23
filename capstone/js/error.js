let myErr = false;
const showError = (data) => {
  if (!myErr) {
    const ctnr = _("#product-container");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    h1.textContent = "Oops!";
    p.textContent = data;
    ctnr.setAttribute("id", "error-container");
    ctnr.appendChild(h1);
    ctnr.appendChild(p);
    myErr = true;
  }
};

const handleErrors = (response) => {
  if (!response.ok) {
    switch (response.status) {
      case 404:
        showError("404 - Resource not found.");
      case 500:
        showError("500 - Server error.");
      case 403:
        showError("403 - Access forbidden.");
      default:
        showError(`${response.status} - Unexpected error.`);
    }
  }
  return response.json();
};
