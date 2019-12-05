var cache = [];
// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",

    enemigo_terrestre : "res/enemigo_terrestre.png",
    enemigo_terrestre_movimiento : "res/enemigo_terrestre_movimiento.png",

    enemigo_aereo : "res/enemigo_aereo.png",
    enemigo_aereo_movimiento : "res/enemigo_aereo_movimiento.png",

    disparo_enemigo : "res/fuego_1.png",
    disparo_enemigo_movimiento : "res/fireball.png",

    movimiento_arriba : "res/movimiento_arriba.png",
    movimiento_abajo : "res/movimiento_abajo.png",
    movimiento_izquierda : "res/movimiento_izquierda.png",
    movimiento_derecha : "res/movimiento_derecha.png",

    disparo_arriba : "res/disparo_arriba.png",
    disparo_abajo : "res/disparo_abajo.png",
    disparo_izquierda : "res/disparo_izquierda.png",
    disparo_derecha : "res/disparo_derecha.png",

    espada : "res/espada.png",
    arco : "res/arco.png",

    espada_arriba : "res/espada_arriba.png",
    espada_abajo : "res/espada_abajo.png",
    espada_izquierda : "res/espada_izquierda.png",
    espada_derecha : "res/espada_derecha.png",

    parado_arriba : "res/arriba_1.png",
    parado_abajo : "res/abajo_1.png",
    parado_izquierda : "res/izquierda_1.png",
    parado_derecha : "res/derecha_1.png",

    flecha_arriba : "res/flecha_arriba.png",
    flecha_abajo : "res/flecha_abajo.png",
    flecha_izquierda : "res/flecha_izquierda.png",
    flecha_izquierda_arriba : "res/flecha_izquierda_arriba.png",
    flecha_izquierda_abajo : "res/flecha_izquierda_abajo.png",
    flecha_derecha : "res/flecha_derecha.png",
    flecha_derecha_arriba : "res/flecha_derecha_arriba.png",
    flecha_derecha_abajo : "res/flecha_derecha_abajo.png",

    limite_arriba : "res/limite_arriba.png",
    limite_abajo : "res/limite_abajo.png",
    limite_izquierda : "res/limite_izquierda.png",
    limite_derecha : "res/limite_derecha.png",

    cueva : "res/cueva.png",

    esquina_1 : "res/esquina_1.png",
    esquina_2 : "res/esquina_2.png",
    esquina_3 : "res/esquina_3.png",
    esquina_4 : "res/esquina_4.png",

    suelo_1 : "res/suelo_1.png",
    suelo_2 : "res/suelo_2.png",
    suelo_3 : "res/suelo_3.png",

    destruible : "res/bloque_destruible.png",

    relleno : "res/relleno_1.png",

    corazon_entero : "res/corazon_entero.png",
    corazon_mitad : "res/corazon_mitad.png",

    ganar : "res/ganar.png",
    perder : "res/perder.png",
    controles : "res/controles.png",
    cambio_arma : "res/cambio_arma.png",
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
