const qryStr = location.search;
const urlParams = new URLSearchParams(qryStr);
const prodId = urlParams.get("product_id");
const apiUrl = "http://3.136.18.203:8000/products/" + prodId + "/";
const catUrl = "http://3.136.18.203:8000/categories/";
const template = _("#prod-template");
const ctnr = _("#product-container");
const d = document;

Promise.all([
  fetch(apiUrl).then(handleErrors),
  fetch(catUrl).then(handleErrors),
])
  .then(([product, categories]) => {
    const category = categories.find(
      (cat) => cat.category_id === product.category
    );
    parent_cat = categories.find(
      (c) => c.category_id === category.parent_category
    );
    const price_str = product.starting_at_price.toString().split(".");
    const price_html = price_str[0] + "<sup>" + price_str[1] + "</sup>";
    let variety_options = "";
    product.varieties.map((item) => {
      variety_options += `<option value='${item.price}'>${item.name} | ${item.price}</option>`;
    });
    _(".breadcrumb")[0].children[0].textContent = parent_cat.name;
    _(".breadcrumb")[0].children[1].textContent = category.name;
    _(".breadcrumb")[0].children[2].textContent = product.name;

    _("#prod-title").textContent = product.name;
    const myT = template.content.cloneNode(true);
    myT.querySelector(".p-img").src = product.picture_url;
    myT.querySelector(".p-title").textContent = product.name;
    myT.querySelector(".p-description").textContent = product.description;
    myT.querySelector(".p-category").textContent += category.name;
    myT.querySelector(".p-quantity").textContent += product.stock_quantity;
    myT.querySelector(".p-price").innerHTML += price_html;
    myT.querySelector("select").innerHTML = variety_options;
    _("#product-container").appendChild(myT);
    _("#product_id").value=prodId;
    updatePrice();
  })
  .catch((err) => {
    showError(err.message);
  });

const updatePrice = () => {
  const varieties = d.querySelector('#varieties');
  const cost = varieties.options[varieties.selectedIndex].value;
  const qty=d.querySelector('#quantity').value;
  const total = Number(qty)*Number(cost);
  d.querySelector('#variety').value = varieties.options[varieties.selectedIndex].innerText.split("|")[0].trim();
  d.querySelector('#price').value=cost;
  d.querySelector('#total_price').value=total;
  cost_str = total.toString().split(".");
  cost_html = "$" + cost_str[0] + "<sup>" + cost_str[1] + "</sup>";
  _(".p-price")[0].innerHTML = cost_html;
};

const addToCart = ()=>{
  const prod_id = d.querySelector('#product_id').value;
  const qty = d.querySelector('#quantity').value;
  const variety = d.querySelector('#variety').value;
  const unit_price = d.querySelector('#price').value;
  const total_price= d.querySelector('#total_price').value;
  const cartItem = {
    'product_id': prod_id,
    'variety': variety,
    'quantity': qty,
    'price':unit_price,
    'total':total_price
  };
  
  const currCartItems = localStorage.getItem("capstoneShoppingCart");
  if (currCartItems===null || currCartItems===undefined){
    const nCart = [];
    nCart.push(cartItem);
    localStorage.setItem("capstoneShoppingCart",JSON.stringify(nCart));
    alert(_("#prod-title").innerText+' has been added to the cart successfully');
  }else{
    const cart=JSON.parse(currCartItems);
    let currQty=0;
    for(x of cart){
      if(x.product_id == prod_id && x.variety == variety){
        currQty = x.quantity;
      }
    }
    let newCart = [];
    for (i = 0; i< cart.length; i++){
      if(cart[i].product_id != prod_id || cart[i].variety!=variety){
        newCart.push(cart[i]);
      }
    }
    const newQty = Number(qty)+Number(currQty);
    cartItem.quantity=newQty;
    cartItem.total = Number(cartItem.quantity)*Number(cartItem.price);
    newCart.push(cartItem);
    localStorage.setItem('capstoneShoppingCart',JSON.stringify(newCart));
    alert(_("#prod-title").innerText+' has been added to the cart successfully');
  }

}