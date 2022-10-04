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
    lastPrice.textContent = parseInt(secLast.textContent).toFixed(2)

    const change = document.createElement('td')
    change.textContent = parseInt(secLast.textContent - myPriceTable.textContent).toFixed(2)

    const percentChange = document.createElement('td')
    percentChange.textContent = parseInt((change.textContent) * 100 / myPriceTable.textContent).toFixed(2) + " %"

    const profitTable = document.createElement('td')
    profitTable.textContent = parseInt((secLast.textContent) * (qtyTable.textContent) - (myPriceTable.textContent) * (qtyTable.textContent)).toFixed(2)
    function tableColor() {
        if(profitTable.textContent < 0) {
        return profitTable.style.color = "red"
    } else if(profitTable.textContent > 0) {
        return profitTable.style.color = "green"
    } else {
        return profitTable.style.color = "grey"}
    }
    tableColor()

    tr.append(stonkTable, myPriceTable, qtyTable, lastPrice, change, percentChange, profitTable)
    tBody.append(tr)
    bottomTable.append(tBody)
    


    myForm.reset();

})