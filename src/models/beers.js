const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Beers = function () {
  this.data = null;
};

Beers.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://api.punkapi.com/v2/beers');

  requestHelper.get( (beersData) => {
    this.data = beersData;
    PubSub.publish('Beers:all-beers-loaded', this.data);
  });
};

Beers.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', () => {
    const selectedIndex = event.detail;
    this.publishBeerDetails(selectedIndex);
  })
};

Beers.prototype.publishBeerDetails = function (beerIndex) {
  const selectedBeer = this.data[beerIndex];
  PubSub.publish('Beers:selected-beer-ready', selectedBeer);
};

module.exports = Beers;
