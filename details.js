// details.js
document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("details-container");



  
  
    // Function to extract product ID from URL query parameters
    function getProductIdFromUrl() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get("id");
    }
  
    // Function to fetch product details by ID
    function fetchProductDetails(productId) {
      return fetch("db.json")
        .then(response => response.json())
        .then(data => {
          const product = data.products.find(product => product.id == productId);
          if (product) {
            return product;
          } else {
            throw new Error("Product not found");
          }
        });
    }
  
    // Function to render product details
    function renderProductDetails(product) {
      const detailCard = document.createElement("div");
      detailCard.classList.add("detail-card");
  
      const thumbnail = document.createElement("img");
      thumbnail.src = product.thumbnail;
      thumbnail.alt = product.name;
  
      const name = document.createElement("h3");
      name.textContent = product.name;
  
      const price = document.createElement("p");
      price.textContent = "Price: $" + product.price.toFixed(2);
  
      const category = document.createElement("p");
      category.textContent = "Category: " + product.category;
  
      const description = document.createElement("p");
      description.textContent = product.description;
  
      detailCard.appendChild(thumbnail);
      detailCard.appendChild(name);
      detailCard.appendChild(price);
      detailCard.appendChild(category);
      detailCard.appendChild(description);
  
      detailsContainer.appendChild(detailCard);
    }
  
    // Fetch product details and render them
    const productId = getProductIdFromUrl();
    if (productId) {
      fetchProductDetails(productId)
        .then(product => renderProductDetails(product))
        .catch(error => console.log("Error fetching product details:", error));
    } else {
      console.log("Product ID not found in URL");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the back button
    document.getElementById("back-button").addEventListener("click", function () {
      // Navigate back to the index.html page
      window.location.href = "index.html";
    });
  });
  