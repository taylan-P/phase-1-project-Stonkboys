// Variable Declarations
let ticker, returnIntraData, returnDailyData, lastRefreshed;
const search = document.getElementById("form1");
const searchForm = document.getElementById("searchForm");
const prodType = document.getElementById("dropdownMenuButton");

// Search Functionality
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  ticker = e.target.form1.value;
  if(prodType.value === "Crypto"){
    getPriceData(cryptoSearch, ticker);
  } else if(prodType.value === "Stocks"){
    getPriceData(stockSearch, ticker);
  }
  getCryptoPrice(ticker)
})

// Get Crypto Price Info
function getCryptoPrice(ticker) {
  fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=5min&apikey=${apikey}`)
  .then(res => res.json())
  .then(data => {
    returnIntraData = data;
    console.log(data["Meta Data"])
    renderIntraCryptoInfo()
  })
}

// Render Crypto Info
const secName = document.getElementById("secName");
const secCode = document.getElementById("secCode");
const secMarket = document.getElementById("secMarket");
const secTime = document.getElementById("secTime");
const secLast = document.getElementById("secLast");
const secChange = document.getElementById("secChange");
const marketCap = document.getElementById("marketCap");

function renderIntraCryptoInfo(){
  lastRefreshed = returnIntraData["Meta Data"]['6. Last Refreshed'].substring(0,10);
  secName.textContent = returnIntraData["Meta Data"]['3. Digital Currency Name'];
  secCode.textContent = returnIntraData["Meta Data"]['2. Digital Currency Code'];
  secMarket.textContent = returnIntraData["Meta Data"]['4. Market Code'];
  secTime.textContent = lastRefreshed;
}

function renderDailyCryptoInfo() {
    secLast.textContent = returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['4a. close (USD)'];
    marketCap.textContent = returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['6. market cap (USD):']
    
}
// Get Crypto Price Data and Render Graph

const cryptoIntra = "CRYPTO_INTRADAY"
const cryptoSearch = "DIGITAL_CURRENCY_DAILY"
const stockSearch = "TIME_SERIES_DAILY"

function getPriceData(searchParam, ticker) {
  fetch(`https://www.alphavantage.co/query?function=${searchParam}&symbol=${ticker}&market=USD&apikey=${apikey}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    returnDailyData = data;
    
    const priceData = data['Time Series (Digital Currency Daily)']
    const dates = Object.keys(priceData).reverse();
    let closePriceArray = []
    for(const date in priceData) {
        closePriceArray.push(priceData[date]['4a. close (USD)'])
    };
    closePriceArray.reverse();
    renderChart(dates, closePriceArray);
    renderDailyCryptoInfo()
});
};

const rand1 = Math.floor(255*Math.random())
const rand2 = Math.floor(255*Math.random())
const rand3 = Math.floor(255*Math.random())

function randomColor() {
    return `rgb(${rand1}, ${rand2}, ${rand3})`
}

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


