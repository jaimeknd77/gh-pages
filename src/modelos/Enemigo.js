class Enemigo extends Modelo {

    constructor(rutaImagen, imagenMovimiento, x, y, vida, ataque) {
        super(rutaImagen, x, y);

        this.animacion = new Animacion(imagenMovimiento, this.ancho, this.alto, 6, 3);

        this.vx = 0;
        this.vy = 0;

        this.ataque = ataque;
        this.vida = vida;

        this.cadencia = 60;
    }

    actualizar(){
        this.animacion.actualizar();
        if(this.cadencia > 0){
            this.cadencia--;
        }
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

    atacar(jugador){
        if(this.cadencia == 0){
            jugador.vida -= this.ataque;
            this.cadencia = 60;
            console.log("Ataque");
        }
    }
}