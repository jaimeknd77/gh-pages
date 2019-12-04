class EnemigoAereo extends Enemigo {

    constructor (x, y, vida, ataque){
        super(imagenes.enemigo_aereo, imagenes.enemigo_aereo_movimiento, x, y, vida, ataque);
    }
}