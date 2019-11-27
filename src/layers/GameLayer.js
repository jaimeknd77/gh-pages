class GameLayer extends Layer {

    constructor() {
        super();

        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);

        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        this.bloques = [];

        this.cargarMapa("res/" + nivelActual + ".txt");
    }

    actualizar (){
        this.espacio.actualizar();

        this.jugador.actualizar();
    }

    dibujar (){
        this.fondo.dibujar();

        for(var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar();
        }

        this.jugador.dibujar();
    }


    procesarControles( ){
        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);
        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);
        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(1);
        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(-1);
        } else {
            this.jugador.moverY(0);
        }

    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            this.largoMapa = (lineas.length-1) * 32;
            console.log(this.largoMapa);
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }


    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

        // limite superior
        if ( this.jugador.y > 320 * 0.3) {
            if (this.jugador.y - this.scrollY < 320 * 0.3) {
                this.scrollY = this.jugador.y - 320 * 0.3;
            }
        }

        // limite inferior
        if ( this.jugador.y < this.largoMapa - 320 * 0.3 ) {
            if (this.jugador.y - this.scrollY > 320 * 0.7) {
                this.scrollY = this.jugador.y - 320 * 0.7;
            }
        }
    }

    calcularPulsaciones(pulsaciones){

    }

}
