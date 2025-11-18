
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
  fetch('../data/products.json')
    .then(response => response.json())
    .then(dades => {
      const productesPerCategoria = agruparItems(dades.productes);
      mostrarCategories(productesPerCategoria);
    })
    .catch(error => console.error("Error al carregar el JSON:", error));
});

function agruparItems(productes) {
  const cats = {};
  productes.forEach(item => {
    if (item.categoria === 'entrepans') {
      const subcat = (item.descripció?.toLowerCase().includes('fred'))
        ? 'entrepans-freds'
        : 'entrepans-calents';
      if (!cats[subcat]) cats[subcat] = [];
      cats[subcat].push(item);
    } else {
      if (!cats[item.categoria]) cats[item.categoria] = [];
      cats[item.categoria].push(item);
    }
  });
  return cats;
}

function crearCard(item) {
  const ofertaClass = item.oferta ? 'oferta' : '';
  const imgUrl = item.imatge || "placeholder.png";
  return `
    <article class="product-card ${ofertaClass}" data-producte="${item.nom}">
      <div class="inner">
        <img src="../resources/images/products/${imgUrl}" alt="${item.nom}">
        <h5>${item.nom}</h5>
        <p class="descripcio">${item.descripció || item.descripcio}</p>
        <div class="preu-oferta-container">
            <p class="preu-iva"><span class="preu">${item.preu.toFixed(2)}</span> € <span class="iva">IVA inclós</span></p>
            <div class="oferta-badge">
              ${item.oferta ? 'Oferta!' : ''}
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

        </div>

    </article>
  `;
}

function mostrarCategories(categories) {
  const productesDiv = document.getElementById("productes");

  Object.keys(categories).forEach(cat => {
    const items = categories[cat];
    if (items.length === 0) return;

    if (cat === "entrepans-freds") {
      const fredsCards = document.querySelector("#freds .product-cards");
      if (fredsCards) {
        fredsCards.innerHTML = items.map(crearCard).join("");
      }
    } else if (cat === "entrepans-calents") {
      const calentsCards = document.querySelector("#calents .product-cards");
      if (calentsCards) {
        calentsCards.innerHTML = items.map(crearCard).join("");
      }
    } else {
      let sec = document.getElementById(cat);
      if (!sec) {
        sec = document.createElement("section");
        sec.id = cat;
        const titulo = cat.charAt(0).toUpperCase() + cat.slice(1);
        sec.innerHTML = `<h3>${titulo}</h3><div class="product-cards flex"></div>`;
        productesDiv.appendChild(sec);
      }
      const cards = sec.querySelector(".product-cards");
      cards.innerHTML = items.map(crearCard).join("");
    }
  });
}



//https://www.w3schools.com/howto/howto_js_vertical_tabs.asp

function openBocata(evt, cityName) {
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
