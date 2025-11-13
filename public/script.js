
// https://codepen.io/webstuff/pen/JKgwZY// 

// Add to cart 
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-cart') || e.target.closest('.btn-cart')) {
    const button = e.target.closest('.btn-cart') || e.target;
    button.classList.toggle('cart_clk');
    const qty = button.parentElement.querySelector('.qty');
    if (qty) {
      qty.classList.toggle('active');
    }
  }
});

// Add num 
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-plus-square') || e.target.closest('.inc')) {
    const inc = e.target.closest('.inc');
    const numSpan = inc.parentElement.querySelector('.num');
    let prnum = parseInt(numSpan.textContent, 10);
    prnum++;
    numSpan.textContent = prnum;

    const cartIcon = inc.closest('.crtdiv').querySelector('.fa-shopping-cart');
    if (cartIcon) {
      cartIcon.setAttribute('data-before', prnum);
    }
  }
});

// Reduce num
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-minus-square') || e.target.closest('.dec')) {
    const dec = e.target.closest('.dec');
    const numSpan = dec.parentElement.querySelector('.num');
    let prnum = parseInt(numSpan.textContent, 10);

    if (prnum > 0) {
      prnum--;
      numSpan.textContent = prnum;

      const cartIcon = dec.closest('.crtdiv').querySelector('.fa-shopping-cart');
      if (cartIcon) {
        cartIcon.setAttribute('data-before', prnum);
      }
    }

  }
});





document.addEventListener("DOMContentLoaded", () => {
  fetch('../products/products.json')
    .then(response => response.json())
    .then(datos => {
      // para agrupar els productes en categpories
      const productesPorCategoria = {
        'entrepans-freds': [],
        'entrepans-calents': [],
        'brioixeria': [],
        'snacks': [],
        'begudes': [],
        'fruita': []
      };

      // classificar els productes 
      datos.productes.forEach(producte => {
        if (producte.categoria === 'entrepans') {
          // Segons si s'inclou la praula fred o calent a la descripcio els entrepans van a fred o calent
          if (producte.descripció && producte.descripció.toLowerCase().includes('fred')) {
            productesPorCategoria['entrepans-freds'].push(producte);
          } else {
            productesPorCategoria['entrepans-calents'].push(producte);
          }
        } else {
          productesPorCategoria[producte.categoria]?.push(producte);
        }
      });



      // FALTA HACER LO DEL DOM PURIFY!!!!!!!!!!!!! AÑADIR AL JIRA MAÑANA!!!!!!!!!!!!!!!!!!!!!!! 

      function crearTarjetaProducte(producte) {
        const ofertaClass = producte.oferta ? 'oferta' : '';
        const imatgeUrl = producte.imatge || "placeholder.png";
        console.log(producte.imatge)
        let content = `
      <article class="product-card ${ofertaClass}" data-producte="${producte.nom}">
        <img src="../resources/images/products/${imatgeUrl}" alt="${producte.nom}">
        <h5>${producte.nom}</h5>
        <p class="descripcio">${producte.descripció || producte.descripcio}</p>
        <div class="preu-oferta-container">
          <p class="preu-iva"><span class="preu">${producte.preu.toFixed(2)}</span> € <span class="iva">IVA inclós</span></p>
          <div class="oferta-badge">
            ${producte.oferta ? 'Oferta!' : ''}
          </div>
        </div>
        <div class="cont">
          <div class="crtdiv">
            <button type="button" class="cart btn-cart">
              Afegir a la cistella
            </button>
            <span class="qty">
              <span class="dec">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </span>
              <span class="num">1</span>
              <span class="inc">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </span>
            </span>
          </div>
        </div>
      </article>
    `;


        return content;
      }



      // GENERAR!!!!!!!!!!!!!!! TODO ESTO LO METERÉ EN UNA FUNCION EN LUGAR DE DEJARLO SUELTO!!!!!!!!!!!!!!!!!! AÑADIRE TASCA AL JIRA MAÑANA!!!!!!!!!!!!!!!!!!!!!!!!!!!!



      const fredsContainer = document.querySelector('#freds .product-cards');
      if (fredsContainer && productesPorCategoria['entrepans-freds'].length > 0) {
        fredsContainer.innerHTML = productesPorCategoria['entrepans-freds']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }


      const calentsContainer = document.querySelector('#calents');
      if (calentsContainer && productesPorCategoria['entrepans-calents'].length > 0) {
        let calentsCards = calentsContainer.querySelector('.product-cards');
        if (!calentsCards) {
          calentsCards = document.createElement('div');
          calentsCards.className = 'product-cards flex';
          calentsContainer.appendChild(calentsCards);
        }
        calentsCards.innerHTML = productesPorCategoria['entrepans-calents']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }

      const brioixeriaContainer = document.querySelector('#brioixeria .product-cards');
      if (brioixeriaContainer && productesPorCategoria['brioixeria'].length > 0) {
        brioixeriaContainer.innerHTML = productesPorCategoria['brioixeria']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }


      const snacksContainer = document.querySelector('#snacks .product-cards');
      if (snacksContainer && productesPorCategoria['snacks'].length > 0) {
        snacksContainer.innerHTML = productesPorCategoria['snacks']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }

      const begudesContainer = document.querySelector('#begudes .product-cards');
      if (begudesContainer && productesPorCategoria['begudes'].length > 0) {
        begudesContainer.innerHTML = productesPorCategoria['begudes']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }

      const fruitaContainer = document.querySelector('#fruita .product-cards');
      if (fruitaContainer && productesPorCategoria['fruita'].length > 0) {
        fruitaContainer.innerHTML = productesPorCategoria['fruita']
          .map(p => crearTarjetaProducte(p))
          .join('');
      }
    })
    .catch(error => console.error("Error al carregar el JSON:", error));
});


//https://www.w3schools.com/howto/howto_js_vertical_tabs.asp

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
