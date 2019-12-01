class Enemigo extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y);
    }

    actualizar(){

    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}