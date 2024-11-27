// Datos de ejemplo para productos
const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2', price: 150, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', description: 'Descripción del Producto 3', price: 200, image: 'https://via.placeholder.com/150' },
  ];
  
  // Array para almacenar productos en el carrito
  let cart = [];
  
  // Función para cargar los productos en la vista
  function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; // Limpiar contenedor antes de cargar los productos
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col-md-4');
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
          </div>
        </div>
      `;
      productsContainer.appendChild(productCard);
    });
  }
  
  // Función para agregar productos al carrito
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} ha sido añadido al carrito.`);
  }
  
  // Función para mostrar los productos en el carrito
  function showCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
  
    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="list-group-item">Tu carrito está vacío.</li>';
    } else {
      cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item');
        cartItem.innerHTML = `${product.name} - $${product.price}`;
        cartItems.appendChild(cartItem);
      });
    }
  }
  
  // Función de cierre de sesión (simplificada)
  document.getElementById('logout').addEventListener('click', function() {
    alert('Has cerrado sesión.');
    window.location.href = 'login.html'; // Redirigir al login (o a la página deseada)
  });
  
  // Evento para mostrar el carrito
  document.getElementById('cartModal').addEventListener('show.bs.modal', showCart);
  
  // Cargar productos al cargar la página
  window.onload = loadProducts;
  