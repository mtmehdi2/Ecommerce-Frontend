const mainCat = _(".main-cat-ctnr")[0];
const childCat = _(".child-cat-ctnr")[0];
const apiUrl = "http://3.136.18.203:8000/categories/";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    let parent_cat = [];
    let child_cat = [];
    data.forEach((cat) => {
      if (cat.parent_category === null) {
        parent_cat.push(cat);
      } else {
        child_cat.push(cat);
      }
    });
    parent_cat.forEach((ct) => {
      const r = document.createElement("div");
      const c1 = document.createElement("div");
      const c2 = document.createElement("div");
      r.setAttribute("class", "main-cat-rw");
      c1.setAttribute("class", "main-cat-fc");
      c2.setAttribute("class", "main-cat-lc");
      c1.textContent = ct.category_id;
      c2.textContent = ct.name;
      r.appendChild(c1);
      r.appendChild(c2);
      mainCat.appendChild(r);
    });
    const frag = document.createDocumentFragment();
    child_cat.forEach((ct) => {
      const pcc = parent_cat.find(
        (itm) => itm.category_id === ct.parent_category
      );
      const r = document.createElement("div");
      const c1 = document.createElement("div");
      const c2 = document.createElement("div");
      const c3 = document.createElement("div");
      r.setAttribute("class", "child-cat-rw");
      c1.setAttribute("class", "child-cat-fc");
      c2.setAttribute("class", "child-cat-sc");
      c3.setAttribute("class", "child-cat-lc");
      c1.textContent = ct.category_id;
      c2.textContent = ct.name;
      c3.textContent = pcc.name;
      r.appendChild(c1);
      r.appendChild(c2);
      r.appendChild(c3);
      frag.appendChild(r);
      childCat.appendChild(frag);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

  (()=>{
    const shoppingCart = localStorage.getItem("capstoneShoppingCart");
    if(shoppingCart!=null && shoppingCart !=undefined){
      const theCart = JSON.parse(shoppingCart);
      console.log(theCart.length);
      document.querySelector('.cart-icon').setAttribute('data-number',theCart.length);
    }
  })();