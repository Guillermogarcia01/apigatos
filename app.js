

var urlGeneral = "https://api.thecatapi.com/v1/images/search?limit=8&page=1&order=Desc";
var apiKey = "a678b829-da4f-4006-9bbf-5b0e250258e4";
var urlCategorias = "https://my-json-server.typicode.com/Guillermogarcia01/apigatos/Categorias";
var botonBuscar = document.getElementById("submit");
const categoria = document.getElementById("desplegable");
var numPaginas;
var iniciado = false;

crearCategorias();

botonBuscar.addEventListener("click", (evento)=>{

    categoria;
    let url = urlGeneral + "&category_ids=" +categoria.value;

    if(iniciado)
        borrarPaginadorYbusqueda();

    buscarGatos(url);
    crearPaginador();
    alert(numPaginas);
    iniciado = true;
})


function crearPaginador(){

    botonSiguiente();
    botonAtras();
   

}

function borrarPaginadorYbusqueda(){
    let ul = document.getElementById("photos")
    let il = ul.childNodes;
    let longitud = il.length;

    for (let i = 0; i < longitud; i++) {
        ul.removeChild(ul.firstChild);
    }

    let botonAtras = document.getElementById("botonAtras");
    botonAtras.removeChild(botonAtras.firstChild);

    let botonSiguiente = document.getElementById("botonSiguiente");
    botonSiguiente.removeChild(botonSiguiente.firstChild);

}

function botonSiguiente(){
    let botonSiguienteTMP = document.createElement("button");
    botonSiguienteTMP.className = "btn btn-primary"
    botonSiguienteTMP.textContent = "siguiente";

    let botonSiguiente = document.getElementById("botonSiguiente");
    botonSiguiente.appendChild(botonSiguienteTMP);
}

function botonAtras(){
    let botonSiguienteTMP = document.createElement("button");
    botonSiguienteTMP.className = "btn btn-primary"
    botonSiguienteTMP.textContent = "Atras";

    let botonSiguiente = document.getElementById("botonAtras");
    botonSiguiente.appendChild(botonSiguienteTMP);
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
                    numPaginas = 13;
                }else{
                    numPaginas = Math.ceil(xhr.getResponseHeader("Pagination-Count") / 8);
                }

                resolve(xhr.response);

            } else {
                reject(xhr.statusText);
            }
        }

        xhr.onerror = function () {
            reject(xhr.statusText);
        }
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
    })
}

function buscarGatos(url) {


    requireData(url).then(function (data) {

        aniadirGatos(data);

    }).catch(function (error) {
        console.log(error);
    })

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
