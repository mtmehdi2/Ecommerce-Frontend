const qryStr = location.search;
const urlParams = new URLSearchParams(qryStr);
const prodId = urlParams.get("product_id");
const apiUrl = "http://3.136.18.203:8000/products/" + prodId + "/";
Promise.all([
  fetch(apiUrl).then((res) => res.json()),
  fetch("http://3.136.18.203:8000/categories/").then((res) => res.json()),
])
  .then(([product, categories]) => {
    const category = categories.find(
      (cat) => cat.category_id === product.category
    );
    price_str = product.starting_at_price.toString().split(".");
    price_html = price_str[0] + "<sup>" + price_str[1] + "</sup>";
    let variety_options = "";
    product.varieties.map((item) => {
      variety_options += `<option value='${item.price}'>${item.name} | ${item.price}</option>`;
    });
    _("#prod-title").innerHTML = product.name;
    _("#details-container").innerHTML += `
        <div class='p-container'>
            <div class='p-img-ctnr'><img class='p-img' src='${product.picture_url}' alt='' width='400' height='400'></div>
            <h2 class='p-titlle'>${product.name}</h2>
            <p class='p-description'>${product.description}</p>
            <p class='p-category'>Category: ${category.name}</p>
            <p class='p-quantity'>Stock: ${product.stock_quantity}</p>
            <p class='p-price'>$${price_html}</p>
            <h3 class='variety-title'>Varieties</h3>
            <div><select onchange='updatePrice(this.value)'>${variety_options}</select></div>
            <div class='submit-links'><button>Add to Cart</button><a href='products.html'>Back to Products page</a></div>
        </div>`;
  })
  .catch((err) => {
    _("#details-container").innerHTML = `<h1>Oops!</h1>
    <p>I was not able to find this product.</p>
    <p>Please browse <strong><a href='products.html'>products</a></strong> and select the product to view.</p>`;
  });

const updatePrice = (cost) => {
  cost_str = cost.toString().split(".");
  cost_html = "$" + cost_str[0] + "<sup>" + cost_str[1] + "</sup>";
  _(".p-price")[0].innerHTML = cost_html;
};
