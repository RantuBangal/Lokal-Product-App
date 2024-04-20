

document.addEventListener("DOMContentLoaded", function () {
    let productsData = []; // To store the products data
  
    const container = document.getElementById("product-container");
  
    // Function to render product cards
    function renderProducts(products) {
      container.innerHTML = ""; // Clear previous products
  
      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", () => navigateToDetailsPage(product.id)); // Add click event listener
  
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
        description.textContent = product.description.substring(0, 100) + "...";
  
        card.appendChild(thumbnail);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(description);
  
        container.appendChild(card);
      });
    }

    function navigateToDetailsPage(productId) {
        window.location.href = "details.html?id=" + productId; // Redirect to details page with product ID as query parameter
      }
    
      // Fetch data from db.json
      fetch("db.json")
        .then(response => response.json())
        .then(data => {
          productsData = data.products; // Store products data
    
          // Render initial products
          renderProducts(productsData);
        })
        .catch(error => console.log("Error fetching data:", error));
    
  
    // Function to sort products by price in ascending order
    function sortByPriceAsc() {
      const sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
      renderProducts(sortedProducts);
    }
  
    // Function to sort products by price in descending order
    function sortByPriceDesc() {
      const sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
      renderProducts(sortedProducts);
    }
  
    // Function to filter products by category
    function filterByCategory(category) {
      if (category === "all") {
        renderProducts(productsData); // Show all products if category is "all"
      } else {
        const filteredProducts = productsData.filter(product => product.category === category);
        renderProducts(filteredProducts);
      }
    }
  
    // Fetch data from db.json
    fetch("db.json")
      .then(response => response.json())
      .then(data => {
        productsData = data.products; // Store products data
  
        // Render initial products
        renderProducts(productsData);
  
        // Create buttons for sorting
        const sortAscBtn = document.createElement("button");
        sortAscBtn.textContent = "Sort by Price (Low to High)";
        sortAscBtn.addEventListener("click", sortByPriceAsc);
  
        const sortDescBtn = document.createElement("button");
        sortDescBtn.textContent = "Sort by Price (High to Low)";
        sortDescBtn.addEventListener("click", sortByPriceDesc);
  
        // Create buttons for filtering
        const filterContainer = document.createElement("div");
        filterContainer.classList.add("filter-container");
  
        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Filter by Category: ";
  
        const filterSelect = document.createElement("select");
        filterSelect.addEventListener("change", () => {
          filterByCategory(filterSelect.value);
        });
  
        // Add "All" option for filtering
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "All";
        filterSelect.appendChild(allOption);
  
        // Add unique categories as options for filtering
        const categories = [...new Set(productsData.map(product => product.category))];
        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          filterSelect.appendChild(option);
        });
  
        filterLabel.appendChild(filterSelect);
        filterContainer.appendChild(filterLabel);
  
        // Add buttons and filter dropdown to the page
        container.insertAdjacentElement("beforebegin", sortAscBtn);
        container.insertAdjacentElement("beforebegin", sortDescBtn);
        container.insertAdjacentElement("beforebegin", filterContainer);
      })
      .catch(error => console.log("Error fetching data:", error));
  });
  
  