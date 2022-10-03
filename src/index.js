// Search Functionality

let ticker;
const search = document.getElementById("form1");
const searchForm = document.getElementById("searchForm")
const prodType = document.getElementById("productType")

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(e.target.search.value);
  ticker = e.target.search.value;
  if(prodType.value === "Crypto"){
    getPriceData(cryptoSearch, e.target.search.value);
  } else if(prodType.value === "Stocks"){
    getPriceData(stockSearch, e.target.search.value);
  }
  getCryptoPrice(ticker)
})

function searchSymbol() {

}

let returnData

// Get Crypto Price Info
function getCryptoPrice(ticker) {
  fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=5min&apikey=${apikey}`)
  .then(res => res.json())
  .then(data => {
    returnData = data["Meta Data"];
    console.log(data["Meta Data"])
    renderCryptoInfo()
  })
}

// Render Crypto Info
const secName = document.getElementById("secName");
const secCode = document.getElementById("secCode");
const secMarket = document.getElementById("secMarket");
const secTime = document.getElementById("secTime");
const secLast = document.getElementById("secLast");
const last24hr = document.getElementById("last24hr");
const marketcap = document.getElementById("marketcap");

function renderCryptoInfo(){
  secName.textContent = returnData['3. Digital Currency Name'];
  secCode.textContent = returnData['2. Digital Currency Code'];
  secMarket.textContent = returnData['4. Market Code'];
  secTime.textContent = returnData['6. Last Refreshed']+returnData['9. Time Zone']

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
    
    const priceData = data['Time Series (Digital Currency Daily)']
    const dates = Object.keys(priceData);
    let closePriceArray = []
    for(const date in priceData) {
        closePriceArray.push(priceData[date]['4a. close (USD)'])
    };
    renderChart(dates, closePriceArray);
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


