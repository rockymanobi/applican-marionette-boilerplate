var $ = require('jquery');
var Backbone = require('backbone');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

module.exports = (function(){

  $(document).ready(function(){

    var pageSlider = new PageSlider({
      container: $('#master-container')
    });

    var Router = require('./router')(pageSlider);
    var router = new Router();
    Backbone.history.start();

  });

})();
