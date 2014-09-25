var Backbone = require('backbone');
module.exports = (function () {
  var Page2View = Backbone.Marionette.ItemView.extend({
    className: "page2",
    template: require('./page2_tpl.html'),
  })
  return Page2View;
})();
