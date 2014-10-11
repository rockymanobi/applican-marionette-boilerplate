
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

