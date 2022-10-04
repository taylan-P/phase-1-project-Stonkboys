// Variable Declarations
let ticker, returnDailyData, lastRefreshed;
const search = document.getElementById("form1");
const searchForm = document.getElementById("searchForm");
const prodType = document.getElementById("dropdownMenuButton");
const cryptoSearch = "DIGITAL_CURRENCY_DAILY"
const secName = document.getElementById("secName");
const secCode = document.getElementById("secCode");
const secMarket = document.getElementById("secMarket");
const secTime = document.getElementById("secTime");
const secLast = document.getElementById("secLast");
const secChange = document.getElementById("secChange");
const volume = document.getElementById("volume");

// Search Functionality
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  ticker = e.target.form1.value;
  if (prodType.value === "Crypto") {
    getPriceData(cryptoSearch, ticker);
  } else if (prodType.value === "Stocks") {
    getPriceData(stockSearch, ticker); // Have not yet coded stock functionality
  }
})

function getPriceData(searchParam, ticker) {
  fetch(`https://www.alphavantage.co/query?function=${searchParam}&symbol=${ticker}&market=USD&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      returnDailyData = data;
      lastRefreshed = returnDailyData['Meta Data']['6. Last Refreshed'].substring(0, 10)

      renderCryptoInfo(data)

      const priceData = data['Time Series (Digital Currency Daily)']
      const dates = Object.keys(priceData).reverse();
      let closePriceArray = []
      for (const date in priceData) {
        closePriceArray.push(priceData[date]['4a. close (USD)'])
      };
      closePriceArray.reverse();
      renderChart(dates, closePriceArray);

    })
    .catch(err => console.error(err));
};

function renderCryptoInfo() {
  lastRefreshed = returnDailyData["Meta Data"]['6. Last Refreshed'].substring(0, 10)
  secName.textContent = returnDailyData["Meta Data"]['3. Digital Currency Name'];
  secCode.textContent = returnDailyData["Meta Data"]['2. Digital Currency Code'];
  secMarket.textContent = returnDailyData["Meta Data"]['4. Market Code']
  secTime.textContent = lastRefreshed

  const lastPrice = parseFloat(returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['4a. close (USD)'])

  secLast.textContent = lastPrice;

  volume.textContent = parseFloat(returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['5. volume']);

  // Finds Yesterday 
  const today = new Date(lastRefreshed)
  const ytdy = new Date(today.getTime() - (24 * 60 * 60 * 1000))
  const yesterday = ytdy.toISOString().substring(0, 10)
  // const yesterday = `${ytdy.getFullYear()}-${(ytdy.getMonth()+1 < 10) ? '0' : ''}${ytdy.getMonth()+1}-${(ytdy.getUTCDate() < 10) ? '0' : ''}${ytdy.getUTCDate()}`

  const secYtdyPrice = parseFloat(returnDailyData['Time Series (Digital Currency Daily)'][yesterday]['4a. close (USD)'])

  secChange.textContent = (lastPrice - secYtdyPrice).toFixed(4)

}

// Random Color Generator
const rand1 = Math.floor(255 * Math.random())
const rand2 = Math.floor(255 * Math.random())
const rand3 = Math.floor(255 * Math.random())

function randomColor() {
  return `rgb(${rand1}, ${rand2}, ${rand3})`
}

// Render Graph 
function renderChart(xAxis, yAxis) {

  const data = {
    labels: xAxis,
    datasets: [{
      label: `${ticker} Price Data`,
      backgroundColor: randomColor(),
      borderColor: randomColor(),
      data: yAxis,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}



//happy 

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

let displayHappyMemes = happyMemeArray[Math.floor(Math.random() * happyMemeArray.length)];
console.log(happyMemeArray.image);

//sad
const sadMemeArray = [
  {
    name: "Toy Story",
    image: "https://imgflip.com/i/6vq14h"
  },
  {
    name: "Tom the Cat",
    image: "https://i.imgflip.com/6vq48z.jpg"
  },
  {
    name: "Shooting yourself",
    image: "https://i.imgflip.com/6vq5h5.jpg"
  },
  {
    name: "Spongebob",
    image: "https://pbs.twimg.com/media/EDJP9uVU0AArmSL?format=jpg&name=small"
  }
]

let displaySadMemes = happyMemeArray[Math.floor(Math.random() * happyMemeArray.length)];


