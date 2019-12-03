class Enemigo extends Modelo {

    constructor(rutaImagen, imagenMovimiento, x, y) {
        super(rutaImagen, x, y);

        this.animacion = new Animacion(imagenMovimiento, this.ancho, this.alto, 6, 3);

        this.vx = 0;
        this.vy = 0;
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}