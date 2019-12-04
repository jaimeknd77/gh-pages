class EnemigoTerrestre extends Enemigo {

    constructor(x, y, vida, ataque) {
        super(imagenes.enemigo_terrestre, imagenes.enemigo_terrestre_movimiento, x, y, vida, ataque);

        this.vx = 1;
        this.vy = 1;
    }

    actualizar() {
        super.actualizar();
    }

    calcularPosJugador(jugador){
        var dx = jugador.x - this.x;
        var dy = jugador.y - this.y;

        if(dx > 0){
            this.vx = 1;
        } else if(dx < 0){
            this.vx = -1;
        } else {
            this.vx = 0;
        }

        if(dy > 0){
            this.vy = 1;
        } else if(dy < 0){
            this.vy = -1;
        } else {
            this.vy = 0;
        }
    }

}