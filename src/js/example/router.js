var MainNavView = require('./main_nav/main_nav_view');
var MainNavCollection = require('./main_nav/main_nav_collection.js');
var Backbone = require('backbone');

module.exports = (function(){

  var Router = Backbone.Router.extend({

    routes:{
      "" : "showMenue",
      "notification" : "showNotificationView",
    },

    showMenue: function(){

      var collection = new MainNavCollection([
        { href: "#qr_reader", text: "QR"},
        { href: "#notification", text: "Notification"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
        { href: "index.html?launch_webview=yes", text: "open new webview"},
      ]);
      var mainNavView = new MainNavView({ navCollection: collection });

      mainNavView.render();
      App.pageSlider.slidePage( mainNavView );
      App.headerModel.applyViewHeaderConf( mainNavView.headerConf );
    },

  });

  return Router;


})();
