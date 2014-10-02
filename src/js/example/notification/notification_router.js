var Backbone = require('backbone');
var NotificationMainView = require('./Notification_main_view');

module.exports = (function () {

  var NotificationController = Backbone.Marionette.Controller.extend({
    showNotificationView: function(){
      var notificationView = new NotificationMainView();
      notificationView.render();
      App.pageSlider.slidePage( notificationView );
      App.headerModel.applyViewHeaderConf( notificationView.headerConf );

    }
  });

  var notificationController = new NotificationController();
  var NotificationRouter = Backbone.Marionette.AppRouter.extend({
    controller: notificationController,
    appRoutes: {
      "notification" : "showNotificationView",
    }
  });

  return NotificationRouter;

})();
