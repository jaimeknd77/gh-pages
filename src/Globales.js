var pulsaciones = []; // actuales registradas

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var nivelActual = 0;
var nivelMaximo = 4;

var estados = {};
estados.moviendo= 1;
estados.parado = 2;

var orientaciones = {};
orientaciones.arriba = 1;
orientaciones.abajo = 2;
orientaciones.izquierda = 3;
orientaciones.derecha = 4;