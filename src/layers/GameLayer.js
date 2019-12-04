class GameLayer extends Layer {

    constructor() {
        super();

        this.aMapa = 480;
        this.lMapa = 320;

        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);

        this.fondo = [];

        this.bordes = [];

        this.destruibles = [];

        this.enemigos_terrestres = [];

        this.enemigos_aereos = [];

        this.disparosJugador = [];

        this.disparosEnemigos = [];

        this.cargarMapa("res/" + nivelActual + ".txt");

        this.scrollX = this.calcularXInicial();
        this.scrollY = this.calcularYInicial();

        this.vidas = [];

        this.calcularVida(this.jugador);
    }

    actualizar (){
        this.espacio.actualizar();

        if(this.enemigos_aereos.length == 0 && this.enemigos_terrestres.length == 0){
            for(var i=0; i < this.bordes.length; i++){
                if(this.bordes[i] != null && this.bordes[i].cueva && !this.bordes[i].cuevaVisitada){
                    var aux = this.bordes[i];

                    this.espacio.eliminarCuerpoEstatico(this.bordes[i]);
                    this.bordes.splice(i, 1);
                    i = i - 1;

                    var bloque = new Bloque(imagenes.cueva, aux.x, aux.y, true);
                    bloque.cuevaVisitada = true;

                    this.bordes.push(bloque);
                    this.espacio.agregarCuerpoEstatico(bloque);

                    console.log("Fin");
                }
            }


        }

        for(var i=0; i < this.enemigos_terrestres.length; i++){
            this.enemigos_terrestres[i].calcularPosJugador(this.jugador);

            this.enemigos_terrestres[i].actualizar();

            if(this.enemigos_terrestres[i].colisiona(this.jugador)){
                this.enemigos_terrestres[i].atacar(this.jugador);
                if(this.jugador.vida <= 0){
                    this.iniciar();
                }
            }
        }

        for(var i=0; i < this.enemigos_aereos.length; i++){
            this.enemigos_aereos[i].actualizar();
            var disparo = this.enemigos_aereos[i].disparar(this.jugador);
            if(disparo != null){
                this.disparosEnemigos.push(disparo);
                this.espacio.agregarCuerpoDinamico(disparo);
            }
        }

        this.calcularVida(this.jugador);

        this.jugador.actualizar();

        // Colisiones
        for(var i=0; i < this.disparosJugador.length; i++){
            for(var j=0; j < this.enemigos_terrestres.length; j++){
                if(this.disparosJugador[i] != null
                    && this.enemigos_terrestres[j] != null
                    && this.disparosJugador[i].colisiona(this.enemigos_terrestres[j])){
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;

                    this.enemigos_terrestres[j].vida -= this.jugador.ataque;
                    if(this.enemigos_terrestres[j].vida <= 0){
                        this.enemigos_terrestres.splice(j, 1);
                        j = j - 1;
                    }
                }
            }

            for(var j=0; j < this.enemigos_aereos.length; j++){
                if(this.disparosJugador[i] != null
                    && this.enemigos_aereos[j] != null
                    && this.disparosJugador[i].colisiona(this.enemigos_aereos[j])){
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;

                    this.enemigos_aereos[j].vida -= this.jugador.ataque;
                    if(this.enemigos_aereos[j].vida <= 0){
                        this.enemigos_aereos.splice(j, 1);
                        j = j - 1;
                    }
                }
            }

            for(var j=0; j < this.destruibles.length; j++){
                if(this.disparosJugador[i] != null
                    && this.destruibles[j] != null
                    && this.disparosJugador[i].colisiona(this.destruibles[j])){
                    this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;

                    this.espacio.eliminarCuerpoEstatico(this.destruibles[j]);
                    this.destruibles.splice(j, 1);
                    j = j - 1;
                }
            }

            for(var j=0; j < this.bordes.length; j++){
                if(this.disparosJugador[i] != null
                    && this.bordes[j] != null
                    && this.disparosJugador[i].colisiona(this.bordes[j])){
                    this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                }
            }
        }

        for(var i=0; i < this.disparosEnemigos.length; i++){
            this.disparosEnemigos[i].actualizar();

            if(this.disparosEnemigos[i] != null && this.jugador != null && this.disparosEnemigos[i].colisiona(this.jugador)){
                this.jugador.vida -= this.disparosEnemigos[i].ataque;

                this.disparosEnemigos.splice(i, 1);
                i = i - 1;

                if(this.jugador.vida <= 0){
                    this.iniciar();
                }
            }

            for(var j=0; j < this.bordes.length; j++){
                if(this.disparosEnemigos[i] != null
                    && this.bordes[j] != null
                    && this.disparosEnemigos[i].colisiona(this.bordes[j])){
                    this.espacio.eliminarCuerpoDinamico(this.disparosEnemigos[i]);
                    this.disparosEnemigos.splice(i, 1);
                    i = i - 1;
                }
            }

            for(var j=0; j < this.destruibles.length; j++){
                if(this.disparosEnemigos[i] != null
                    && this.destruibles[j] != null
                    && this.disparosEnemigos[i].colisiona(this.destruibles[j])){
                    this.espacio.eliminarCuerpoDinamico(this.disparosEnemigos[i]);
                    this.disparosEnemigos.splice(i, 1);
                    i = i - 1;

                    this.espacio.eliminarCuerpoEstatico(this.destruibles[j]);
                    this.destruibles.splice(j, 1);
                    j = j - 1;
                }
            }
        }

    }

    dibujar (){
        this.calcularScroll();
        for(var i=0; i < this.fondo.length; i++){
            this.fondo[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.bordes.length; i++){
            this.bordes[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.destruibles.length; i++){
            this.destruibles[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.enemigos_terrestres.length; i++){
            this.enemigos_terrestres[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.enemigos_aereos.length; i++){
            this.enemigos_aereos[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i<this.vidas.length; i++){
            this.vidas[i].dibujar();
        }

        this.jugador.dibujar(this.scrollX, this.scrollY);

        for(var i=0; i < this.disparosJugador.length; i++){
            this.disparosJugador[i].dibujar(this.scrollX, this.scrollY);
        }

        for(var i=0; i < this.disparosEnemigos.length; i++){
            this.disparosEnemigos[i].dibujar(this.scrollX, this.scrollY);
        }

    }


    procesarControles( ){
        // Disparar
        if(controles.disparo){
            var nuevoDisparo = this.jugador.disparar();

            if(nuevoDisparo != null){
                this.disparosJugador.push(nuevoDisparo);
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
            }
        }

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
                    this.cargarFondo(x, y);
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "J":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Fondo(imagenes.relleno, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.fondo.push(bloque);
                break;
            case "U":
                var bloque = new Bloque(imagenes.limite_arriba, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bordes.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "D":
                var bloque = new Bloque(imagenes.limite_abajo, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bordes.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "L":
                var bloque = new Bloque(imagenes.limite_izquierda, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bordes.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "R":
                var bloque = new Bloque(imagenes.limite_derecha, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bordes.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "*":
                var bloque = new Bloque(imagenes.destruible, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.destruibles.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "C":
                var bloque = new Bloque(imagenes.limite_arriba, x,y, true);
                bloque.y = bloque.y - bloque.alto/2;
                this.bordes.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "1":
                var bloque = new Bloque(imagenes.esquina_1, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.fondo.push(bloque);
                break;
            case "2":
                var bloque = new Bloque(imagenes.esquina_2, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.fondo.push(bloque);
                break;
            case "3":
                var bloque = new Bloque(imagenes.esquina_3, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.fondo.push(bloque);
                break;
            case "4":
                var bloque = new Bloque(imagenes.esquina_4, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.fondo.push(bloque);
                break;
            case "T":
                var enemigoTerrestre = new EnemigoTerrestre(x, y, nivelActual+1, 1);
                enemigoTerrestre.y = enemigoTerrestre.y - enemigoTerrestre.alto/2;
                this.enemigos_terrestres.push(enemigoTerrestre);
                this.espacio.agregarCuerpoDinamico(enemigoTerrestre);
                break;
            case "A":
                var enemigoAereo = new EnemigoAereo(x, y, nivelActual+1, 1);
                enemigoAereo.y = enemigoAereo.y - enemigoAereo.alto/2;
                this.enemigos_aereos.push(enemigoAereo);
                this.espacio.agregarCuerpoDinamico(enemigoAereo);
                break;
        }
    }

    cargarFondo(x, y){
        var suelo = Math.random() * (3 - 1) + 1;
        var rutaImagen;
        if(suelo < 2 && suelo >= 1){
            rutaImagen = imagenes.suelo_1;
        } else if(suelo < 3 && suelo >= 2){
            rutaImagen = imagenes.suelo_2;
        }
        this.fondo.push(new Fondo(rutaImagen, x, y));
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

    calcularVida(jugador){
        this.vidas = [];

        var xInicio = this.aMapa*0.05;
        var yInicio = this.lMapa*0.05;

        for(var i=0; i < jugador.vida/2 - 1; i++){
            var corazon = new Fondo(imagenes.corazon_entero, xInicio, yInicio);
            xInicio += 12;

            this.vidas.push(corazon);
        }

        if(jugador.vida%2 == 0){
            var corazon = new Fondo(imagenes.corazon_entero, xInicio, yInicio);

            this.vidas.push(corazon);
        } else {
            var medioCorazon = new Fondo(imagenes.corazon_mitad, xInicio, yInicio);

            this.vidas.push(medioCorazon);
        }
    }

}
