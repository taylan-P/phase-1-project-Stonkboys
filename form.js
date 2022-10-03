const myForm = document.querySelector('#form');

const stonkTable = document.querySelector('#stonk-table');
const myPriceTable = document.querySelector('#price-table');
const qtyTable = document.querySelector('#qty-table');
const lastPriceTable = document.querySelector('#last-price-table');
const changeTable = document.querySelector('#change-table');
const changePercentTable = document.querySelector('#change-percent-table');
const profitTable = document.querySelector('#profit-table');


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    stonkTable.textContent = e.target.stonk.value
    myPriceTable.textContent = e.target.price.value
    qtyTable.textContent = e.target.quantity.value

    myForm.reset();

})