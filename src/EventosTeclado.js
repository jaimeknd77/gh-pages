var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 13:
                controles.continuar = true;
                break;
            case 87:
                controles.moverY = -1;
                break;
            case 83:
                controles.moverY = 1;
                break;
            case 68:
                controles.moverX = 1;
                break;
            case 65:
                controles.moverX = -1;
                break;
            case 69:
                controles.dormir = true;
                break;
            case 49:
                controles.espada = false;
                break;
            case 50:
                controles.espada = true;
                break;

            case 37:
                controles.disparo = true;
                controles.dispararX = -1;
                break;
            case 39:
                controles.disparo = true;
                controles.dispararX = 1;
                break;
            case 38:
                controles.disparo = true;
                controles.dispararY = -1;
                break;
            case 40:
                controles.disparo = true;
                controles.dispararY = 1;
                break;

        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 13:
            controles.continuar = false;
            break;
        case 87:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 83:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 68:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 65:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case 69:
            if(controles.dormir){
            controles.dormir = false;
            }

        case 37:
            if(controles.dispararX == -1){
                controles.disparo = false;
                controles.dispararX = 0;
            }
        case 39:
            if(controles.dispararX == 1){
                controles.disparo = false;
                controles.dispararX = 0;
            }
        case 38:
            if(controles.dispararY == -1){
                controles.disparo = false;
                controles.dispararY = 0;
            }
        case 40:
            if(controles.dispararY == 1){
                controles.disparo = false;
                controles.dispararY = 0;
            }

    }

}
