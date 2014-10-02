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
