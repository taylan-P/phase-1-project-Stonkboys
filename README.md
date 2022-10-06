# phase-1-project-Stonkboys

Software Engineering BootCamp at Flatiron School - Phase 1 Project

Stonk Boyz - contributors: Bernard, Chris, Dulat, Taylan

User functionality:

* Search a crypto currency by its coin code and renders details on the page:
    - Name, Code;
    - Market: market price from last close (daily) converted to U.S. Dollar;
    - Date of last close price;
    - Change in close price over the last 24 hours; and 
    - Volume over the last 24 hours.
* Pulls historical daily closing price data from Alpha Advantage API and displays in a chart.
* Ability to add purchased lots of crypto in the My Calculator section which then adds the lot to the My Portfolio section below, makes a fetch (GET) request from API and calculates profit and loss, sends a POST request to json-server and generates a random meme (from collection of 8) depending on if a profit or loss was made
* In the my portfolio section, 
    - Changes made from My Calculator (adding crypto to your portfolio) as well as refreshing and deleting will persist upon refresh when running db.json 
    - each refresh button will update each line of crypto currency to the most recent available price (1 min intervals) [Note: Button is added individually due to API limitations  (see details below)
    - each delete button will remove each lot of crypto and send a delete fetch to json
    - both refresh and delete will update the total profit and loss value at the bottom of the table

Limitations:
* JSON server needs to be run via localhost:3000 in order for full back end functionality to persist;
* API Key is required refer to Alpha Advantage link below;
* Alpha Advantage Free API is limited to 5 requests per min and 500 per day; console will log error message from API if request limit has been exceeded

References:
* chart.js https://www.chartjs.org/ 
* Bootstrap https://getbootstrap.com/ 
* Alpha Advantage: https://www.alphavantage.co/documentation/ 

