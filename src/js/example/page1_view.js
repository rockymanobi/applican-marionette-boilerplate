var Backbone = require('backbone');
module.exports = (function () {
  var Page1View = Backbone.Marionette.ItemView.extend({
    template: require('./page1_tpl.html'),
  });

  return Page1View;
})();
