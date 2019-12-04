class DisparoJugador extends Modelo {

    constructor(rutaImagen, x, y, vx, vy) {
        super(rutaImagen, x, y);

        this.vx = vx;
        this.vy = vy;
    }

    colisiona(modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }
}
