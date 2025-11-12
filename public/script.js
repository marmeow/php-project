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
  fetch('products/products.json')
    .then(response => response.json())
    .then(datos => {
      document.getElementById("nombre").textContent = datos.nom;
      document.querySelector(".preu").textContent = datos.preu;
      document.querySelector(".desc").textContent = datos.ciudad;

      const lista = document.getElementById("hobbies");
      datos.hobbies.forEach(hobby => {
        const li = document.createElement("li");
        li.textContent = hobby;
        lista.appendChild(li);
      });
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

});

