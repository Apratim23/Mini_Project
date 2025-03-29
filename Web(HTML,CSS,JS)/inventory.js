document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUserJSON = sessionStorage.getItem("currentUser");
  if (!currentUserJSON) {
    window.location.href = "login.html";
    return;
  }

  // Parse user data
  const currentUser = JSON.parse(currentUserJSON);
  
  // Update dashboard link based on user role
  const dashboardLink = document.getElementById("dashboard-link");
  if (currentUser.userType.trim().toLowerCase() === "farmer") {
    dashboardLink.href = "farmer-dashboard.html";
  } else {
    dashboardLink.href = "dashboard.html";
  }

  // Sample inventory data
  let inventoryItems = [
    {
      id: 1,
      name: "Tomato",
      weight: 25,
      price: 40,
    },
    {
      id: 2,
      name: "Potato",
      weight: 50,
      price: 25,
    },
    {
      id: 3,
      name: "Onion",
      weight: 35,
      price: 30,
    },
    {
      id: 4,
      name: "Carrot",
      weight: 18,
      price: 45,
    },
    {
      id: 5,
      name: "Spinach",
      weight: 12,
      price: 60,
    },
  ];

  // Get inventory from localStorage if available
  const storedInventory = localStorage.getItem("inventory");
  if (storedInventory) {
    inventoryItems = JSON.parse(storedInventory);
  }

  // DOM elements
  const inventoryContainer = document.getElementById("inventory-items");
  const searchInput = document.getElementById("search-input");
  const columnHeaders = document.querySelectorAll(".column-header[data-sort]");
  const profileIcon = document.getElementById("profile-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const logoutButton = document.getElementById("logout-button");

  // Sort configuration
  let sortConfig = {
    column: null,
    direction: "asc",
  };

  // Render inventory items with Add to Cart button
  function renderInventory(itemsToRender) {
    inventoryContainer.innerHTML = "";

    if (itemsToRender.length === 0) {
      inventoryContainer.innerHTML = '<div class="no-items">No inventory items found</div>';
      return;
    }

    itemsToRender.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.className = "inventory-item";
      
      itemElement.innerHTML = `
        <div class="item-cell">${item.name}</div>
        <div class="item-cell">${item.weight} kg</div>
        <div class="item-cell">₹${item.price}/kg</div>
        <div class="item-cell">
          <button class="add-to-cart-btn" data-id="${item.id}">
            <i class="ti ti-shopping-cart"></i> Add to Cart
          </button>
        </div>
      `;
      
      inventoryContainer.appendChild(itemElement);
    });

    // Add event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        const itemToAdd = inventoryItems.find(item => item.id === itemId);
        
        if (itemToAdd) {
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          const existingItem = cartItems.find(item => item.id === itemId);
          
          if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
          } else {
            const itemCopy = {...itemToAdd};
            itemCopy.quantity = 1;
            cartItems.push(itemCopy);
          }
          
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          
          // Show notification
          const notification = document.createElement('div');
          notification.className = 'cart-notification';
          notification.textContent = `${itemToAdd.name} added to cart!`;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
          }, 2000);
        }
      });
    });
  }

  // Sort inventory
  function sortInventory(column) {
    if (sortConfig.column === column) {
      sortConfig.direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      sortConfig.column = column;
      sortConfig.direction = "asc";
    }

    const sortedInventory = [...inventoryItems].sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case "name":
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case "weight":
          valueA = a.weight;
          valueB = b.weight;
          break;
        case "price":
          valueA = a.price;
          valueB = b.price;
          break;
        default:
          return 0;
      }

      if (sortConfig.direction === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    renderInventory(sortedInventory);
  }

  // Filter inventory based on search
  function filterInventory(searchTerm) {
    if (!searchTerm) {
      renderInventory(inventoryItems);
      return;
    }

    const filteredInventory = inventoryItems.filter(item => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTermLower) ||
        item.weight.toString().includes(searchTerm) ||
        item.price.toString().includes(searchTerm)
      );
    });

    renderInventory(filteredInventory);
  }

  // Event listeners
  searchInput.addEventListener("input", function() {
    filterInventory(this.value);
  });

  columnHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const column = this.getAttribute("data-sort");
      sortInventory(column);
    });
  });

  // Toggle dropdown menu
  profileIcon.addEventListener("click", function(event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function(event) {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  // Handle logout
  logoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Initial render
  renderInventory(inventoryItems);
});