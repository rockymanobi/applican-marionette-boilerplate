var Backbone = require('backbone');
var QRMainView = require('./qr_main_view');

module.exports = (function () {

  var QRController = Backbone.Marionette.Controller.extend({
    showQRpage: function(){
      var qrView = new QRMainView();
      qrView.render();
      App.pageSlider.slidePage( qrView );
      App.headerModel.applyViewHeaderConf( qrView.headerConf );
    },
  });

  var qRController = new QRController();
  var QRRouter = Backbone.Marionette.AppRouter.extend({
    controller: qRController,
    appRoutes: {
      "qr_reader" : "showQRpage",
    }
  });

  return QRRouter;

})();
