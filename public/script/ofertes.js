/**
 * Funció que carrega els productes des d'un document JSON, filtra els que
 * estan en oferta, els agrupa per categories i genera de dinàmicament seccions
 * amb targetes de productes al DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
    fetch('./data/products.json')
        .then(response => {
            return response.json();
        })
        .then(datos => {
            // Si datos és un objecte amb una propietat "products":
            const productes = datos.products || datos.productes || datos;

            const productesCategories = {
                'ofert': [],
                'ofertCategoria': {}
            };

            productes.forEach(producte => {
                if (producte.oferta === true) {
                    let categoria = producte.categoria;
                    if (!(categoria in productesCategories['ofertCategoria'])) {
                        productesCategories['ofertCategoria'][categoria] = [];
                    }

                    productesCategories['ofert'].push(producte);
                    productesCategories['ofertCategoria'][categoria].push(producte);
                }
            });

            console.log(productesCategories);

            /**
             * Funció que crea dinàmicament una targeta HTML amb la informació 
             * d’un producte en oferta i la col·loca dins la secció indicada.
             * @param {*} producte Producte que està en oferta.
             * @param {*} idDesti Id de la secció on col·locarem cada targeta del producte en oferta.
             */
            function crearTarjetaProducte(producte, idDesti) {
                const ofertaClass = producte.oferta ? 'oferta' : '';
                const imatgeUrl = producte.imatge || 'placeholder.png';

                const ofertContenidor = document.querySelector('#' + idDesti + ' .productes');


                //Crear element article per cada producte amb oferta
                const articleOfertes = document.createElement('article');
                articleOfertes.classList.add('ofertProduct');

                //Crear cada element dins de l'article
                //TODO: revisar el src para que sea ruta relativa (FET)
                const imatge = document.createElement('img');
                imatge.src = 'resources/images/products/' + producte.imatge;
                imatge.alt = producte.imatge;

                producte.horario.forEach(element => {
                    articleOfertes.classList.add(element);
                });

                const h4 = document.createElement('h4');
                h4.id = 'nomProducte';
                h4.textContent = producte.nom;

                const pDescripcio = document.createElement('p');
                pDescripcio.id = 'descripcioProducte';
                pDescripcio.textContent = producte.descripció || producte.descripcio;

                const pPreuAbans = document.createElement('p');
                pPreuAbans.id = 'preuAbans';
                pPreuAbans.textContent = `Abans: ${(producte.preu).toFixed(2)} €`;

                const pPreuDescompte = document.createElement('p');
                pPreuDescompte.id = 'preuDescompte';
                pPreuDescompte.textContent = `Ara: ${(producte.preu * 0.8).toFixed(2)} €`;

                const pDesc = document.createElement('p');
                pDesc.id = 'percent';
                pDesc.textContent = "Gaudeix del 20% de descompte";

                //Afegir tots els elements a l'article
                articleOfertes.appendChild(imatge);
                articleOfertes.appendChild(h4);
                articleOfertes.appendChild(pDescripcio);
                articleOfertes.appendChild(pPreuAbans);
                articleOfertes.appendChild(pPreuDescompte);
                articleOfertes.appendChild(pDesc);
                ofertContenidor.appendChild(articleOfertes);
            }

            /**
             * Funció que ens permet crear dinàmicament les diferents seccions per cada catergoria d'ofertes
             * on introduirem cada targeta creada a la funció anterior.
             * @param {*} categoria Les diferents categories que trobem al fitxer JSON.
             */
            function crearSectionCategoria(categoria) {
                console.log(categoria);
                const ofert = document.querySelector('#ofertes');

                //Crear el section
                const sectionCategoria = document.createElement('section');
                sectionCategoria.id = categoria;
                sectionCategoria.className = "seccioCategoria";

                const divProductes = document.createElement('div');
                divProductes.className = "productes";

                const h3Section = document.createElement('h3');
                h3Section.id = 'h3' + categoria;
                h3Section.textContent = categoria[0].toUpperCase() + categoria.substring(1);

                //Afegir tots els elements
                sectionCategoria.appendChild(h3Section);
                sectionCategoria.appendChild(divProductes);
                ofert.appendChild(sectionCategoria);
            }

            // Bucle que crea una secció al DOM per a cada categoria de productes en oferta.
            for (const [categoria, value] of Object.entries(productesCategories['ofertCategoria'])) {
                crearSectionCategoria(categoria);
            }

            // Renderitzar les cartes de productes amb oferta
            const ofertContainer = document.querySelector('#ofertes');
            if (ofertContainer && productesCategories['ofert'].length > 0) {
                productesCategories['ofert'].map(producte => crearTarjetaProducte(producte, producte.categoria));
            }
        })
        .catch(error => console.error("Error al carregar el JSON:", error));

    const temps = rebTemps();
    
    
});

function rebTemps() {
    const d = new Date();
    const hora = d.getHours();
    if (hora >= 9 && hora < 17){
        return manana;
    } else if (hora <= 17 && hora < 21){
        return tarde;
    } else {
        return noche;
    }
}