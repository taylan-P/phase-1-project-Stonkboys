const myForm = document.querySelector('#form');
const bottomTable = document.querySelector('#bottom-table');
const tBody = document.querySelector('tbody');
const deleteContainer = document.querySelector('#delete-container')
let jsonServerLen;

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
    lastPriceTable.textContent = param['last-price'].toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: (param['last-price'] < 1 ? 4 : 2) })

    const change = document.createElement('td')
    change.textContent = (param['last-price'] - param.purchase).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: (param['last-price'] < 1 ? 4 : 2) })

    // Percent of change 
    const percentChange = document.createElement('td')
    percentChange.textContent = ((param['last-price'] - param.purchase) * 100 / param.purchase).toFixed(2) + " %"

    // Profit table 
    const profitTable = document.createElement('td')
    profitTable.textContent = ((param['last-price'] - param.purchase) * param.qty).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
    // Add Green/Red Color to Profit / Loss
    param['last-price'] > param.purchase ? profitTable.style.color = "green" : profitTable.style.color = "red";

    // Delete stock from my portfolio and update db.json
    const deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-warning"
    deleteBtn.innerText = 'x'
    deleteBtn.style.color = "red"
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/myportfolio/${param.id}`, { method: 'DELETE' })
        tr.remove()
    })

    // Refresh stock price in my portfolio and update db.json
    const refresh = document.createElement('button');
    refresh.className = "btn btn-info"
    refresh.innerText = "Refresh"
    refresh.addEventListener('click', () => {
        ticker = stonkTable.id
        fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=1min&apikey=${apikey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                lastRefreshed = data['Meta Data']['6. Last Refreshed']
                const newLastPrice = Number(data['Time Series Crypto (1min)'][lastRefreshed]['4. close'])

                lastPriceTable.textContent = newLastPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

                change.textContent = (newLastPrice - param.purchase).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

                percentChange.textContent = ((newLastPrice - param.purchase) * 100 / param.purchase).toFixed(2) + " %"

                profitTable.textContent = ((newLastPrice - param.purchase) * param.qty).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

                newLastPrice > param.purchase ? profitTable.style.color = "green" : profitTable.style.color = "red";

                refreshJSON(newLastPrice, param.id);
            })
    })

    tr.append(stonkTable, myPriceTable, qtyTable, lastPriceTable, change, percentChange, profitTable, deleteBtn, refresh)
    tBody.append(tr)
    bottomTable.append(tBody)

}

// Update Json with refresh
function refreshJSON(updatePrice, id) {
    const configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "last-price": updatePrice,
        })
    }
    fetch(`http://localhost:3000/myportfolio/${id}`, configObj)
}
// Create table
myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    ticker = e.target.stonk.value;
    let qty = e.target.quantity.value;
    let purchase = e.target.price.value;
    let refreshedPrice;

    fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=1min&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            lastRefreshed = data['Meta Data']['6. Last Refreshed']

            refreshedPrice = Number(data['Time Series Crypto (1min)'][lastRefreshed]['4. close'])

            // Post to db.json
            const configObj = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "stonk": ticker,
                    "purchase": Number(purchase),
                    "qty": Number(qty),
                    "last-price": refreshedPrice
                })
            }

            fetch("http://localhost:3000/myportfolio/", configObj)
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    const stonkObj = {
                        "stonk": ticker,
                        "purchase": purchase,
                        "qty": qty,
                        "last-price": refreshedPrice,
                        "id": data.id
                    }
                    renderPortfolio(stonkObj)
                })
            const profitOrLoss = (refreshedPrice > purchase) ? "profit" : "loss";
            generateMeme(profitOrLoss)
        })
    myForm.reset();
})


