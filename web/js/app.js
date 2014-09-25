(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
          _this.renderNotice();
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

    renderNotice : function() {
      //return noticeManager.showNotice();
    },

    toTop : function() {
      return setTimeout(function() {
        return window.scrollTo(0, 0);
      }, 100);
    },

    clearTimerActions : function() {
      return $.each(window.VIP.TimerActions, function(key, timer) {
        return clearInterval(timer);
      });
    }


  };

  return PageSlider;

});




},{}],2:[function(require,module,exports){
// application
require('./example/main');


},{"./example/main":3}],3:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

module.exports = (function(){

  $(document).ready(function(){

    var pageSlider = new PageSlider({
      container: $('#master-container')
    });

    var Router = require('./router')(pageSlider);
    var router = new Router();
    Backbone.history.start();

  });

})();

},{"../../../lib/components/pageslider/pageslider":1,"./router":8,"backbone":"5kFNoY","jquery":"HlZQrA"}],4:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="page1">\n  page1\n</div>\n';
}
return __p;
};

},{}],5:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
  var Page1View = Backbone.Marionette.ItemView.extend({
    template: require('./page1_tpl.html'),
  });

  return Page1View;
})();

},{"./page1_tpl.html":4,"backbone":"5kFNoY"}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="page2">\npage2\n</div>\n';
}
return __p;
};

},{}],7:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
  var Page2View = Backbone.Marionette.ItemView.extend({
    className: "page2",
    template: require('./page2_tpl.html'),
  })
  return Page2View;
})();

},{"./page2_tpl.html":6,"backbone":"5kFNoY"}],8:[function(require,module,exports){
var Page1View = require('./page1_view');
var Page2View = require('./page2_view');
var Backbone = require('backbone');

module.exports = (function( pageSlider ){

  var Router = Backbone.Router.extend({

    routes:{
      "" : "show",
      "page1" : "showPage1",
      "page2" : "showPage2",
    },

    show: function(){
      alert("ababa");
    },
    showPage1: function(){
      var page1View = new Page1View();
      page1View.render();
      pageSlider.slidePage( page1View );
    },
    showPage2: function(){
      var page2View = new Page2View();
      page2View.render();
      pageSlider.slidePage( page2View );
    },
  });

  return Router;


});

},{"./page1_view":5,"./page2_view":7,"backbone":"5kFNoY"}]},{},[2]);