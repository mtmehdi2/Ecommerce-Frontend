function updatePrice(ind, price) {
  let myPrice = price.split(".");
  let txt = "$" + myPrice[0] + "<sup>" + myPrice[1] + "</sup>";
  _("#prod" + ind + "_price").innerHTML = txt;
}
