//	razas = ["whippet","pointer-germanlonghair","spaniel-blenheim","poodle-toy","frise-bichon"]
// razas.filter()


function contarRazas(razas, raza) {//razas = array, raza = string con una raza
    let filtrados = razas.filter((r) => { return r == raza });//["whippet"]
    return filtrados.length;
}
//<div id ="razas"></div>
function pintarRazas(razas, raza) {
    let div = document.getElementById('razas');
    let p = document.createElement('p');
    let textNodeP = document.createTextNode(raza + ": "+contarRazas(razas, raza));
    p.appendChild(textNodeP);
    if (div) {
        div.appendChild(p);
    } else {
        div = document.createElement('div');
        div.id = "razas";
        div.appendChild(p);
        document.body.appendChild(div);
    }
}

function addDog(url, width, height) {
    let img = document.createElement('img');
    img.width = width;
    img.height = height;
    img.src = url;
    document.body.appendChild(img);
    if (localStorage.razas) {
        let razas = JSON.parse(localStorage.getItem('razas'));
        
        if (razas.length < 20) {
            razas.push(url.split('/')[4]);
            pintarRazas(razas, razas[razas.length-1])
            localStorage.razas = JSON.stringify(razas);
        } else {
            localStorage.removeItem('razas');
            alert("Cuadricula llena")
        }
    } else {
        let r = [url.split('/')[4]];
        pintarRazas(r, url.split('/')[4])
        localStorage.razas = JSON.stringify(r);
    }

}
//<div><button onclick="perro()">Perro aleatorio</button></div>
function addButton(textButton, textFunction) {
    let div = document.createElement('div');
    let button = document.createElement('button');
    let textNodeButton = document.createTextNode(textButton);
    button.appendChild(textNodeButton);
    button.setAttribute('onclick', textFunction);
    div.appendChild(button);
    document.body.appendChild(div);
}
addButton("Perro aleatorio", "perro()")
function perro() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(dog => { addDog(dog.message, 300, 300); });
}
