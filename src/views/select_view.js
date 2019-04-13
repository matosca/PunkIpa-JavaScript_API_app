const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-beers-loaded', (event) => {
    const allBeers = event.detail;
    this.populate(allBeers);
  });

  this.element.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populate = function (beersData) {
  beersData.forEach( (beer, index) => {
    const option = document.createElement('option');
    option.textContent = beer.name;
    option.value = index;
    this.element.appendChild(option);
  });
};

module.exports = SelectView;
