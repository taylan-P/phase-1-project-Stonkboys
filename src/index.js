// Variable Declarations
let ticker, returnDailyData, lastRefreshed, myChart;
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
  if (document.getElementById("myChart").className === "active") {
    myChart.destroy()
  }
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

  const lastPrice = parseFloat(returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['4a. close (USD)']);

  secLast.textContent = lastPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  volume.textContent = parseFloat(returnDailyData['Time Series (Digital Currency Daily)'][lastRefreshed]['5. volume']).toFixed(2);

  // Finds Yesterday 
  const today = new Date(lastRefreshed)
  const ytdy = new Date(today.getTime() - (24 * 60 * 60 * 1000))
  const yesterday = ytdy.toISOString().substring(0, 10)
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

  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  document.getElementById("myChart").className = "active";
}

