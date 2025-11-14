document.addEventListener("DOMContentLoaded", () => {
    fetch('./products/products.json')
        .then(response => {
            return response.json();
        })
        .then(datos => {
            // Si datos és un objecte amb una propietat "products":
            const productes = datos.products || datos.productes || datos;

            const productesCategories = {
                'ofert': [],
                'ofertCategoria': []
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

            function crearTarjetaProducte(producte) {
                const ofertaClass = producte.oferta ? 'oferta' : '';
                const imatgeUrl = producte.imatge || 'placeholder.png';

                const ofert = document.querySelector('#ofertes');

                //Crear element article per cada producte amb oferta
                const articleOfertes = document.createElement('article');
                articleOfertes.classList.add('ofertProduct');

                //Crear cada element dins de l'article
                const h3 = document.createElement('h3');
                h3.id = 'nomProducte';
                h3.textContent = producte.nom;

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
                articleOfertes.appendChild(h3);
                articleOfertes.appendChild(pDescripcio);
                articleOfertes.appendChild(pPreuAbans);
                articleOfertes.appendChild(pPreuDescompte);
                articleOfertes.appendChild(pDesc);
                ofert.appendChild(articleOfertes);
            }

            function crearSectionCategoria(categoria) {

            }

            productesCategories['ofertCategoria'].map(_, c => crearSectionCategoria(c)).join('');

            // Renderitzar les cartes de productes amb oferta
            const ofertContainer = document.querySelector('#ofertes');
            if (ofertContainer && productesCategories['ofert'].length > 0) {
                ofertContainer.append(productesCategories['ofert']
                    .map(p => crearTarjetaProducte(p))
                    .join(''));
            }
        })
        .catch(error => console.error("Error al carregar el JSON:", error));


});
