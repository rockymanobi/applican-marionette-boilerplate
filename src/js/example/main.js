window.App = {};

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  
  App = require('./app.js');
  App.start();


};

