Promise.all([
  fetch("http://3.136.18.203:8000/products/").then((res) => res.json()),
  fetch("http://3.136.18.203:8000/categories/").then((res) => res.json()),
])
  .then(([products, categories]) => {
    products.map((item) => {
      const category = categories.find(
        (cat) => cat.category_id === item.category
      );
      price_str = item.starting_at_price.toString().split(".");
      _("#products-container").innerHTML += `
        <a class='prod-lnk' href='product.html?product_id=${item.product_id}'>
        <div class='prod-container'>
            <div class='prod-img-ctnr'><img class='prod-img' src='${item.picture_url}' alt='' width='500' height='500'></div>
            <h2 class='prod-titlle'>${item.name}</h2>
            <div class='prod-category'>${category.name}</div>
            <div class='prod-quantity'>Stock: ${item.stock_quantity}</div>
            <div class='prod-price'>$${item.starting_at_price}</div>
        </div></a>`;
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
