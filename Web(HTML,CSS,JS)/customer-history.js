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

  // Sample transaction data (in a real app, this would come from an API)
  let transactions = [
    {
      txnId: "TXN101",
      vegetableName: "Carrot",
      date: "2024-03-10",
      cost: 120.5,
    },
    {
      txnId: "TXN102",
      vegetableName: "Potato",
      date: "2024-03-11",
      cost: 185.75,
    },
    {
      txnId: "TXN103",
      vegetableName: "Tomato",
      date: "2024-03-12",
      cost: 210.0,
    },
    {
      txnId: "TXN104",
      vegetableName: "Onion",
      date: "2024-03-13",
      cost: 150.25,
    },
    {
      txnId: "TXN105",
      vegetableName: "Spinach",
      date: "2024-03-14",
      cost: 85.4,
    },
  ];

  // Get transactions from localStorage if available
  const storedTransactions = localStorage.getItem("transactions");
  if (storedTransactions) {
    const parsedTransactions = JSON.parse(storedTransactions);
    // Filter transactions for current user
    const userTransactions = parsedTransactions.filter(
      transaction => transaction.userId === currentUser.username
    );
    if (userTransactions.length > 0) {
      transactions = userTransactions;
    }
  }

  // DOM elements
  const transactionsContainer = document.getElementById("transactions-container");
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

  // Render transactions
  function renderTransactions(transactionsToRender) {
    transactionsContainer.innerHTML = "";

    if (transactionsToRender.length === 0) {
      transactionsContainer.innerHTML = '<div class="no-transactions">No transactions found</div>';
      return;
    }

    transactionsToRender.forEach(transaction => {
      const transactionItem = document.createElement("div");
      transactionItem.className = "transaction-item";
      
      transactionItem.innerHTML = `
        <div class="transaction-cell">${transaction.txnId}</div>
        <div class="transaction-cell">${transaction.vegetableName}</div>
        <div class="transaction-cell">${transaction.date}</div>
        <div class="transaction-cell">₹${transaction.cost.toFixed(2)}</div>
      `;
      
      transactionsContainer.appendChild(transactionItem);
    });
  }

  // Sort transactions
  function sortTransactions(column) {
    // If same column clicked, toggle direction
    if (sortConfig.column === column) {
      sortConfig.direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      sortConfig.column = column;
      sortConfig.direction = "asc";
    }

    const sortedTransactions = [...transactions].sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case "txnId":
          valueA = a.txnId;
          valueB = b.txnId;
          break;
        case "vegetableName":
          valueA = a.vegetableName.toLowerCase();
          valueB = b.vegetableName.toLowerCase();
          break;
        case "date":
          valueA = new Date(a.date);
          valueB = new Date(b.date);
          break;
        case "cost":
          valueA = a.cost;
          valueB = b.cost;
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

    renderTransactions(sortedTransactions);
  }

  // Filter transactions based on search
  function filterTransactions(searchTerm) {
    if (!searchTerm) {
      renderTransactions(transactions);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.txnId.toLowerCase().includes(searchTermLower) ||
        transaction.vegetableName.toLowerCase().includes(searchTermLower) ||
        transaction.date.includes(searchTerm) ||
        transaction.cost.toString().includes(searchTerm)
      );
    });

    renderTransactions(filteredTransactions);
  }

  // Event listeners
  searchInput.addEventListener("input", function() {
    filterTransactions(this.value);
  });

  columnHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const column = this.getAttribute("data-sort");
      sortTransactions(column);
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
  renderTransactions(transactions);
});