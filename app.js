

var url = "https://api.thecatapi.com/v1/images/search?limit=8&page=1";
var apiKey = "a678b829-da4f-4006-9bbf-5b0e250258e4";

function requireData(url) {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "json";
        xhr.setRequestHeader("x-api-key", apiKey);

        xhr.onload = function () {
            if (xhr.status == 200) {

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


function buscar() {

    requireData(url).then(function (data) {

        aniadirGatos(data);

    }).catch(function (error) {
        console.log(error);
    })

}

buscar();

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
