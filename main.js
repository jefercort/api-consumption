const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=10&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';

const spanError = document.getElementById("error");

async function loadRandomMichis() {  
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("RANDOM", data);

    if (res.status !== 200) {
        spanError.innerHTML = "Error al cargar las imágenes" + res.status;
    } else {
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const btnRandom1 = document.getElementById("btnRandom1");
        const btnRandom2 = document.getElementById("btnRandom2");

        img1.src = data[0].url;
        img2.src = data[1].url;
        console.log("ID1", data[0].id);
        console.log("ID2", data[1].id);
        btnRandom1.onclick = () => saveFavoriteMichi(data[0].id);
        btnRandom2.onclick = () => saveFavoriteMichi(data[1].id);

    }
}

async function loadFavoritesMichis() {  
    const res = await fetch(API_URL_FAVORITES); // Fetch por default es GET
    const data = await res.json();
    // const img1 = document.getElementById("img1");
    // const img2 = document.getElementById("img2");
    console.log("FAVORITES", data);
    // img1.src = data[0].url;
    // img2.src = data[1].url;

    if (res.status !== 200) {
        spanError.innerHTML = "Error al cargar las imágenes" + res.status + data.message;
    } else {
        data.forEach(michi => {
            const section = document.getElementById("favoriteMichis");
            const article = document.createElement("article"); // Se crea un elemento article
            const img = document.createElement("img"); // Se crea un elemento img
            const btn = document.createElement("button"); // Se crea un elemento button
            const btnText = document.createTextNode("Eliminar"); // Se crea un nodo de texto

            btn.appendChild(btnText); // Se añade el nodo de texto al botón
            img.src = michi.image.url; // Se añade la url de la imagen al elemento img
            img.width = 150; // Se añade el ancho de la imagen al elemento img
            article.appendChild(img); // Se añade el elemento img al elemento article
            article.appendChild(btn); // Se añade el elemento button al elemento article
            section.appendChild(article); // Se añade el elemento article al elemento section
        })
    }
};

async function saveFavoriteMichi(id) {
    console.log("ID", id);
    const res = await fetch(API_URL_FAVORITES, {
        method: "POST", //Se utiliza el método POST para enviar datos al servidorm, cuando es GET no se pone porque se asume por defecto
        headers: { //Se utiliza el headers para enviar información adicional en la petición HTTP
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ //Se utiliza el JSON.stringify para convertir un objeto a un string y se pueda comunicar de manera adecuada con otros lenguajes de programación
            image_id: id,
        }),
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Error al cargar las imágenes" + res.status + data.message;
    } 
};

loadRandomMichis();
loadFavoritesMichis();