const d=document;
const showEmptyCart =()=>{
    const cartEmpty = d.createDocumentFragment();
        const div=d.createElement('div');
        const h2= d.createElement('h2');
        const p=d.createElement('p');
        div.setAttribute('class','cart-empty-msg');
        h2.textContent='Empty!';
        p.textContent='The shopping cart is empty. Please add some product to the cart. Click on the Products link on the menu to browse the products.';
        div.appendChild(h2);
        div.appendChild(p);
        cartEmpty.appendChild(div);
        d.querySelector('#product-container').appendChild(cartEmpty);
        d.querySelector('#checkout').style.display='none';
        updateCartIconLabel();
}


const updateCartIconLabel =()=>{
    const shoppingCart = localStorage.getItem("capstoneShoppingCart");
    if(shoppingCart!=null && shoppingCart !=undefined){
      const theCart = JSON.parse(shoppingCart);
      document.querySelector('.cart-icon').setAttribute('data-number',theCart.length);
    }
  };

const updateTotal = ()=>{
    const shoppingCart=JSON.parse(localStorage.getItem('capstoneShoppingCart'));
    let cartTotal=0;
    shoppingCart.forEach(item=>{
        cartTotal+=Number(item.total);
    });
    d.querySelector('.grand-total').textContent=cartTotal.toFixed(2);
    d.querySelector('.grand-total-ctnr').style.display='flex';
    updateCartIconLabel();
}


const removeItem=(pid,pv)=>{
    if(confirm('Do you really want to remove this item from the cart?')){
        const shoppingCart = JSON.parse(localStorage.getItem("capstoneShoppingCart"));
        const newCart = [];
        for(const x of shoppingCart){
            if(x.product_id != pid || x.variety!=pv){
                newCart.push(x);
            }
        }
        localStorage.setItem("capstoneShoppingCart",JSON.stringify(newCart));
        d.querySelector('#rw_'+pid).remove();
        if(newCart.length===0){
            showEmptyCart();
        }else{
            updateTotal();
        }
    }
}

 (()=>{
    const currCart = localStorage.getItem("capstoneShoppingCart");
    if(currCart===undefined || currCart===null){
        showEmptyCart();
    }else{
        const theCart = JSON.parse(currCart);
        if(theCart.length==0){
            showEmptyCart();
        }else{
            theCart.forEach(item => {
                const cln = d.querySelector('#cart-template').content.cloneNode(true);
                cln.querySelector('.c-rw').setAttribute('id','rw_'+item.product_id);
                cln.querySelector('.c-product').textContent=item.product_name;
                cln.querySelector('.c-variety').textContent=item.variety;
                cln.querySelector('.c-quantity').textContent=item.quantity;
                cln.querySelector('.c-price').textContent=Number(item.price).toFixed(2);
                cln.querySelector('.c-total').textContent=Number(item.total).toFixed(2);
                cln.querySelector('.btn-remove').setAttribute('onclick','removeItem('+item.product_id+',"'+item.variety+'");');
                d.querySelector('#product-container').appendChild(cln);
            });
            updateTotal();
        }
    }
})();
