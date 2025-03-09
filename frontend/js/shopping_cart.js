const displayCart = () => {
  let dispBlock = "<form method='post'>";
  dispBlock += "<div class='cart-table'>";
  if (cartItems == null) {
    dispBlock += "<h2>There is no item in the cart.</h2>";
  } else {
    window.products = products;
    dispBlock += `<div class="cart-item-title">
      <div>&nbsp;</div>
      <div>Product Title</div>
      <div>Unit Price</div>
      <div title="Click on up/down arrow to change the quantity">
        Quantity
        <span class="fa fa-info-circle info">&nbsp;</span>
      </div>
      <div>Total Price</div>
      <div>Action</div>
    </div>`;
    cartItems.map((item, idx) => {
      let currProd = window.products.find((prod) => prod.id == item.productID);

      dispBlock += `<div class="cart-item" id="item${idx}">
        <div class="prod-img"><img src="images/${currProd.image}" width="50" height="50" alt=""></div>
        <div class="prod-title"><span class="label">Product Title"</span><span class="product-title-text">${currProd.name}</span></div>
        <div class="p-unit-price"><span class="label">Unit Price</span><input type="number" value="${item.price}" readonly id="unit_price${idx}"></div>
        <div class="p-quantity"><span class="label">Quantity:</span><input type="number" value="1" id="quantity${idx}" min="1" onchange="calc(${idx})"></div>
        <div class="p-total-price"><span class="label">Total Price:</span><input type="number" value="${item.price}" readonly id="total_price${idx}" class="i-total-price"></div>
        <div class="p-action"><button id="btn_remove${idx}" type="button" class="btn-remove fa fa-trash" onclick="removeItem(${idx})">Remove</button><input type="hidden" id="prod_id${idx}" value="${currProd.id}"></div>
        </div>`;
    });
    dispBlock += `<div class="cart-item-grand-total">
      <div class="grand-total"><span>Grand Total</span>
        <input type="number" readonly value="${grandTotal}" id="grand_total">
        </div></div>`;
  }
  dispBlock += "</div></form>";
  _("#cart_content").innerHTML = dispBlock;
};

const removeItem = (ind) => {
  if (
    confirm("Do you really want to remove this item from the shopping cart?")
  ) {
    let prodId = _("#prod_id" + ind).value;
    let index = cartItems.findIndex((obj) => obj.productID == prodId);
    cartItems.splice(index, 1);
    localStorage.setItem("myShoppingCart", JSON.stringify(cartItems));
    _("#item" + ind).remove();
    calcTotal();
  }
};
const calc = (ind) => {
  let qty = _("#quantity" + ind).value;
  let unit_price = _("#unit_price" + ind).value;
  let total_price = _("#total_price" + ind);
  total_price.value = (qty * unit_price).toFixed(2);
  calcTotal();
};
const calcTotal = () => {
  var i_total_price = 0;
  let items = _(".i-total-price");
  let i_grand_total = _("#grand_total");
  if (items.length > 0) {
    for (i = 0; i < items.length; i++) {
      i_total_price += parseFloat(items[i].value);
    }
    i_grand_total.value = i_total_price.toFixed(2);
  } else {
    i_grand_total.value = 0;
  }
};
