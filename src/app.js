const Beers = require('./models/beers.js');
const SelectView = require('./views/select_view.js');
const BeerInfoView = require('./views/beer_info_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selectElement = document.querySelector('select#beers');

  const beersDropdown = new SelectView(selectElement);
  beersDropdown.bindEvents();


  const beerContainer = document.querySelector('div#beer-detail');

  const beerInfoView = new BeerInfoView(beerContainer);
  beerInfoView.bindEvents();

  const beerModel = new Beers();
  beerModel.getData();
  beerModel.bindEvents();
});
