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

    const myPriceTable = document.createElement('td')
    myPriceTable.textContent = param.purchase


    const qtyTable = document.createElement('td')
    qtyTable.textContent = param.qty

    const lastPrice = document.createElement('td')
    lastPrice.textContent = param['last-price'].toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

    const change = document.createElement('td')
    change.textContent = (param['last-price'] - param.purchase).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

    //percent of change 
    const percentChange = document.createElement('td')
    percentChange.textContent = ((param['last-price'] - param.purchase) * 100 / param.purchase).toFixed(2) + " %"


    //profit table 
    const profitTable = document.createElement('td')
    profitTable.textContent = ((param['last-price'] - param.purchase) * param.qty).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

    function tableColor() {
        if (param['last-price'] < param.purchase) {

            return profitTable.style.color = "red"
        } else if (param['last-price'] > param.purchase) {
            return profitTable.style.color = "green"
        } else {
            return profitTable.style.color = "grey"
        }
    }
    tableColor()

    const happyMemeArray = [
        {
            name: "Wall Street Bets",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOBdQojktUASuWZyuFK8klyfaXk5MSjlPCA&usqp=CAU"
        },
        {
            name: "Jonah Hill",
            image: "https://www.happierhuman.com/wp-content/uploads/2022/04/happy-memes-winkgo-oh-my-god.jpg"
        },
        {
            name: "Opray",
            image: "https://imgflip.com/s/meme/Oprah-You-Get-A.jpg"
        },
        {
            name: "Obama",
            image: "https://i.imgflip.com/6vq4y2.jpg"
        }
    ]

    const sadMemeArray = [
        {
            name: "Toy Story",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGYbYnp3n24ab7Tmw4LOzgaph7_nrsyrMew&usqp=CAU"
        },
        {
            name: "Tom the Cat",
            image: "https://i.imgflip.com/6vq48z.jpg"
        },
        {
            name: "Dog in Fire",
            image: "https://static01.nyt.com/images/2016/08/05/us/05onfire1_xp/05onfire1_xp-superJumbo-v2.jpg"
        },
        {
            name: "Spongebob",
            image: "https://pbs.twimg.com/media/EDJP9uVU0AArmSL?format=jpg&name=small"
        }
    ];

    const centerImage = document.querySelector(".meme-insert");

    function memeGen() {
        if (param['last-price'] < param.purchase) {
            let displaySadMemes = sadMemeArray[Math.floor(Math.random() * sadMemeArray.length)];
            centerImage.src = displaySadMemes.image;
        } else if (param['last-price'] > param.purchase) {
            let displayHappyMemes = happyMemeArray[Math.floor(Math.random() * happyMemeArray.length)];
            centerImage.src = displayHappyMemes.image;
        }
    }
    memeGen()

    const deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-warning"
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

}
//Create table
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const stonkObj = {
        "stonk": e.target.stonk.value,
        "purchase": e.target.price.value,
        "qty": e.target.quantity.value,
        "last-price": secLast.textContent,
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
            "last-price": Number(secLast.textContent)
        })
    }

    fetch("http://localhost:3000/myportfolio/", configObj)
        .then(res => res.json())
        .then(console.log)

    myForm.reset();

})


