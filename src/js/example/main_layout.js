var Backbone = require('backbone');
var HeaderView = require('./header/header_view');
module.exports = (function () {

  var MainLayout = Backbone.Marionette.LayoutView.extend({

    template: require('./main_layout.html'),
    regions: {
      "headerRegion" : ".app-header",
    },

    initialize: function(){
      this.headerView = new HeaderView({
        headerModel: App.headerModel
      });
    },
    onRender: function(){
      this.headerRegion.show( this.headerView );
    }

  });

  return MainLayout;
})();
