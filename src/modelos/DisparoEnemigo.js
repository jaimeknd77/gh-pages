class DisparoEnemigo extends Modelo {

    constructor(x, y, vx, vy, ataque) {
        super(imagenes.disparo_enemigo, x, y);

        this.vx = vx;
        this.vy = vy;

        this.ataque = ataque;

        this.animacion = new Animacion(imagenes.disparo_enemigo_movimiento, this.ancho, this.alto, 3, 4);
    }

    actualizar() {
        this.animacion.actualizar();
    }

    dibujar(scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}