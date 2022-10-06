# phase-1-project-Stonkboys
phase 1 project repo

Software Engineering BootCamp at Flatiron School - Phase 1 Project

Stonk Boyz: 

Functionality:

* Search a crypto currency by its coin code and renders details the Crypto Currency on the page (Name, Code, Market (Currency), Date of last close price, change in close price over the last 24 hours and volume over the last 24 hours.
* Pulls historical daily closing price data from Alpha Advantage API and displays in a chart.
* Ability to add purchased lots of crypto in the My Calculator section which then adds the lot to the My Portfolio section below, calculates your profit and loss (by  making a fetch request), sends a POST request to json-server and generates a random meme (from collection of 8) depending on if you made a profit or a loss
* In the my portfolio section, 
    - Changes made from My Calculator (adding crypto to your portfolio) as well as refreshing and deleting will persist upon refresh when running db.json 
    - each refresh button will update each line of crypto currency to the most recent available price (1 min intervals) [Note: Button is added individually due to API GET limitations of the free service from Alpha Advantage (5 requests per min / 500 per day)]
    - each delete button will remove each lot of crypto and send a delete fetch to json
    - both refresh and delete will update the total profit and loss value at the bottom of the table

References:
* chart.js https://www.chartjs.org/ 
* Bootstrap https://getbootstrap.com/ 
* Alpha Advantage: https://www.alphavantage.co/documentation/ 

