var EventEmitter = require("events").EventEmitter;
var inherits = require("util").inherits;

var Reloj = function(){
  
  var self = this;
  
  setInterval(function(){
    self.emit("segundo", new Date())
  }
  ,1000);

  setInterval(function(){
    self.emit("minuto", new Date())
  }
  ,60000);

  setInterval(function(){
    self.emit("hora", new Date())
  }
  ,360000);
}

inherits(Reloj, EventEmitter);

exports.Reloj = Reloj;