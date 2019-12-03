class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.parado_abajo, x, y);

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.orientacion = orientaciones.arriba;
        this.estado = estados.moviendo;

        this.mArriba = new Animacion(imagenes.movimiento_arriba, this.ancho, this.alto, 3, 9);
        this.mAbajo = new Animacion(imagenes.movimiento_abajo, this.ancho, this.alto, 3, 9);
        this.mIzquierda = new Animacion(imagenes.movimiento_izquierda, this.ancho, this.alto, 3, 9);
        this.mDerecha = new Animacion(imagenes.movimiento_derecha, this.ancho, this.alto, 3, 9);

        this.pArriba = new Animacion(imagenes.parado_arriba, this.ancho, this.alto, 3, 1);
        this.pAbajo = new Animacion(imagenes.parado_abajo, this.ancho, this.alto, 3, 1);
        this.pIzquierda = new Animacion(imagenes.parado_izquierda, this.ancho, this.alto, 3, 1);
        this.pDerecha = new Animacion(imagenes.parado_derecha, this.ancho, this.alto, 3, 1);

        this.animacion = this.pDerecha;
    }

    actualizar(){
        this.animacion.actualizar();

        if(this.vx == 0 && this.vy == 0){
            this.estado = estados.parado;
        } else {
            this.estado = estados.moviendo;
        }

        if(this.vy < 0){
            this.orientacion = orientaciones.arriba;
        } else if(this.vy > 0){
            this.orientacion = orientaciones.abajo;
        }

        if(this.vx < 0){
            this.orientacion = orientaciones.izquierda;
        } else if(this.vx > 0){
            this.orientacion = orientaciones.derecha;
        }

        switch (this.estado) {
            case estados.moviendo:
                if(this.orientacion == orientaciones.arriba){
                    this.animacion = this.mArriba;
                } else if(this.orientacion == orientaciones.abajo){
                    this.animacion = this.mAbajo;
                } else if(this.orientacion == orientaciones.izquierda){
                    this.animacion = this.mIzquierda;
                } else {
                    this.animacion = this.mDerecha;
                }
                break;

            case estados.parado:
                if(this.orientacion == orientaciones.arriba){
                    this.animacion = this.pArriba;
                } else if(this.orientacion == orientaciones.abajo){
                    this.animacion = this.pAbajo;
                } else if(this.orientacion == orientaciones.izquierda){
                    this.animacion = this.pIzquierda;
                } else {
                    this.animacion = this.pDerecha;
                }
                break;
        }
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX,this.y - scrollY);
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

}
