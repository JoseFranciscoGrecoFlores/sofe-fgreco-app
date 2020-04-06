# sofe-fgreco-app
A web app for displaying global COVID-19 statistics for the Nearsoft Student of Excellence contest 

# Install
There are no special installation steps required, just run `ember serve` on the ember-quickstart folder

# Libraries used
Amcharts is used to display the world map and its cases/deaths/recovered/critical, for all the other charts Chart.js is used, this is due to the fact that amcharts pricing varies depending on the use case whereas Chart.js is MIT licensed, so to future proof the project Chart.js is prefered.

# Project structure
There are 5 ember components that make up the page:
countries-list A table that displays each country data 
global-pie-charts 3 pie charts displaying the top countries for each category
global-statistics Displays the global cases/deaths/recovered/critical
historical-graph A graph that displays the cases/deaths/recovered per day
world-map A world heat map displaying data per country

# Tests
As I had never used Ember.js before it would have been counterproductive for me to develop in a TDD fashion, so currently there are no tests in place.

# Build
Just run `ember build --environment=production`

# License
No license

# Screenshots
![Section1](https://user-images.githubusercontent.com/26514646/78596062-5e933a80-7808-11ea-968b-1d06402e7f68.PNG)
![Section2](https://user-images.githubusercontent.com/26514646/78596090-66eb7580-7808-11ea-98fa-3975e8d42688.PNG)
![Section3](https://user-images.githubusercontent.com/26514646/78596106-6e128380-7808-11ea-871d-83c95960ba68.PNG)
![Section4](https://user-images.githubusercontent.com/26514646/78596179-8b475200-7808-11ea-8245-cde7a91c4d6e.PNG)

