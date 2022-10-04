const myForm = document.querySelector('#form');
const bottomTable = document.querySelector('#bottom-table');
const tBody = document.querySelector('tbody');
const deleteContainer = document.querySelector('#delete-container')

//Create table
myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tr = document.createElement('tr');

    const stonkTable = document.createElement('td')
    stonkTable.id = e.target.stonk.value
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

    const refresh = document.createElement('button');
    refresh.className = "btn btn-info"
    refresh.innerText = "Refresh"
    refresh.addEventListener('click', (e) => {
        e.preventDefault()
        ticker = stonkTable.id
        fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${ticker}&market=USD&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            lastPrice.textContent = data['Time Series (Digital Currency Daily)'][lastRefreshed]['4a. close (USD)']
            
        })

        // lastPrice.textContent = parseInt(secLast.textContent).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
        


    })

    tr.append(stonkTable, myPriceTable, qtyTable, lastPrice, change, percentChange, profitTable, deleteBtn, refresh)
    tBody.append(tr)
    bottomTable.append(tBody)


    //Post to db.json
    
    const configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "stonk": stonkTable.textContent,
            "purchase": myPriceTable.textContent,
            "qty": qtyTable.textContent,
            "last-price": secLast.textContent
        })
    }


    fetch("http://localhost:3000/myportfolio/", configObj)
    .then(res => res.json())
    .then(console.log)

    myForm.reset();

})


