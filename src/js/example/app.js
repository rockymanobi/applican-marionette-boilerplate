var $ = require('jquery');
var Backbone = require('backbone');

var Router = require('./router');
var QRRouter = require('./qrcode/qr_router.js');
var NotificationRouter = require('./notification/notification_router.js');
var MainLayout = require('./main_layout.js');
var HeaderModel = require('./header/header_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

module.exports = (function () {
  var mainApp = new Backbone.Marionette.Application();

  mainApp.headerModel = new HeaderModel();

  mainApp.onStart = function(){
    this.mainLayout = new MainLayout( {el: $('#main-layout')} );
    this.mainLayout.render();
    this.pageSlider = new PageSlider({
      container: $('#master-container')
    });

    var router = new Router();
    var qRRouter = new QRRouter();
    var notificationRouter = new NotificationRouter();
    Backbone.history.start();
  };
  
  return mainApp;

})();
