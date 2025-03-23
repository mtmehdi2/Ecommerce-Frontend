const qryStr = location.search;
const urlParams = new URLSearchParams(qryStr);
const prodId = urlParams.get("product_id");
const apiUrl = "http://3.136.18.203:8000/products/" + prodId + "/";
const catUrl = "http://3.136.18.203:8000/categories/";
const template = _("#prod-template");
const ctnr = _("#product-container");

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
  })
  .catch((err) => {
    showError(err.message);
  });

const updatePrice = (cost) => {
  cost_str = cost.toString().split(".");
  cost_html = "$" + cost_str[0] + "<sup>" + cost_str[1] + "</sup>";
  _(".p-price")[0].innerHTML = cost_html;
};
