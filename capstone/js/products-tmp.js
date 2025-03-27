const template = _("#prod-template");
const ctnr = _("#product-container");
const productsApi = "http://3.136.18.203:8000/products/";
const categoriesApi = "http://3.136.18.203:8000/categories/";
const fragment = document.createDocumentFragment();

(()=>{
  Promise.all([
    fetch(productsApi).then(handleErrors),
    fetch(categoriesApi).then(handleErrors),
  ])
    .then(([products, categories]) => {
      products.map(item => {
        const category = categories.find(cat => cat.category_id === item.category);
        const price_str = item.starting_at_price.toString().split(".");
        const html_block =`
          <a class='prod-lnk' href='product.html?product_id=${item.product_id}'>
            <div class='prod-container'>
              <h2 class='prod-title'>${item.name}</h2>
              <div class='prod-img-ctnr'><img class='prod-img' src='${item.picture_url}' alt='' width='500' height='500'></div>
              <div class='prod-desc'>${item.description}</div>
              <div class='prod-category'>${category.name}</div>
              <div class='prod-price'><span>${item.starting_at_price}</div>
              <div class='prod-quantity'>Stock Qty: ${item.stock_quantity}</div>
          </div>
        </a>`;
        _("#product-container").innerHTML+=html_block;
      });
    })
    .catch((err) => {
      showError(err.message);
    });
  })();

  (()=>{
    const shoppingCart = localStorage.getItem("capstoneShoppingCart");
    if(shoppingCart!=null && shoppingCart !=undefined){
      const theCart = JSON.parse(shoppingCart);
      console.log(theCart.length);
      document.querySelector('.cart-icon').setAttribute('data-number',theCart.length);
    }
  })();