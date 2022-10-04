const myForm = document.querySelector('#form');
const bottomTable = document.querySelector('#bottom-table');
const tBody = document.querySelector('tbody');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tr = document.createElement('tr');

    const stonkTable = document.createElement('td')
    stonkTable.textContent = e.target.stonk.value

    const myPriceTable = document.createElement('td')
    myPriceTable.textContent = e.target.price.value

    const qtyTable = document.createElement('td')
    qtyTable.textContent = e.target.quantity.value

    const lastPrice = document.createElement('td')
    lastPrice.textContent = "Last price"

    const change = document.createElement('td')
    change.textContent = "Last price - Purchase price"

    const percentChange = document.createElement('td')
    percentChange.textContent = "%"

    const profitTable = document.createElement('td')
    profitTable.textContent = "Profit or Loss"

    tr.append(stonkTable, myPriceTable, qtyTable, lastPrice, change, percentChange, profitTable)
    tBody.append(tr)
    bottomTable.append(tBody)
    

    
    myForm.reset();

})