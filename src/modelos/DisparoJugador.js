class DisparoJugador extends Modelo {

    constructor(x, y, jugador) {
        super(imagenes.flecha_izquierda, x, y);

        this.vx = jugador.vx * 3;
        this.vy = jugador.vy * 3;
        if(this.vx == 0 && this.vy == 0){
            switch(jugador.orientacion){
                case orientaciones.izquierda:
                    this.vx = -5;
                    break;
                case orientaciones.derecha:
                    this.vx = 5;
                    break;
                case orientaciones.arriba:
                    this.vy = -5;
                    break;
                case orientaciones.abajo:
                    this.vy = 5;
                    break;
            }
        }

        //this.imagen = this.calcularDireccion(this.vx, this.vy);
    }

    calcularDireccion(vx, vy){
        if(vx > 0){
            if(vy > 0){
                return imagenes.flecha_derecha_abajo;
            } else if(vy < 0){
                return imagenes.flecha_derecha_arriba;
            } else {
                return imagenes.flecha_derecha;
            }
        } else if(vx < 0){
            if(vy > 0){
                return imagenes.flecha_izquierda_abajo;
            } else if(vy < 0){
                return imagenes.flecha_izquierda_arriba;
            } else {
                return imagenes.flecha_izquierda;
            }
        } else {
            if(vy > 0){
                return imagenes.flecha_abajo;
            } else if(vy < 0){
                return imagenes.flecha_arriba;
            }
        }
    }
}
