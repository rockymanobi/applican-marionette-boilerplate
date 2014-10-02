var Backbone = require('backbone');
var MainNavItemView = require('./main_nav_item_view.js');
module.exports = (function () {
  var MainNavCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: MainNavItemView
  });

  return MainNavCollectionView;

})();
