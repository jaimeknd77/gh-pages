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

        if(this.vx < 0){
            this.orientacion = orientaciones.izquierda;
        } else if(this.vx > 0){
            this.orientacion = orientaciones.derecha;
        } else {
            if(this.vy < 0){
                this.orientacion = orientaciones.arriba;
            } else if(this.vy > 0){
                this.orientacion = orientaciones.abajo;
            } else {
                this.orientacion = parado;
            }
        }

        switch (this.estado) {
            case estados.moviendo:
                if(this.vx != 0){
                    if(this.orientacion == orientaciones.izquierda){
                        this.animacion = this.izquierda;
                    }
                    if(this.orientacion == orientaciones.derecha){
                        this.animacion = this.derecha;
                    }
                }
                if(this.vx == 0){
                    if(this.orientacion == orientaciones.arriba){
                        this.animacion = this.arriba;
                    }
                    if(this.orientacion == orientaciones.abajo){
                        this.animacion = this.abajo;
                    }
                }
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
