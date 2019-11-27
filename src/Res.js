var cache = [];
// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",

    movimiento_arriba : "res/movimiento_arriba.png",
    movimiento_abajo : "res/movimiento_abajo.png",

    fondo : "res/fondo.png",

    bloque_tierra : "res/bloque_tierra.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
