class GameLayer extends Layer {

    constructor() {
        super();

        this.aMapa = 256;
        this.lMapa = 240;

        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);

        //this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        this.fondo = [];

        this.bloques = [];

        this.cargarMapa("res/" + nivelActual + ".txt");

        this.scrollX = this.calcularXInicial();
        this.scrollY = this.calcularYInicial();
    }

    actualizar (){
        this.espacio.actualizar();

        this.jugador.actualizar();
    }

    dibujar (){
        this.calcularScroll();
        for(var i=0; i < this.fondo.length; i++){
            this.fondo[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }

        this.jugador.dibujar(this.scrollX, this.scrollY);
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
            this.anchoMapa = (lineas[0].length-1) * 16;
            this.largoMapa = (lineas.length-1) * 16;
            console.log(this.largoMapa);
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 16/2 + j * 16; // x central
                    var y = 16 + i * 16; // y de abajo
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
                var bloque = new Bloque(imagenes.relleno, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "U":
                var bloque = new Bloque(imagenes.limite_arriba, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "D":
                var bloque = new Bloque(imagenes.limite_abajo, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "L":
                var bloque = new Bloque(imagenes.limite_izquierda, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "R":
                var bloque = new Bloque(imagenes.limite_derecha, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    cargarFondo(x, y){
        var suelo = Math.random() * (3 - 1) + 1;
        var rutaImagen;
        switch (suelo) {
            case 1:
                rutaImagen = imagenes.suelo_1;
            case 2:
                rutaImagen = imagenes.suelo_2;
            case 3:
                rutaImagen = imagenes.suelo_3;
        }
        var f = new Fondo(rutaImagen, x, y);
        this.fondo.push(f);
    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > this.aMapa * 0.3) {
            if (this.jugador.x - this.scrollX < this.aMapa * 0.3) {
                this.scrollX = this.jugador.x - this.aMapa * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - this.aMapa * 0.3 ) {
            if (this.jugador.x - this.scrollX > this.aMapa * 0.7) {
                this.scrollX = this.jugador.x - this.aMapa * 0.7;
            }
        }

        // limite superior
        if ( this.jugador.y > this.lMapa * 0.3) {
            if (this.jugador.y - this.scrollY < this.lMapa * 0.3) {
                this.scrollY = this.jugador.y - this.lMapa * 0.3;
            }
        }

        // limite inferior
        if ( this.jugador.y < this.largoMapa - this.lMapa * 0.3 ) {
            if (this.jugador.y - this.scrollY > this.lMapa * 0.7) {
                this.scrollY = this.jugador.y - this.lMapa * 0.7;
            }
        }
    }

    calcularPulsaciones(pulsaciones){

    }

    calcularXInicial(){
        return this.jugador.x - this.aMapa/2;
    }

    calcularYInicial(){
        return this.jugador.y - this.lMapa/2;
    }
}
