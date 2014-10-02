var Backbone = require('backbone');

module.exports = (function () {
  var NotificationMainView = Backbone.Marionette.ItemView.extend({
    template: require('./notification_main.html'),
    headerConf: {
      title: "Notification",
      showBackButton: true,
    },
    ui: {
      "vibrationBtn" : ".vibration-btn",
      "beepBtn" : ".beep-btn"
    },
    events: {
      "click @ui.vibrationBtn": "vibrate",
      "click @ui.beepBtn": "beep"
    },
    initialize: function(){
    },
    vibrate: function(){
      applican.notification.vibrate(2000);
    },
    beep: function(){
      applican.notification.beep(2);
    },
  });

  return NotificationMainView;
})();
