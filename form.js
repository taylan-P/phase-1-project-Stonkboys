const myForm = document.querySelector('#form');
const bottomTable = document.querySelector('#bottom-table');
const tBody = document.querySelector('tbody');
const deleteContainer = document.querySelector('#delete-container')

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tr = document.createElement('tr');

    const stonkTable = document.createElement('td')
    stonkTable.textContent = e.target.stonk.value

    const myPriceTable = document.createElement('td')
    myPriceTable.textContent = parseInt(e.target.price.value).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
   

    const qtyTable = document.createElement('td')
    qtyTable.textContent = e.target.quantity.value

    const lastPrice = document.createElement('td')
    lastPrice.textContent = parseInt(secLast.textContent).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})

    const change = document.createElement('td')
    
    change.textContent = (parseInt(secLast.textContent) - parseInt(e.target.price.value)).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
    
    const percentChange = document.createElement('td')
    percentChange.textContent = ((parseInt(secLast.textContent) - parseInt(e.target.price.value)) * 100 / parseInt(e.target.price.value)).toFixed(2) + " %"

    const profitTable = document.createElement('td')
    profitTable.textContent = (parseInt(secLast.textContent) * parseInt(qtyTable.textContent) - parseInt(e.target.price.value) * parseInt(qtyTable.textContent)).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
    function tableColor() {
        if((parseInt(secLast.textContent) * parseInt(qtyTable.textContent) - parseInt(e.target.price.value) * parseInt(qtyTable.textContent)) < 0) {
        return profitTable.style.color = "red"
    } else if((parseInt(secLast.textContent) * parseInt(qtyTable.textContent) - parseInt(e.target.price.value) * parseInt(qtyTable.textContent)) > 0) {
        return profitTable.style.color = "green"
    } else {
        return profitTable.style.color = "grey"}
    }
    tableColor()

    const deleteBtn = document.createElement('button')
    deleteBtn.className="btn btn-warning"
    deleteBtn.innerText = 'x'
    deleteBtn.style.color = "red"
    deleteBtn.addEventListener('click', () => {
        tr.remove()
    })
    

    tr.append(stonkTable, myPriceTable, qtyTable, lastPrice, change, percentChange, profitTable, deleteBtn)
    tBody.append(tr)
    bottomTable.append(tBody)
    


    myForm.reset();

})