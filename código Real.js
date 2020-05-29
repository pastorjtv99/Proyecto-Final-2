'use strict';
window.onload = function(){
    crearSuma();
    var nodoRadioSuma = document.getElementById('suma');
    var nodoTipoOperacion = document.getElementsByName('tipoOperacion');
    var btnSiguiente = document.getElementById('botonSiguiente');
    var btnComprobar = document.getElementById('botonResultado');
    
    //Aquí se ejecuta al hacer click en el botón "Comprobar"
    btnComprobar.addEventListener('click', comprobarChecked);
    
    //Evento para decidir como se actuará al hacer click en el botón "Siguiente" dependiendo de la opción que este marcada en los botones
        dependiendo de la opción que este marcada en los botones radio.
    btnSiguiente.addEventListener('click', function(){
        if(nodoRadioSuma.checked){
        crearSuma();
        } else {
        crearResta();
        }
    });


    document.addEventListener('keypress', function(codTecla){
        var foco = document.activeElement.id;
        if(codTecla.keyCode==13 & foco=='propuestaResultado'){comprobarChecked();}
        });

    // Evento que se producirá al hacer click en la opción "suma" del botón radio.
    nodoTipoOperacion[0].addEventListener('click', crearSuma);

    //  Evento que se producirá al hacer click en la opción "suma" del botón radio.

    nodoTipoOperacion[1].addEventListener('click', crearResta);
    
    /*Función que usan dos de los eventos anteriores para saber que opción está marcada en el botón radio y
        dependiendo de esto, invocar una función determinada.*/
    function comprobarChecked(){
        if(nodoRadioSuma.checked){
            comprobarResultado('suma');
        }else{
            comprobarResultado('resta');
        }
    }
}

/*Funcion que se encarga del diseño de los elementos si se cometió un error o no en la respuesta
tambien indicará el foco que debe de agarrar despues de la comprobación*/

function apariencia(hayError){
    if(hayError){
        document.getElementById('propuestaResultado').disabled = false;
        document.getElementById('propuestaResultado').focus();
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('propuestaResultado').value = '';
        document.getElementById('botonSiguiente').disabled = true;
    } else {
        document.getElementById('botonSiguiente').disabled = false;
        document.getElementById('botonSiguiente').focus();
        document.getElementById('propuestaResultado').disabled = true;	
    }
    
}

// Funcion que crea dos números aleatorios entre el 0 y el 9 que crearan la operación de suma

function crearSuma(){
    var sumando = [];
    apariencia(true);				
    sumando[0] = Math.floor(Math.random()*(9-1))+1;
    sumando[1] = Math.floor(Math.random()*(9-1))+1;
    document.getElementById('operacion').innerHTML = sumando[0] + ' + ' + sumando[1] + ' = ';
}

  /* Función que crea dos números aleatorios, el primero entre el 0 y el 9, y el segundo entre 0 y
  el número anterior, que formará la operación de resta */


function crearResta(){
    var minuendo = 0;
    var sustraendo = 0;
    apariencia(true);				
    minuendo = Math.floor(Math.random()*(10-1))+1;
    sustraendo = Math.floor(Math.random()*(minuendo-1))+1;
    document.getElementById('operacion').innerHTML = minuendo + ' - ' + sustraendo + ' = ';
}

/*Función que recibe un parámetro que contiene una cadena de texto, suma o resta,
  a partir de ese parámetro comprobará el resultado de la operación creada anteriormente,
  dependiendo de si es una resta o una suma y acabará mostrando en pantalla Incorrecto o
  'correcto' dependiendo del resultado*/

function comprobarResultado(sumaResta){
    var msgBienMal = document.getElementById('mensaje');
    var resultadoPropuesto = Number(document.getElementById('propuestaResultado').value);
    var operacionPropuesta = document.getElementById('operacion').textContent;
    if(sumaResta=='suma'){
        var resultado = Number(operacionPropuesta.slice(0,1)) + Number(operacionPropuesta.slice(4,5));
    }else{
        var resultado = Number(operacionPropuesta.slice(0,1)) - Number(operacionPropuesta.slice(4,5));
    }				
    if(resultado==resultadoPropuesto){
        msgBienMal.style.color = 'green';
        msgBienMal.innerHTML = '¡Correcto!';
        apariencia(false);				
    }else{
        msgBienMal.style.color = 'red';
        msgBienMal.innerHTML = '¡Incorrecto!';
    }
}