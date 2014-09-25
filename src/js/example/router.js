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
