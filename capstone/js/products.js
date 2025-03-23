const template = _("#prod-template");
const ctnr = _("#product-container");
const productsApi = "http://3.136.18.203:8000/products/";
const categoriesApi = "http://3.136.18.203:8000/categories/";
const fragment = document.createDocumentFragment();

Promise.all([
  fetch(productsApi).then(handleErrors),
  fetch(categoriesApi).then(handleErrors),
])
  .then(([products, categories]) => {
    products.map((item) => {
      const category = categories.find(
        (cat) => cat.category_id === item.category
      );
      const price_str = item.starting_at_price.toString().split(".");
      const myElem = template.content.cloneNode(true);
      myElem.querySelector(".prod-lnk").href += item.product_id;
      myElem.querySelector(".prod-img").src = item.picture_url;
      myElem.querySelector(".prod-title").textContent = item.name;
      myElem.querySelector(".prod-desc").textContent = item.description;
      myElem.querySelector(".prod-quantity").textContent += item.stock_quantity;
      myElem.querySelector(".prod-price").children[0].textContent +=
        price_str[0];
      myElem.querySelector(".prod-price").children[1].textContent +=
        price_str[1];
      fragment.appendChild(myElem);
    });
    _("#product-container").appendChild(fragment);
  })
  .catch((err) => {
    showError(err.message);
  });
