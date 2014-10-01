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



