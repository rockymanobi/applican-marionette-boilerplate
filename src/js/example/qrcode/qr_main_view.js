var Backbone = require('backbone');

module.exports = (function () {
  var Page1View = Backbone.Marionette.ItemView.extend({
    template: require('./qr_main.html'),
    headerConf: {
      title: "QR",
      showBackButton: true,
    },
    ui: {
      "qrButton" : ".qrButton",
      "display" : ".display"
    },
    events: {
      "click @ui.qrButton": "read"
    },
    initialize: function(){
    },
    read: function(){
      _this = this;
      var s = function(res){ 
        _this.ui.display.html( res.codeData );
      };
      var f = function(){ alert("no"); };
      applican.barcode.captureBarcode(s, f);
    }
  });

  return Page1View;
})();
