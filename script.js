const products = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1", price: 10, category: "Categoría A", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2", price: 20, category: "Categoría B", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Producto 3", description: "Descripción del producto 3", price: 30, category: "Categoría A", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Producto 4", description: "Descripción del producto 4", price: 40, category: "Categoría C", image: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Producto 5", description: "Descripción del producto 5", price: 50, category: "Categoría B", image: "https://via.placeholder.com/300x200" },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCategories();
  });
  
  function loadProducts(filteredProducts = products) {
    const productsContainer = document.getElementById("productsContainer");
    const noResults = document.getElementById("noResults");
  
    productsContainer.innerHTML = "";
  
    if (filteredProducts.length === 0) {
      noResults.style.display = "block";
      return;
    } else {
      noResults.style.display = "none";
    }
  
    filteredProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4");
  
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p><strong>Precio:</strong> $${product.price}</p>
          </div>
        </div>
      `;
  
      productsContainer.appendChild(productCard);
    });
  }
  
  function loadCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [...new Set(products.map(product => product.category))];
  
    uniqueCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  function filterProducts() {
    const searchQuery = document.getElementById("searchQuery").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  
    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
  
      return matchesSearch && matchesCategory && matchesPrice;
    });
  
    loadProducts(filteredProducts);
  }
  
  function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    console.log("Producto agregado al carrito:", product);
    alert(`Agregado al carrito: ${product.name}`);
  }

  