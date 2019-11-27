class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y);

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.orientacion = orientaciones.arriba;
        this.estado = estados.moviendo;

        this.arriba = new Animacion(imagenes.movimiento_arriba, this.ancho, this.alto, 3, 9);
        this.abajo = new Animacion(imagenes.movimiento_abajo, this.ancho, this.alto, 3, 9);

        this.animacion = this.abajo;
    }

    actualizar(){
        this.animacion.actualizar();

        if(this.vy < 0){
            this.orientacion = orientaciones.arriba;
        } else if(this.vy > 0){
            this.orientacion = orientaciones.abajo;
        }

        switch (this.orientacion) {
            case orientaciones.arriba:
                this.animacion = this.arriba;
                break;
            case orientaciones.abajo:
                this.animacion = this.abajo;
                break;
        }
    }

    dibujar (){
        //contexto.drawImage(this.imagen, this.x - this.imagen.width/2, this.y - this.imagen.height/2);
        this.animacion.dibujar(this.x, this.y);
    }

    moverX (direccion){
        this.vx = direccion;
    }

    moverY (direccion){
        this.vy = direccion;
    }

}
