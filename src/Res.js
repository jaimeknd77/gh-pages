var cache = [];
// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",

    movimiento_arriba : "res/movimiento_arriba.png",
    movimiento_abajo : "res/movimiento_abajo.png",
    movimiento_izquierda : "res/movimiento_izquierda.png",
    movimiento_derecha : "res/movimiento_derecha.png",

    limite_arriba : "res/limite_arriba.png",
    limite_abajo : "res/limite_abajo.png",
    limite_izquierda : "res/limite_izquierda.png",
    limite_derecha : "res/limite_derecha.png",

    suelo_1 : "res/suelo_1.png",
    suelo_2 : "res/suelo_2.png",
    suelo_3 : "res/suelo_2.png",

    relleno : "res/relleno_1.png"

    //fondo : "res/fondo.png",
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
