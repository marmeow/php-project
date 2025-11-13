document.addEventListener("DOMContentLoaded", () => {
    console.log('1. DOM carregat ✓');

    fetch('products/products.json')
        .then(response => {
            console.log('2. Fetch resposta:', response.status);
            response.text()
        })
        .then(datos => {
            console.log('3. Dades rebudes:', datos);
            console.log('DADES COMPLETES:', datos);
            console.log('Tipus de dades:', typeof datos);
            console.log('És array?', Array.isArray(datos));

            //agupar productes categories
            const productesCategories = {
                'ofert': []
            };

            //Omplir arrays categories amb productes que tinguin ofertes
            datos.forEach(producte => {
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
            if (ofertaContainer && productesCategories['ofert'].length > 0) {
                ofertContainer.innerHTML = productesCategories['ofert']
                    .map(p => crearTarjetaProducte(p))
                    .join('');
            }
        })
        .catch(error => console.error("Error al carregar el JSON:", error));
});