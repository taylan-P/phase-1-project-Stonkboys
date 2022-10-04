const myForm = document.querySelector('#form');
const bottomTable = document.querySelector('#bottom-table');
const tBody = document.querySelector('tbody');
const deleteContainer = document.querySelector('#delete-container')

//Load my Portfolio from db.json
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/myportfolio")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(stonk => renderPortfolio(stonk))
    })
    .catch(err => console.error(err))
})
function renderPortfolio(param) {

    const tr = document.createElement('tr');

    const stonkTable = document.createElement('td')
    stonkTable.id = param.stonk
    stonkTable.textContent = param.stonk
    stonkTable.dataset.id = param.id

    const myPriceTable = document.createElement('td')
    myPriceTable.textContent = param.purchase
   

    const qtyTable = document.createElement('td')
    qtyTable.textContent = param.qty

    const lastPriceTable = document.createElement('td')
    lastPriceTable.textContent = param['last-price'].toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})

    const change = document.createElement('td')
    change.textContent = (param['last-price'] - param.purchase).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
    
    const percentChange = document.createElement('td')
    percentChange.textContent = ((param['last-price'] - param.purchase) * 100 / param.purchase).toFixed(2) + " %"

    const profitTable = document.createElement('td')
    profitTable.textContent = ((param['last-price'] - param.purchase )* param.qty).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
    function tableColor() {
        if( param['last-price'] < param.purchase ) {
        return profitTable.style.color = "red"
    } else if( param['last-price'] > param.purchase ) {
        return profitTable.style.color = "green"
    } else {
        return profitTable.style.color = "grey"
    }
    }
    tableColor()
    
    
    //  Delete stock from my portfolio and update db.json
    const deleteBtn = document.createElement('button')
    deleteBtn.className="btn btn-warning"
    deleteBtn.innerText = 'x'
    deleteBtn.style.color = "red"
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/myportfolio/${stonkTable.dataset.id}`, {method: 'DELETE'})
        tr.remove()
    })


    //Refresh stock price in my portfolio and update db.json
    const refresh = document.createElement('button');
    refresh.className = "btn btn-info"
    refresh.innerText = "Refresh"
    refresh.addEventListener('click', () => {
        ticker = stonkTable.id
        fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${ticker}&market=USD&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => {
            debugger;
            console.log(data)
            lastRefreshed = data['Meta Data']['6. Last Refreshed'].substring(0, 10)
            lastPriceTable.textContent = data['Time Series (Digital Currency Daily)'][lastRefreshed]['4a. close (USD)']
            change.textContent = (param['last-price'] - param.purchase).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
            
        })
    })

    tr.append(stonkTable, myPriceTable, qtyTable, lastPriceTable, change, percentChange, profitTable, deleteBtn, refresh)
    tBody.append(tr)
    bottomTable.append(tBody)

}
//Create table
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const stonkObj = {
        "stonk": e.target.stonk.value,
        "purchase": e.target.price.value,
        "qty": e.target.quantity.value,
        "last-price": cryptoPrice,
    }
    renderPortfolio(stonkObj)

    //Post to db.json
    //const stonkTable = document.getElementById(`${e.target.stonk.value}`)
    const configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "stonk": e.target.stonk.value,
            "purchase": Number(e.target.price.value),
            "qty": Number(e.target.quantity.value),
            "last-price": cryptoPrice
        })
    }

    fetch("http://localhost:3000/myportfolio/", configObj)
    .then(res => res.json())
    .then(console.log)

    myForm.reset();

})


