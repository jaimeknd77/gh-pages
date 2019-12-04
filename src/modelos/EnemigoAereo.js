class EnemigoAereo extends Enemigo {

    constructor (x, y, vida, ataque){
        super(imagenes.enemigo_aereo, imagenes.enemigo_aereo_movimiento, x, y, vida, ataque);

        this.vx = 1;
        this.vy = 1;

        this.tiempoMovimiento = 0;
    }

    actualizar() {
        super.actualizar();
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

        console.log(this.vx);
        console.log(this.vy);
    }

    disparar(jugador){
        if(this.cadencia == 0){
            this.cadencia = 60;

            var dx = (jugador.x - this.x) * 0.05;
            var dy = (jugador.y - this.y) * 0.05;

            var disparo = new DisparoEnemigo(this.x, this.y, dx, dy, this.ataque);

            if(disparo != null){
                return disparo;
            } else {
                return null;
            }
        }
    }
}