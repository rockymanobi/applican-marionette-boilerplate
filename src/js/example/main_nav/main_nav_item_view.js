var Backbone = require('backbone');
module.exports = (function () {
  var MainNavItemView = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    template: require('./main_nav_item_view.html'),
  });

  return MainNavItemView;

})();
