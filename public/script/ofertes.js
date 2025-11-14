document.addEventListener("DOMContentLoaded", () => {
    fetch('./products/products.json')
        .then(response => {
            return response.json();
        })
        .then(datos => {
            // Si datos és un objecte amb una propietat "products":
            const productes = datos.products || datos.productes || datos;

            const productesCategories = {
                'ofert': []
            };

            productes.forEach(producte => {
                if (producte.oferta === true) {
                    productesCategories['ofert'].push(producte);
                }
            });

            function crearTarjetaProducte(producte) {
                const ofertaClass = producte.oferta ? 'oferta' : '';
                const imatgeUrl = producte.imatge || 'placeholder.png';

                return `
                    <article class="ofertProduct"> 
                        <h3> ${producte.nom} </h3>
                        <p> ${producte.descripció || producte.descripcio} </p>
                        <p class="preu-antiga"> Preu Antic: ${(producte.preu).toFixed(2)} € </p>
                        <p class="preu-nou"> Preu Oferta: ${(producte.preu * 0.8).toFixed(2)} € </p>
                    </article>`;
            }

            // Renderitzar les cartes de productes amb oferta
            const ofertContainer = document.querySelector('#ofertes');
            if (ofertContainer && productesCategories['ofert'].length > 0) {
                ofertContainer.appendChild(productesCategories['ofert']
                    .map(p => crearTarjetaProducte(p))
                    .join(''));
                /* ofertContainer.innerHTML = productesCategories['ofert']
                    .map(p => crearTarjetaProducte(p))
                    .join(''); */
            }
        })
        .catch(error => console.error("Error al carregar el JSON:", error));


});
