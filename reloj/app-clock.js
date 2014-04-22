var Reloj = require("./clock").Reloj;

var reloj = new Reloj();

reloj.on("segundo", function(fecha) {
  console.log("Un segundo! son las:", getFormattedTime(fecha));
  reloj.removeAllListeners("segundo");
});

reloj.on("minuto", function(fecha) {
  console.log("Un minuto! son las:", getFormattedTime(fecha));
  reloj.removeAllListeners("minuto");
});

reloj.on("hora", function(fecha) {
  console.log("Una hora! son las:", getFormattedTime(fecha));
  reloj.removeAllListeners("hora");
});

function getFormattedTime(fecha){
  return (fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds());
}