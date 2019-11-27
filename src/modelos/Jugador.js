class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y);

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.orientacion = orientaciones.arriba;
        this.estado = estados.moviendo;

        this.arriba = new Animacion(imagenes.movimiento_arriba, this.ancho, this.alto, 3, 9);
        this.abajo = new Animacion(imagenes.movimiento_abajo, this.ancho, this.alto, 3, 9);
        this.izquierda = new Animacion(imagenes.movimiento_izquierda, this.ancho, this.alto, 3, 9);
        this.derecha = new Animacion(imagenes.movimiento_derecha, this.ancho, this.alto, 3, 9);

        this.animacion = this.abajo;
    }

    actualizar(){
        this.animacion.actualizar();

        if(this.vy < 0){
            this.orientacion = orientaciones.arriba;
        } else if(this.vy > 0){
            this.orientacion = orientaciones.abajo;
        }
        if(this.vx < 0){
            this.orientacion = orientaciones.izquierda;
        } else if(this.vy > 0){
            this.orientacion = orientaciones.derecha;
        }

        switch (this.orientacion) {
            case orientaciones.arriba:
                this.animacion = this.arriba;
                break;
            case orientaciones.abajo:
                this.animacion = this.abajo;
                break;
            case orientaciones.izquierda:
                this.animacion = this.izquierda;
                break;
            case orientaciones.derecha:
                this.animacion = this.derecha;
                break;
        }
    }

    dibujar (){
        //contexto.drawImage(this.imagen, this.x - this.imagen.width/2, this.y - this.imagen.height/2);
        this.animacion.dibujar(this.x, this.y);
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

}
