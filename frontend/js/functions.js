const updatePrice = (ind, price) => {
  let myPrice = price.split(".");
  let txt = "$" + myPrice[0] + "<sup>" + myPrice[1] + "</sup>";
  _("#prod" + ind + "_price").innerHTML = txt;
};

const addToCart = (ind) => {
  let storedVal = localStorage.getItem("myShoppingCart");
  let myCart = [];
  if (storedVal != null) {
    myCart = JSON.parse(storedVal);
  }

  let myProd = {};

  myProd.productID = ind;
  myProd.quantity = 1;
  let theProd = products.find((obj) => obj.id == ind);

  myProd.price = _("#prod" + ind + "_size").value;
  const findSizeByPrice = (targetPrice) => {
    for (const [size, details] of Object.entries(theProd.sizes)) {
      if (details.price == targetPrice) {
        return size;
      }
    }
    return null;
  };
  myProd.size = findSizeByPrice(myProd.price);
  myCart.push(myProd);

  let myStr = JSON.stringify(myCart);
  localStorage.setItem("myShoppingCart", myStr);

  showAlert(theProd.name, theProd.image, myProd.price, getTotal());
};

const showAlert = (pname, pimg, pprice, ptotal) => {
  _("#alert_prod_img").src = "images/" + pimg;
  _("#alert_prod_img").alt = pname;
  _("#alert_prod_name").innerHTML = pname;
  _("#alert_prod_price").innerHTML = pprice;
  _("#alert_prod_price_total").innerHTML = ptotal;
  _(".alert-msg")[0].style.display = "block";
};

const displayProducts = () => {
  let dispBlock = "";
  let myProducts = products.map((item) => {
    let prod = "<div class='products'>";
    prod += "<h2>" + item.name + "</h2>";
    prod +=
      "<div><a href='product.html' onclick='displayCurrentProduct(" +
      item.id +
      ");return false;'><img class='prod-img' src='images/";
    prod +=
      item.image +
      "' alt='" +
      item.name +
      "' width='200' height='120'></a></div>";
    prod += "<div class='desc-title'>Description</div>";
    prod += "<p>" + item.description + "</p>";
    prod += "<div class='price'id='prod" + item.id + "_price'>$";
    let prc = item.sizes.s.price.toString();
    let prc2 = prc.split(".");
    prod += prc2[0] + "<sup>" + prc2[1] + "</sup></div>";
    prod += "<div><form method='post'>";
    prod +=
      "<button class='add-to-cart-button' type='button' onclick='addToCart(" +
      item.id +
      ")'>Add to Cart</button>";
    prod += "</form></div>";
    prod +=
      "<div class='prod-features'><div class='available-sizes'>Available Sizes</div>";
    prod +=
      "<select name='prod_size' id='prod" +
      item.id +
      "_size' onchange='updatePrice(" +
      item.id +
      ",this.value)'>";
    prod += "<option value='" + item.sizes.s.price + "'";
    prod += item.sizes.s.available ? "" : " disabled";
    prod += ">Small | ";
    prod += item.sizes.s.available ? "Available" : "(Out of Stock)";
    prod += item.sizes.s.available ? " (" + item.sizes.s.price + ")" : "";
    prod += "</option>";
    prod += "<option value='" + item.sizes.m.price + "'";
    prod += item.sizes.m.available ? "" : " disabled";
    prod += ">Medium | ";
    prod += item.sizes.m.available ? "Available" : "(Out of Stock)";
    prod += item.sizes.m.available ? " (" + item.sizes.m.price + ")" : "";
    prod += "</option>";
    prod += "<option value='" + item.sizes.l.price + "'";
    prod += item.sizes.l.available ? "" : " disabled";
    prod += ">Large | ";
    prod += item.sizes.l.available ? "Available" : "(Out of Stock)";
    prod += item.sizes.l.available ? " (" + item.sizes.l.price + ")" : "";
    prod += "</option>";
    prod += "<option value='" + item.sizes.xl.price + "'";
    prod += item.sizes.xl.available ? "" : " disabled";
    prod += ">Extra Large | ";
    prod += item.sizes.xl.available ? "Available" : "(Out of Stock)";
    prod += item.sizes.xl.available ? " (" + item.sizes.xl.price + ")" : "";
    prod += "</option>";

    prod += "</select></div>";

    prod += "</div>";
    return prod;
  });

  myProducts.forEach((element) => {
    dispBlock += element;
  });

  _("#products_list").innerHTML = dispBlock;
};

const displayCurrentProduct = (currProdId) => {
  localStorage.setItem("myCurrProd", currProdId);
  location.href = "product.html";
};

const showCurrentProductDetails = () => {
  const currProductId = Number(localStorage.getItem("myCurrProd"));
  if (currProductId == 0) {
    _("#product_details").innerHTML = `<h1>Oops!</h1>
    <p>No product was found to display. Please click on any product in the products page to see the details.</p>
    <p><a href="products.html">Click here to go back to products page.</p>`;
  } else {
    const currentProduct = products.find((item) => item.id === currProductId);
    let displayBlock = "<h1>" + currentProduct.name + "</h1>";
    displayBlock += "<div class='container'>";
    displayBlock +=
      "<div class='img'><img src='images/" +
      currentProduct.image +
      "' alt='" +
      currentProduct.name +
      "' height='400' width='400'></div>";
    displayBlock += "<div class='description'>";
    displayBlock += "<h2>Description</h2>";
    displayBlock += "<p>" + currentProduct.description + "</p>";
    displayBlock +=
      "<div class='price'id='prod" + currentProduct.id + "_price'>$";
    let prc = currentProduct.sizes.s.price.toString();
    let prc2 = prc.split(".");
    displayBlock += prc2[0] + "<sup>" + prc2[1] + "</sup></div>";

    displayBlock += "<form class='frm-add-to-cart' method='post'>";
    displayBlock +=
      "<button class='add-to-cart-button' type='button' onclick='addToCart(" +
      currentProduct.id +
      ")'>Add to Cart</button> ";
    displayBlock +=
      "<a href='shopping_cart.html' class='add-to-cart-button'>Checkout</a>";
    displayBlock += "</form>";
    displayBlock += "<div class='sizes'><h3>Available Sizes</h3>";
    displayBlock +=
      "<select name='prod_size' id='prod" +
      currentProduct.id +
      "_size' onchange='updatePrice(" +
      currentProduct.id +
      ",this.value)'>";
    displayBlock += "<option value='" + currentProduct.sizes.s.price + "'";
    displayBlock += currentProduct.sizes.s.available ? "" : " disabled";
    displayBlock += ">Small | ";
    displayBlock += currentProduct.sizes.s.available
      ? "Available"
      : "(Out of Stock)";
    displayBlock += currentProduct.sizes.s.available
      ? " (" + currentProduct.sizes.s.price + ")"
      : "";
    displayBlock += "</option>";
    displayBlock += "<option value='" + currentProduct.sizes.m.price + "'";
    displayBlock += currentProduct.sizes.m.available ? "" : " disabled";
    displayBlock += ">Medium | ";
    displayBlock += currentProduct.sizes.m.available
      ? "Available"
      : "(Out of Stock)";
    displayBlock += currentProduct.sizes.m.available
      ? " (" + currentProduct.sizes.m.price + ")"
      : "";
    displayBlock += "</option>";
    displayBlock += "<option value='" + currentProduct.sizes.l.price + "'";
    displayBlock += currentProduct.sizes.l.available ? "" : " disabled";
    displayBlock += ">Large | ";
    displayBlock += currentProduct.sizes.l.available
      ? "Available"
      : "(Out of Stock)";
    displayBlock += currentProduct.sizes.l.available
      ? " (" + currentProduct.sizes.l.price + ")"
      : "";
    displayBlock += "</option>";
    displayBlock += "<option value='" + currentProduct.sizes.xl.price + "'";
    displayBlock += currentProduct.sizes.xl.available ? "" : " disabled";
    displayBlock += ">Extra Large | ";
    displayBlock += currentProduct.sizes.xl.available
      ? "Available"
      : "(Out of Stock)";
    displayBlock += currentProduct.sizes.xl.available
      ? " (" + currentProduct.sizes.xl.price + ")"
      : "";
    displayBlock += "</option>";

    displayBlock += "</select>";
    displayBlock += "</select>";
    displayBlock += "</div></div>";
    _("#product_details").innerHTML = displayBlock;
  }
};

const getTotal = () => {
  const calculateTotal = (items) =>
    items.map((obj) => Number(obj.price)).reduce((total, ni) => total + ni, 0);
  let myCartItems = localStorage.getItem("myShoppingCart");
  let cartItems = null;
  let grandTotal = 0;
  if (myCartItems != null) {
    cartItems = JSON.parse(myCartItems);
    grandTotal = calculateTotal(cartItems);
  }
  return grandTotal.toFixed(2);
};

const closeAlert = () => {
  _(".alert-msg")[0].style.display = "none";
  return false;
};
