class EnemigoGenerador extends Enemigo {

    constructor(x, y) {
        super(imagenes.enemigo_terrestre, imagenes.enemigo_terrestre_movimiento, x, y, 0, 0);

        this.incapacitado = false;
        this.tiempo = 60;
    }

    actualizar() {
        super.actualizar();

        console.log(this.tiempo);

        if(this.incapacitado){
            if(this.tiempo > 0){
                this.tiempo--;
            } else {
                this.incapacitado = false;
            }
        } else {
            this.tiempo = 60;
        }
    }

    generarEnemigo(){
        return new EnemigoTerrestre(this.x, this.y, 1, 1);
    }
}