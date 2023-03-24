const products = [
  {
    product_id: 1,
    product_name: "Silver and Black Watch",
    product_price: "112.55",
    product_image: "images/silver-golden-watch.jpg",
    added_to_cart: false,
  },
  {
    product_id: 2,
    product_name: "Diniho Watch",
    product_price: "100.85",
    product_image: "images/diniho-watch.jpg",
    added_to_cart: false,
  },
  {
    product_id: 3,
    product_name: "Round Skeleton Watch",
    product_price: "87.56",
    product_image: "images/round-skeleton-watch.jpg",
    added_to_cart: true,
  },
  {
    product_id: 4,
    product_name: "Rolex Watch",
    product_price: "124",
    product_image: "images/rolex.jpg",
    added_to_cart: false,
  },
  {
    product_id: 5,
    product_name: "Apple Smart Watch",
    product_price: "99.99",
    product_image: "images/apple-smart-watch.jpg",
    added_to_cart: false,
  },
  {
    product_id: 6,
    product_name: "Gold Coin",
    product_price: "55.95",
    product_image: "images/apple-sport-watch.jpg",
    added_to_cart: false,
  },
]


let appProducts = products;

const productsElement = document.getElementById('products');
const myModal = document.getElementById('modal');
const cart = document.getElementById('cart_menu');
const indicator = document.getElementById('indicator');

let cartPros = [];


if (!localStorage.getItem('small-task-items')) {
  localStorage.setItem('small-task-items', JSON.stringify(products));
  loadProducts();
  cartView(cartPros);
  
} else {
  appProducts = JSON.parse(localStorage.getItem('small-task-items'));
  loadProducts();
  cartView(cartPros);
}
// Load the products into the DOM
function loadProducts() {
  productsElement.innerHTML = appProducts.map(item => {
    const { product_id, product_name, product_image, product_price, added_to_cart } = item;
    return `
    <div class="product animate__animated animate__backInRight" key=${product_id}>
    <div class="img-container">
      <img src=${product_image} alt="watch img">
    </div>
    <h3>${product_name}</h3>

    <p class="price"><b>Price: </b>${product_price}</p>
    <button class="btn cart-btn ${added_to_cart && 'added'}" id="add_to_cart">ِ${added_to_cart ? 'remove from cart' : 'add to cart'}</button>
    <button class="btn outline" id="quick_view">Quick_View</button>
  </div>
    `;
  }).join('');
}

setCartMenu();

function setCartMenu() {
  cartPros =  appProducts.filter(item => item.added_to_cart);
  indicator.textContent = cartPros.length;
  cartView(cartPros);
}

// Open cart menu
document.getElementById('cart_icon').addEventListener('click', () => {
  cart.classList.add('open');
})
// Close cart menu
document.getElementById('close_cart').addEventListener('click', () => {
  cart.classList.remove('open');
})

// Close modal
document.getElementById('close_modal').addEventListener('click', () => {
  myModal.classList.remove('open');
});


// Quick view btn action - SHOW MODAL
(function () {

  const viewBtns = Array.from(document.querySelectorAll('#quick_view'));

  for (let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener('click', () => {
      document.getElementById('modal').classList.add('open');
      const { product_id, product_name, product_image, product_price, added_to_cart } = appProducts[i];

      document.getElementById('modal_product').innerHTML = `
    
    <div class="img-container">
        <img src="${product_image}" alt="watch img">
      </div>
      <div class="product-content">
        <h2>${product_name}</h2>
        <p class="price"><b>Price: </b>${product_price}</p>
        <button class="btn cart-btn ${added_to_cart && 'added'}" id="pro_modal">ِ${added_to_cart ? 'remove from cart' : 'add to cart'}</button>
        </div>
    
    `;
      theAdd(product_id - 1);
    })
  }
})();

// Add to cart | remove from cart  -  INSIDE THE MODAL
function theAdd(id) {
  const btn = document.getElementById('pro_modal');
  const addToCartBtns = Array.from(document.querySelectorAll('#add_to_cart'));

  btn.addEventListener('click', () => {

    if (btn.classList.contains('added')) {
      
      btn.added_to_cart = false;
      btn.classList.remove('added');
      btn.innerHTML = 'add to cart';
      appProducts[id].added_to_cart = false;
      addToCartBtns[id].classList.remove('added');
      addToCartBtns[id].innerHTML = 'add to cart';
      setCartMenu();

    } else {

      btn.added_to_cart = true;
      btn.classList.add('added');
      btn.innerHTML = 'remove from cart';
      appProducts[id].added_to_cart = true;
      addToCartBtns[id].classList.add('added');
      addToCartBtns[id].innerHTML = 'remove from cart';
      setCartMenu();
      
    }
  })
}

// Add to cart | remove from cart  -  ACTIONS
(function () {

  const addToCartBtns = Array.from(document.querySelectorAll('#add_to_cart'));

  for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener('click', (e) => {
      if (addToCartBtns[i].classList.contains('added')) {

        appProducts[i].added_to_cart = false;
        addToCartBtns[i].classList.remove('added');
        addToCartBtns[i].innerHTML = 'add to cart';
        setCartMenu();


      } else {
        
        appProducts[i].added_to_cart = true;
        addToCartBtns[i].classList.add('added');
        addToCartBtns[i].innerHTML = 'remove from cart';
        setCartMenu();
      }
    })
  }
})();


// Function to display products into the CART
function cartView(items) {
  document.getElementById('cart_products').innerHTML = items.map(item => {
    const { product_id, product_name, product_image, product_price } = item;
    return `
    <div class="secondary-product" key=${product_id}>
    <div class="img-container">
      <img src=${product_image} alt="watch img">
    </div>
    <div class="product-content">
    <h3>${product_name}</h3>

    <p class="price"><b>Price: </b>${product_price}</p>
    <button class="btn cart-btn added" id="remove_product" data-id=${product_id}>remove from cart</button>
    </div>
  </div>
    `;
  }).join('');

  removePros();

}

// Remove from cart Btn - FROM THE CART MENU
function removePros() {
  const removeBtns = Array.from(document.querySelectorAll('#remove_product'));
  const addToCartBtns = Array.from(document.querySelectorAll('#add_to_cart'));

  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', () => {
      const id = removeBtns[i].getAttribute('data-id') - 1;
      appProducts[id].added_to_cart = false;
      
      addToCartBtns[id].classList.remove('added');
      addToCartBtns[id].innerHTML = 'add to cart';
      setCartMenu();
    })
  }
}