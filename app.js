
var urlGeneral = "https://api.thecatapi.com/v1/images/search?limit=8&order=Desc";
var apiKey = "a678b829-da4f-4006-9bbf-5b0e250258e4";
var urlCategorias = "https://my-json-server.typicode.com/Guillermogarcia01/apigatos/Categorias";
var botonBuscar = document.getElementById("submit");
const categoria = document.getElementById("desplegable");
var numPaginas;
var iniciado = false;
var categoriaSeleccionada;
var pagina = 0;

crearCategorias();

botonBuscar.addEventListener("click", (evento)=>{
    pagina = 0;
    categoriaSeleccionada = categoria.value;
    let url = urlGeneral + "&page="+ pagina+"&category_ids=" +categoria.value;

    if(iniciado)
        borrarPaginadorYbusqueda();

    buscarGatos(url);

});

function paginaSiguiente(){
    if(pagina != numPaginas)
        pagina++;
    
    let url = urlGeneral + "&page="+ pagina+"&category_ids=" + categoriaSeleccionada;
    borrarPaginadorYbusqueda();
    buscarGatos(url);
    
}

function paginaAnterior(){
    if(pagina != 0)
        pagina--;

    let url = urlGeneral + "&page="+ pagina+"&category_ids=" + categoriaSeleccionada;
    borrarPaginadorYbusqueda();
    buscarGatos(url);
}


function crearPaginador(){

    botonSiguiente();
    botonAtras();
    botonPrincipio();
    botonFinal();
    mostrarPagina();

}

function mostrarPagina(){
    let divPaginaActual = document.getElementById("paginaActual");
    let divNumeros = document.createElement("div");
    divNumeros.textContent = (pagina+1) + "/" + (numPaginas+1);

    divPaginaActual.appendChild(divNumeros);

}

function borrarPaginadorYbusqueda(){
    let ul = document.getElementById("photos");
    let il = ul.childNodes;
    let longitud = il.length;

    for (let i = 0; i < longitud; i++) {
        ul.removeChild(ul.firstChild);
    }

    let botonFinal = document.getElementById("botonFinal");
    botonFinal.removeChild(botonFinal.firstChild);

    let botonPrincipio = document.getElementById("botonPrincipio");
    botonPrincipio.removeChild(botonPrincipio.firstChild);

    let botonAtras = document.getElementById("botonAtras");
    botonAtras.removeChild(botonAtras.firstChild);

    let botonSiguiente = document.getElementById("botonSiguiente");
    botonSiguiente.removeChild(botonSiguiente.firstChild);

    let paginaActual = document.getElementById("paginaActual");
    paginaActual.removeChild(paginaActual.firstChild);

}

function paginaInicio(){
    let url = urlGeneral + "&page="+ 0 +"&category_ids=" + categoriaSeleccionada;
    borrarPaginadorYbusqueda();
    buscarGatos(url);
    pagina = 0;
}

function paginaFinal(){
    let url = urlGeneral + "&page="+ numPaginas +"&category_ids=" + categoriaSeleccionada;
    borrarPaginadorYbusqueda();
    buscarGatos(url);
    pagina = numPaginas;
}


function botonFinal(){

    let botonFinalTMP = document.createElement("button");
    botonFinalTMP.className = "btn btn-primary";
    botonFinalTMP.textContent = "Final";

    let botonFinal = document.getElementById("botonFinal");
    botonFinal.appendChild(botonFinalTMP);

    botonFinalTMP.addEventListener("click",()=>{
        paginaFinal();
    });

}

function botonPrincipio(){

    let botonPrincipioTMP = document.createElement("button");
    botonPrincipioTMP.className = "btn btn-primary";
    botonPrincipioTMP.textContent = "Principio";

    let botonPrincipio = document.getElementById("botonPrincipio");
    botonPrincipio.appendChild(botonPrincipioTMP);

    botonPrincipioTMP.addEventListener("click",()=>{
        paginaInicio();
    });

}

function botonSiguiente(){
    let botonSiguienteTMP = document.createElement("button");
    botonSiguienteTMP.className = "btn btn-primary";
    botonSiguienteTMP.textContent = "siguiente";

    let botonSiguiente = document.getElementById("botonSiguiente");
    botonSiguiente.appendChild(botonSiguienteTMP);

    botonSiguienteTMP.addEventListener('click', ()=>{
        paginaSiguiente();
    });
}

function botonAtras(){
    let botonAtrasTMP = document.createElement("button");
    botonAtrasTMP.className = "btn btn-primary";
    botonAtrasTMP.textContent = "Atras";

    let botonAtras = document.getElementById("botonAtras");
    botonAtras.appendChild(botonAtrasTMP);

    botonAtrasTMP.addEventListener('click',()=>{
        paginaAnterior();
    });
}

function requireData(url) {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "json";
        xhr.setRequestHeader("x-api-key", apiKey);

        xhr.onload = function () {
            if (xhr.status == 200) {
                
                if(xhr.getResponseHeader("Pagination-Count") > 50){
                    numPaginas = 7;
                }else{
                    numPaginas = Math.ceil(xhr.getResponseHeader("Pagination-Count") / 8);
                    numPaginas--;
                }

                resolve(xhr.response);

            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.send();
    });

}

function crearCategorias() {
    requireData(urlCategorias).then(function (data) {

    let select = document.getElementById("desplegable");

    data.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        select.appendChild(option);
    });

    }).catch(function (error) {
        console.log(error);
    });
}

function buscarGatos(url) {


    requireData(url).then(function (data) {
        
        //alert(numPaginas);
        aniadirGatos(data);
        crearPaginador();
        iniciado = true;

    }).catch(function (error) {
        console.log(error);
    });

}


function aniadirGatos(data) {

    let ul = document.getElementById("photos");
    console.log(data);

    data.forEach(element => {
        let img = document.createElement("img");
        let li = document.createElement('li');
        li.className = "grid-25 tablet-grid-50";
        img.className = "image";

        img.src = element.url;
        li.appendChild(img);
        ul.appendChild(li);
    });

}
