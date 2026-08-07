// ==================================
// DATOS DEL PEDIDO
// ==================================

const pedido = {

    tipo: "",

    tamano: "",

    hoja: "",

    impresion: "",

    copias: 1,

    comentarios: ""

};


// ==================================
// VARIABLES GLOBALES
// ==================================

let tipoSeleccionado = "";

let copias = 1;

let archivosSeleccionados = [];

let pedidoEnviado = false;


// ==================================
// URL GOOGLE APPS SCRIPT
// ==================================

const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbxqrxZUvrYaVOZhAQVc5zBDCDLk8dxKbNyA10ERolqVbEJcoZSvPFq8-LFV4N3CZEYL/exec";




// ==================================
// SELECCIONAR TIPO
// ==================================

function seleccionarTipo(tipo){


    document
    .getElementById("btn-imagen")
    .classList.remove("tipo-seleccionado");


    document
    .getElementById("btn-word")
    .classList.remove("tipo-seleccionado");


    document
    .getElementById("btn-pdf")
    .classList.remove("tipo-seleccionado");



    if(tipo === "imagen"){

        document
        .getElementById("btn-imagen")
        .classList.add("tipo-seleccionado");

    }


    if(tipo === "word"){

        document
        .getElementById("btn-word")
        .classList.add("tipo-seleccionado");

    }


    if(tipo === "pdf"){

        document
        .getElementById("btn-pdf")
        .classList.add("tipo-seleccionado");

    }



    tipoSeleccionado = tipo;

    pedido.tipo = tipo;



    if(tipo === "imagen"){

    animarImportante();

    }



    // Reiniciar configuración

    pedido.tamano = "";

    pedido.hoja = "";

    pedido.impresion = "";

    pedido.copias = 1;


    copias = 1;



    // Limpiar archivos anteriores

    archivosSeleccionados = [];

    mostrarArchivos();



    mostrarConfiguracion(tipo);


}





// ==================================
// MOSTRAR CONFIGURACIÓN
// ==================================

function mostrarConfiguracion(tipo){


    const configuracion =
    document.getElementById("configuracion");


    const opciones =
    document.getElementById("opciones");



    configuracion.classList.remove("oculto");


    opciones.innerHTML = "";



    if(tipo === "imagen"){


        opciones.innerHTML = `


        <div class="opcion">

        <h3>📷 Tamaño de imagen</h3>


        <button onclick="seleccionarOpcion(this)">
        5 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        6 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        7 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        8 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        9 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        10 cm
        </button>


        <button onclick="seleccionarOpcion(this)">
        Personalizado
        </button>


        </div>



        <div class="opcion">

        <h3>🎨 Tipo de impresión</h3>


        <button onclick="seleccionarOpcion(this)">
        ⚫ Blanco y negro
        </button>


        <button onclick="seleccionarOpcion(this)">
        🌈 Color
        </button>


        </div>


        `;


    }else{


        opciones.innerHTML = `


        <div class="opcion">

        <h3>📄 Tamaño de hoja</h3>


        <button onclick="seleccionarOpcion(this)">
        Carta
        </button>


        <button onclick="seleccionarOpcion(this)">
        Oficio
        </button>


        </div>



        <div class="opcion">

        <h3>🎨 Tipo de impresión</h3>


        <button onclick="seleccionarOpcion(this)">
        ⚫ Blanco y negro
        </button>


        <button onclick="seleccionarOpcion(this)">
        🌈 Color
        </button>


        </div>



        <div class="opcion">

        <h3>📑 Cantidad de copias</h3>


        <button onclick="cambiarCopias(-1)">
        -
        </button>


        <span id="numeroCopias">
        1
        </span>


        <button onclick="cambiarCopias(1)">
        +
        </button>


        </div>


        `;


    }


}

// ==================================
// SELECCIONAR OPCIONES
// ==================================

function seleccionarOpcion(boton){


    const grupo =
    boton.parentElement;



    const botones =
    grupo.querySelectorAll("button");



    botones.forEach(btn=>{

        btn.classList.remove(
            "opcion-seleccionada"
        );

    });



    boton.classList.add(
        "opcion-seleccionada"
    );



    const titulo =
    grupo.querySelector("h3").textContent;



    const valor =
    boton.textContent.trim();




    if(titulo.includes("Tamaño de imagen")){


        if(valor === "Personalizado"){

            abrirModalTamano(boton);

            return;

        }


        pedido.tamano = valor;


    }



    else if(titulo.includes("Tamaño de hoja")){


        pedido.hoja = valor;


    }



    else if(titulo.includes("Tipo de impresión")){


        pedido.impresion = valor;


    }


}




// ==================================
// CAMBIAR COPIAS
// ==================================

function cambiarCopias(valor){


    copias += valor;



    if(copias < 1){

        copias = 1;

    }



    const numero =
    document.getElementById("numeroCopias");



    if(numero){

        numero.innerHTML = copias;

    }



    pedido.copias = copias;


}





// ==================================
// MANEJO DE ARCHIVOS
// ==================================

const inputArchivos =
document.getElementById("archivos");



if(inputArchivos){


inputArchivos.addEventListener(
"change",
function(event){



    const nuevosArchivos =
    Array.from(event.target.files);



    nuevosArchivos.forEach(
    function(archivo){


        if(validarArchivo(archivo)){


            archivosSeleccionados.push(
                archivo
            );


        }


    });



    mostrarArchivos();



    // permite volver a seleccionar
    // el mismo archivo después de eliminarlo

    inputArchivos.value = "";



});


}




// ==================================
// VALIDAR ARCHIVOS
// ==================================

function validarArchivo(archivo){


    const extension =
    archivo.name
    .split(".")
    .pop()
    .toLowerCase();




    if(tipoSeleccionado === "imagen"){


        const permitidos = [

            "jpg",
            "jpeg",
            "png",
            "webp"

        ];



        if(permitidos.includes(extension)){

            return true;

        }



        alert(
        "⚠️ En imágenes solo puedes subir JPG, JPEG, PNG o WEBP."
        );


        return false;


    }





    if(tipoSeleccionado === "word"){


        const permitidos = [

            "doc",
            "docx"

        ];



        if(permitidos.includes(extension)){

            return true;

        }



        alert(
        "⚠️ En Word solo puedes subir DOC o DOCX."
        );


        return false;


    }





    if(tipoSeleccionado === "pdf"){


        if(extension === "pdf"){

            return true;

        }



        alert(
        "⚠️ En PDF solo puedes subir archivos PDF."
        );


        return false;


    }



    return false;


}





// ==================================
// MOSTRAR ARCHIVOS
// ==================================

function mostrarArchivos(){


    const lista =
    document.getElementById("listaArchivos");



    const cantidad =
    document.getElementById("cantidadArchivos");



    const peso =
    document.getElementById("pesoArchivos");



    if(!lista) return;



    lista.innerHTML = "";



    let pesoTotal = 0;




    archivosSeleccionados.forEach(
    function(archivo, indice){



        pesoTotal += archivo.size;



        const div =
        document.createElement("div");



        div.classList.add(
            "archivo"
        );



        div.innerHTML = `


          <span class="nombreArchivo">
        📎 ${archivo.name}
        </span>



        <button
        class="eliminar"
        onclick="eliminarArchivo(${indice})">


        <i class="fa-solid fa-trash"></i>


        </button>


        `;



        lista.appendChild(div);



    });





    if(cantidad){


        cantidad.innerHTML =
        archivosSeleccionados.length;


    }





    if(peso){


        if(pesoTotal >= 1024 * 1024){


            peso.innerHTML =
            "Peso total: " +
            (pesoTotal / (1024*1024))
            .toFixed(2)
            +
            " MB";



        }else{


            peso.innerHTML =
            "Peso total: " +
            (pesoTotal / 1024)
            .toFixed(2)
            +
            " KB";


        }


    }


}




// ==================================
// ELIMINAR ARCHIVO
// ==================================

function eliminarArchivo(indice){


    archivosSeleccionados.splice(
        indice,
        1
    );


    mostrarArchivos();


}

// ==================================
// ENVIAR PEDIDO
// ==================================

function enviarPedido(){



    if(pedidoEnviado){


        const confirmar =
        confirm(
        "⚠️ Este pedido ya fue enviado.\n\n¿Deseas realizar otro envío?"
        );



        if(!confirmar){

            return;

        }


    }





    const mensaje =
    document.getElementById("mensajeError");



    mensaje.classList.add("oculto");

    mensaje.textContent = "";







    // VALIDAR TIPO

    if(pedido.tipo === ""){


        mostrarError(
        "⚠️ Selecciona qué deseas imprimir."
        );


        return;

    }







    // VALIDAR TAMAÑO IMAGEN

    if(
        pedido.tipo === "imagen" &&
        pedido.tamano === ""
    ){


        mostrarError(
        "⚠️ Selecciona el tamaño de imagen."
        );


        return;

    }








    // VALIDAR HOJA WORD/PDF

    if(
        (pedido.tipo === "word" ||
         pedido.tipo === "pdf")
         &&
         pedido.hoja === ""
    ){


        mostrarError(
        "⚠️ Selecciona tamaño de hoja."
        );


        return;

    }







    // VALIDAR IMPRESIÓN

    if(pedido.impresion === ""){


        mostrarError(
        "⚠️ Selecciona el tipo de impresión."
        );


        return;

    }








    // VALIDAR ARCHIVOS

    if(
        archivosSeleccionados.length === 0
    ){


        mostrarError(
        "⚠️ Selecciona al menos un archivo."
        );


        return;

    }


// VALIDAR COMENTARIOS

const comentarios =
document.getElementById("comentarios").value.trim();

if(comentarios === ""){

    mostrarError(
    "⚠️ Agrega un comentario o especificación adicional antes de enviar."
    );

    return;

}




// Todo correcto

const boton =
document.getElementById("btnEnviar");


boton.disabled = true;


boton.innerHTML =
"⏳ Enviando pedido...";


enviarAGoogle()

.then(()=>{


    pedidoEnviado = true;


    setTimeout(()=>{


        const nuevoPedido =
        confirm(
        "✅ Pedido enviado a la Tienda San Roque.\n\n¿Deseas realizar otro pedido?"
        );


        if(nuevoPedido){

            limpiarFormulario();

        }


    },500);



})


.catch(error=>{


    console.error(
        error
    );


    alert(
    "❌ Error enviando pedido."
    );


})


.finally(()=>{


    boton.disabled = false;


    boton.innerHTML =
    "📤 ENVIAR PEDIDO";


});


}







// ==================================
// MOSTRAR ERROR
// ==================================

function mostrarError(texto){


    const mensaje =
    document.getElementById("mensajeError");


    if(!mensaje) return;



    mensaje.textContent = texto;


    mensaje.classList.remove(
        "oculto"
    );


    mensaje.classList.add(
        "mensajeFlotante"
    );



    // Ocultar después de unos segundos

    setTimeout(()=>{


        mensaje.classList.add(
            "oculto"
        );


        mensaje.classList.remove(
            "mensajeFlotante"
        );


    },3000);



}

// ==================================
// LIMPIAR FORMULARIO
// ==================================

function limpiarFormulario(){


    pedido.tipo = "";

    pedido.tamano = "";

    pedido.hoja = "";

    pedido.impresion = "";

    pedido.copias = 1;

    pedido.comentarios = "";


    tipoSeleccionado = "";

    copias = 1;

    const numeroCopias =
    document.getElementById("numeroCopias");

    if(numeroCopias){

    numeroCopias.innerHTML = 1;

    }

    pedidoEnviado = false;


    archivosSeleccionados = [];

    mostrarArchivos();



    const configuracion =
    document.getElementById("configuracion");


    if(configuracion){

        configuracion.classList.add(
            "oculto"
        );

    }



    const botones = [

        "btn-imagen",

        "btn-word",

        "btn-pdf"

    ];



    botones.forEach(id=>{


        const boton =
        document.getElementById(id);


        if(boton){

            boton.classList.remove(
                "tipo-seleccionado"
            );

        }


    });



    const comentarios =
    document.getElementById(
        "comentarios"
    );


    if(comentarios){

        comentarios.value = "";

    }



    const error =
    document.getElementById(
        "mensajeError"
    );


    if(error){

        error.classList.add(
            "oculto"
        );

        error.textContent = "";

    }



}



// ==================================
// ENVÍO A GOOGLE APPS SCRIPT
// ==================================

async function enviarAGoogle(){


    mostrarProgreso(
        "Validando datos...",
        10
    );


    bloquearPantalla();



    try{


        pedido.comentarios =
        document.getElementById(
            "comentarios"
        ).value;



        const archivosBase64 = [];



        const total =
        archivosSeleccionados.length;



        let contador = 0;



        for(
            const archivo of archivosSeleccionados
        ){


            contador++;



            const porcentaje =
            20 +
            Math.round(
                (contador / total) * 20
            );



            mostrarProgreso(
                "Preparando archivo " +
                contador +
                " de " +
                total,
                porcentaje
            );



            const base64 =
            await convertirBase64(
                archivo
            );



            archivosBase64.push({

                nombre:
                archivo.name,

                tipo:
                archivo.type,

                archivo:
                base64

            });



        }



        const datosEnviar = {


            ...pedido,


            archivos:
            archivosBase64


        };



        console.log(
            "Datos enviados:",
            datosEnviar
        );



        mostrarProgreso(
            "Enviando pedido...",
            45
        );



        await fetch(

            URL_APPS_SCRIPT,

            {

                method:"POST",

                mode:"no-cors",

                headers:{


                    "Content-Type":
                    "text/plain"


                },


                body:
                JSON.stringify(
                    datosEnviar
                )

            }

        );



        mostrarProgreso(
            "Pedido recibido...",
            80
        );



        await esperar(700);



        mostrarProgreso(
            "Finalizando...",
            95
        );



        await esperar(700);



        mostrarProgreso(
            "Pedido enviado correctamente",
            100
        );



        await esperar(1200);



        ocultarProgreso();



    }

    catch(error){


        console.error(
            error
        );


        ocultarProgreso();


        throw error;


    }


    finally{


        desbloquearPantalla();


    }


}





function esperar(tiempo){


    return new Promise(resolve=>{


        setTimeout(
            resolve,
            tiempo
        );


    });


}

// ==================================
// MOSTRAR PROGRESO
// ==================================

function mostrarProgreso(
texto,
porcentaje
){


    const contenedor =
    document.getElementById(
        "progresoEnvio"
    );


    const barra =
    document.getElementById(
        "barraProgreso"
    );


    const mensaje =
    document.getElementById(
        "textoProgreso"
    );


    const numero =
    document.getElementById(
        "porcentajeProgreso"
    );



    if(!contenedor){

        console.warn(
            "No existe progresoEnvio"
        );

        return;

    }



    contenedor.classList.remove(
        "progresoOculto"
    );



    if(mensaje){

        mensaje.textContent =
        texto;

    }



    if(barra){

        barra.style.width =
        porcentaje + "%";

    }



    if(numero){

        numero.textContent =
        porcentaje + "%";

    }



}





// ==================================
// OCULTAR PROGRESO
// ==================================

function ocultarProgreso(){


    const contenedor =
    document.getElementById(
        "progresoEnvio"
    );



    if(contenedor){


        contenedor.classList.add(
            "progresoOculto"
        );


    }



    const barra =
    document.getElementById(
        "barraProgreso"
    );



    if(barra){

        barra.style.width =
        "0%";

    }



    const numero =
    document.getElementById(
        "porcentajeProgreso"
    );



    if(numero){

        numero.textContent =
        "0%";

    }


}



// ==================================
// CONVERTIR ARCHIVO A BASE64
// ==================================

function convertirBase64(archivo){


    return new Promise(
    (resolve,reject)=>{


        const lector =
        new FileReader();



        lector.onload = ()=>{


            resolve(
                lector.result
            );


        };



        lector.onerror =
        error=>{


            reject(error);


        };



        lector.readAsDataURL(
            archivo
        );


    });


}





// ==================================
// MODAL TAMAÑO PERSONALIZADO
// ==================================

let botonPersonalizado = null;



function abrirModalTamano(boton){


    botonPersonalizado =
    boton;



    const modal =
    document.getElementById(
        "modalTamano"
    );



    if(modal){

        modal.style.display =
        "flex";

    }



    const input =
    document.getElementById(
        "inputTamano"
    );



    if(input){

        input.value = "";

    }


}




function cerrarModalTamano(){


    const modal =
    document.getElementById(
        "modalTamano"
    );



    if(modal){

        modal.style.display =
        "none";

    }


}




function guardarTamanoPersonalizado(){


    const input =
    document.getElementById(
        "inputTamano"
    );



    const valor =
    input.value;



    if(valor === ""){


        alert(
        "Ingrese un tamaño."
        );


        return;


    }



    pedido.tamano =
    valor + " cm";



    if(botonPersonalizado){


        botonPersonalizado.innerHTML =
        "✔ " + valor + " cm";


    }



    cerrarModalTamano();


}





// ==================================
// BLOQUEAR PANTALLA
// ==================================

function bloquearPantalla(){


    const bloqueo =
    document.getElementById(
        "bloqueoPantalla"
    );



    if(bloqueo){


        bloqueo.style.display =
        "block";


    }


}





function desbloquearPantalla(){


    const bloqueo =
    document.getElementById(
        "bloqueoPantalla"
    );



    if(bloqueo){


        bloqueo.style.display =
        "none";


    }


}





// ==================================
// ANIMACIÓN BLOQUE IMPORTANTE
// ==================================

function animarImportante(){


    const bloque =
    document.getElementById(
        "bloqueImportante"
    );



    if(!bloque){

        return;

    }



    bloque.classList.remove(
        "efectoImportante"
    );



    void bloque.offsetWidth;



    bloque.classList.add(
        "efectoImportante"
    );


}