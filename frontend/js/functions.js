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

  showAlert(theProd.name, theProd.image);
};

const showAlert = (pname, pimg) => {
  _("#alert_prod_img").src = "images/" + pimg;
  _("#alert_prod_img").alt = pname;
  _("#alert_prod_name").innerHTML = pname;
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
      ");'><img class='prod-img' src='images/";
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
};
