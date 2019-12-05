class EnemigoGenerador extends Enemigo {

    constructor(x, y) {
        super(imagenes.enemigo_terrestre, x, y, 0, 0);

        this.animacion = new Animacion(imagenes.enemigo_terrestre_movimiento, 26.75, 36, 6, 8);

        this.incapacitado = false;
        this.tiempo = 60;
        this.tiempoMovimiento = 0;
    }

    actualizar() {
        super.actualizar();

        if(this.incapacitado){
            this.vx = 0;
            this.vy = 0;
            if(this.tiempo > 0){
                this.tiempo--;
            } else {
                this.incapacitado = false;
            }
        } else {
            this.tiempo = 60;
        }

        if(this.tiempoMovimiento > 0){
            this.tiempoMovimiento--;
        } else {
            this.tiempoMovimiento = 60;
            this.mover();
        }
    }

    mover(){
        this.vx = Math.floor(Math.random() * (2 - (-1)) + (-1));
        this.vy = Math.floor(Math.random() * (2 - (-1)) + (-1));
    }

    generarEnemigo(){
        return new EnemigoTerrestre(this.x, this.y, 1, 1);
    }
}