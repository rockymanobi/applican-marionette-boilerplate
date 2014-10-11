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

