(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = (function( $ ){

  var _this;
  var EdgeSwipeHandler = function(options){
    _this = this;
    this.mainContentSelector = options.mainContentSelector;
    this.verticalNavSelector = options.verticalNavSelector;
    this.diffX = 0;
    this.startPositionX = 0;

    // To handle edge swipe gesture,
    // add invisible object to DOM on the left edge of the window
    this.swipeTargetSelector = "#swipe_edge";
    $('body').append('<div id="swipe_edge"></div>');

    this._setUpClasses();
    this._bindEvents();
  };

  EdgeSwipeHandler.prototype = {
    open: function(){
      console.log(this);
      $(_this.swipeTargetSelector).addClass('expand');
      $(".edge_swipe_content").addClass('expand');
      $(".edge_swipe_nav").addClass('expand');
    },
    close: function(){
      $(_this.swipeTargetSelector).removeClass('expand');
      $(".edge_swipe_content").removeClass('expand');
      $(".edge_swipe_nav").removeClass('expand');
    },

    _bindEvents: function(){
      $('body').on('click','.edge_swipe_content',this.close); 
      $(this.swipeTargetSelector)
        .on('touchstart', this._onTouchStart)
        .on('touchmove', this._dragEdge)
        .on('touchend',this._releaseEdge);
    },
    _setUpClasses: function(){
      var length;
      length = this.mainContentSelector.length;
      for( var i = 0; i < length; i++ ){
        $(this.mainContentSelector[i]).addClass('edge_swipe_content');
      }
      $(this.verticalNavSelector).addClass('edge_swipe_nav');
    },
    _onTouchStart: function(e){
      e.preventDefault();
      _this.startPositionX = e.originalEvent.touches[0].pageX;
    },
    _dragEdge: function(e){
      var x = e.originalEvent.touches[0].pageX;
      e.preventDefault();
      _this.diffX  = x - _this.startPositionX;

      if( Math.abs(_this.diffX) > 120 ){
        return;
      }
      if( x > 250 ){
        return;
      }
      
      $(".edge_swipe_content").css({
        "transform": "translate3d(" + x + "px,0,0)"
      });
    },
    _releaseEdge: function(e){
      e.preventDefault();
      $(".edge_swipe_content").css({
        "transform": "",
        "-webkit-transform": ""
      });
      console.log(_this.diffX);
      if( _this.diffX > 50 ){
        _this.open();
      }else if( _this.diffX < -50){
        _this.close();
      }
    },

  };

  return EdgeSwipeHandler;

});


},{}],2:[function(require,module,exports){
module.exports = (function( $ ){

  var PageSlider = function(options){

    this.container = options.container;
    this.beforeSlide = options.beforeSlide;
    this.afterSlide = options.afterSlide;
    this.currentPage = undefined;
    this.currentView = undefined;
    this.stateHistory = [];

  };

  PageSlider.prototype = {
    back : function(){
      if (this.stateHistory[this.stateHistory.length - 2] != null) {
        location.hash = this.stateHistory[this.stateHistory.length - 2];
      } else {
        location.hash = '#';
      } },

    home: function(){
      this.stateHistory = ["", ""];
      location.hash = '#';
    }, 

    overWriteLastHistoryKeyDate: function(yyyymmdd) {
      var lastIndex, lastState;
      lastIndex = this.stateHistory.length - 1;
      lastState = this.stateHistory[lastIndex];
      return this.stateHistory[lastIndex] = lastState.replace(/\d{8}/, yyyymmdd);
    },

    overWriteLastHistory : function(locationHash) {
      var lastIndex;
      lastIndex = this.stateHistory.length - 1;
      return this.stateHistory[lastIndex] = locationHash;
    },

    slidePage : function(renderedView) {
      var l, state;
      l = this.stateHistory.length;
      state = window.location.hash;
      if (l === 0) {
        this.stateHistory.push(state);
        this.slidePageFrom(renderedView);
        return;
      }
      if (state === this.stateHistory[l - 2]) {
        this.stateHistory.pop();
        return this.slidePageFrom(renderedView, "page-left");
      } else {
        this.stateHistory.push(state);
        return this.slidePageFrom(renderedView, "page-right");
      }
    },

    slidePageFrom : function(renderedView, from) {
      var page;
      if (this.beforeSlide) {
        this.beforeSlide();
      }
      page = renderedView.$el;
      this.container.append(page);
      if (!this.currentPage || !from) {
        page.attr("class", "page page-center");
        this.currentPage = page;
        this.currentView = renderedView;
        if (this.afterSlide) {
          this.afterSlide();
        }
        return;
      }
      page.attr("class", "page " + from);
      this.currentPage.one("webkitTransitionEnd", (function(_this) {
        return function(e) {
          $(e.target).remove();
          _this.currentView.destroy();
          _this.currentView = renderedView;
          _this.toTop();
          if (_this.afterSlide) {
            return _this.afterSlide();
          }
        };
      })(this));
      this.container[0].offsetWidth;
      page.attr("class", "page transition page-center");
      this.currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
      return this.currentPage = page;
    },

    toTop : function() {
      return setTimeout(function() {
        return window.scrollTo(0, 0);
      }, 100);
    },


  };

  return PageSlider;

});




},{}],3:[function(require,module,exports){
// application
require('./example/main');

},{"./example/main":8}],4:[function(require,module,exports){
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

},{"../../../lib/components/pageslider/pageslider":2,"./header/header_model.js":5,"./main_layout.js":10,"./notification/notification_router.js":20,"./qrcode/qr_router.js":23,"./router":24,"backbone":"5kFNoY","jquery":"HlZQrA"}],5:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function(){
  var HeaderModel = Backbone.Model.extend({
    defaults: {
      title: "Applican Sample",
      showBackButton: true,
    },
    applyViewHeaderConf: function( headerConf ){
      if( !headerConf ) return;
      this.set( headerConf );
    },
  });

  return HeaderModel;


})();

},{"backbone":"5kFNoY"}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="RELATIVE-WRAPPER HEADER-INNER-WRAPPER">\n  <div class="HEADER-LEFT">\n    <span class="back-button BACK-BUTTON">Back</span>\n  </div>\n  <div class="HEADER-RIGHT">\n  </div>\n  <span class="title"></span>\n</div>\n';
}
return __p;
};

},{}],7:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
  var HeaderView = Backbone.Marionette.ItemView.extend({
    template: require('./header_view.html'),
    ui: {
      "title" : ".title",
      "back" : ".back-button",
    },
    events: {
      "click @ui.back" : "_doBack"
    },
    initialize: function( options ){
      this.headerModel = options.headerModel;
      this.listenTo( this.headerModel, 'change', this.refresh );
    },
    onRender: function(){
      this.refresh();
    },
    refresh: function(){
      this.ui.title.html( this.headerModel.get("title") );
      if( this.headerModel.get( 'showBackButton' ) ){
        this.ui.back.removeClass( 'hide' );
      }else{
        this.ui.back.addClass( 'hide' );
      }
    },
    _doBack: function(){
      App.pageSlider.back();
    }

  });
  return HeaderView;
})();

},{"./header_view.html":6,"backbone":"5kFNoY"}],8:[function(require,module,exports){
window.App = {};

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  
  App = require('./app.js');
  App.start();


  var EdgeSwipeHandler = require('../../../lib/components/edge_swipe/edge_swipe.js')( require('jquery') );
  var edgeSwipeHandler = new EdgeSwipeHandler({
    edgeSwipeMasterTarget: "#edge-swipe-container",
    mainContentSelector: ["#master-container",".app-header"],
    verticalNavSelector: "#vertical-nav"
  });


};


},{"../../../lib/components/edge_swipe/edge_swipe.js":1,"./app.js":4,"jquery":"HlZQrA"}],9:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header class="APP-HEADER app-header">\n</header>\n<div id="master-container-wrapper">\n  <div id="master-container">\n  </div>\n</div>\n<footer></footer>\n';
}
return __p;
};

},{}],10:[function(require,module,exports){
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

},{"./header/header_view":7,"./main_layout.html":9,"backbone":"5kFNoY"}],11:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="page1 BACKBONE-PAGE">\n  <ul class="A-NAVS" id="main-nav-region">\n    <li>\n      <a href="#qr_reader">\n        <div class="LINKBOX">QR</div>\n      </a>\n    </li>\n    <li>\n      <a href="#notification">\n        <div class="LINKBOX">Notification</div>\n      </a>\n    </li>\n    <li>\n      <a href="index.html?launch_webview=yes">\n        <div class="LINKBOX">open new webview</div>\n      </a>\n    </li>\n  </ul>\n</div>\n';
}
return __p;
};

},{}],12:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
module.exports = (function () {
  var MainNavCollection = Backbone.Collection.extend({
    model: MainNavModel
  });

  return MainNavCollection;

})();

},{"./main_nav_model.js":16,"backbone":"5kFNoY"}],13:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavItemView = require('./main_nav_item_view.js');
module.exports = (function () {
  var MainNavCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: MainNavItemView
  });

  return MainNavCollectionView;

})();

},{"./main_nav_item_view.js":15,"backbone":"5kFNoY"}],14:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=( href ))==null?'':__t)+
'">\n<div class="LINKBOX">'+
((__t=( text ))==null?'':__t)+
'</div>\n</a>\n';
}
return __p;
};

},{}],15:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
  var MainNavItemView = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    template: require('./main_nav_item_view.html'),
  });

  return MainNavItemView;

})();

},{"./main_nav_item_view.html":14,"backbone":"5kFNoY"}],16:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
  var MainNavModel = Backbone.Model.extend({
  });

  return MainNavModel;
})();

},{"backbone":"5kFNoY"}],17:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavCollectionView = require('./main_nav_collection_view.js');

module.exports = (function () {
  var MainNavView = Backbone.Marionette.LayoutView.extend({
    template: require('./main_nav.html'),
    headerConf: {
      title: "Applican Sample",
      showBackButton: false,
    },
    regions: {
      "navRegion": "#main-nav-region"
    },
    initialize: function(options){
      this.navCollection = options.navCollection;
    },
    onRender: function(){

      var collectionView = new MainNavCollectionView({ collection: this.navCollection });
      this.navRegion.show( collectionView );

    },
  });

  return MainNavView;
})();

},{"./main_nav.html":11,"./main_nav_collection_view.js":13,"backbone":"5kFNoY"}],18:[function(require,module,exports){
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

},{"./notification_main.html":19,"backbone":"5kFNoY"}],19:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="#NOTIFICATION" class="BACKBONE-PAGE">\n<button type="button" class="vibration-btn">vibration</button>\n<button type="button" class="beep-btn">beep</button>\n</div>\n';
}
return __p;
};

},{}],20:[function(require,module,exports){
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

},{"./Notification_main_view":18,"backbone":"5kFNoY"}],21:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="#QR_READER" class="BACKBONE-PAGE">\n\n<button type="button" class="qrButton">QRコードを読み込む</button>\n<span class="display"></span>\n\n</div>\n';
}
return __p;
};

},{}],22:[function(require,module,exports){
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

},{"./qr_main.html":21,"backbone":"5kFNoY"}],23:[function(require,module,exports){
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

},{"./qr_main_view":22,"backbone":"5kFNoY"}],24:[function(require,module,exports){
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

},{"./main_nav/main_nav_collection.js":12,"./main_nav/main_nav_view":17,"backbone":"5kFNoY"}]},{},[3]);