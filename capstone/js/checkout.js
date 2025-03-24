const placeOrder = ()=>{
    const d=document;
    const apiUrl = "http://3.136.18.203:8000/orders/";
    const c_id=d.querySelector('#customer_id').value;
    const t_amount = d.querySelector('#total_amount').value;
    const p_method=d.querySelector('input[name=payment_method]:checked').value;
    const sh_address=d.querySelector('#shipping_address').value;
    const data = {
        customer_id: c_id,
        total_amount: t_amount,
        payment_method: p_method,
        shipping_address: sh_address
    }
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data =>{
        const template=document.getElementById('result-template');
        const cln = template.content.cloneNode(true);
        cln.querySelector('.a-order-id').textContent=data.order_id;
        cln.querySelector('.a-customer-id').textContent=data.customer_id;
        cln.querySelector('.a-order-date').textContent=data.order_date;
        cln.querySelector('.a-total-amount').textContent=data.total_amount;
        cln.querySelector('.a-order-status').textContent=data.status;
        cln.querySelector('.a-payment-method').textContent=data.payment_method;
        cln.querySelector('.a-shipping-address').textContent=data.shipping_address;
        cln.querySelector('.a-code').value = "Data Received: "+ JSON.stringify(data,null,4);
        document.querySelector("#result").appendChild(cln);
    })
    .catch(error => console.error('Error:', error));

    document.querySelector('#submit-button').disabled=true;
}
const generateCustomerId = () => {
    const c_id = Math.floor(Math.random()* 90000)+10000;
    document.querySelector('#customer_id').value=c_id;
}
generateCustomerId();