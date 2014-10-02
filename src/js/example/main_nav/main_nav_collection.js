var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
module.exports = (function () {
  var MainNavCollection = Backbone.Collection.extend({
    model: MainNavModel
  });

  return MainNavCollection;

})();
