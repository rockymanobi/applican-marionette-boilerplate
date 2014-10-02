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
