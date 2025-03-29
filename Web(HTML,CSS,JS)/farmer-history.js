document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUserJSON = sessionStorage.getItem("currentUser");
  if (!currentUserJSON) {
    window.location.href = "login.html";
    return;
  }

  // Parse user data
  const currentUser = JSON.parse(currentUserJSON);
  
  // Check if user is a farmer
  if (currentUser.userType.trim().toLowerCase() !== "farmer") {
    window.location.href = "dashboard.html";
    return;
  }

  // Sample transaction data (in a real app, this would come from an API)
  let transactions = [
    {
      txnId: "TXN001",
      vegetableName: "Carrot",
      date: "2024-03-10",
      weight: "5.2",
      earning: 535.35,
    },
    {
      txnId: "TXN002",
      vegetableName: "Potato",
      date: "2024-03-11",
      weight: "8.5",
      earning: 863.2,
    },
    {
      txnId: "TXN003",
      vegetableName: "Tomato",
      date: "2024-03-12",
      weight: "6.0",
      earning: 597.6,
    },
    {
      txnId: "TXN004",
      vegetableName: "Onion",
      date: "2024-03-13",
      weight: "15.0",
      earning: 1058.25,
    },
    {
      txnId: "TXN005",
      vegetableName: "Spinach",
      date: "2024-03-14",
      weight: "12.0",
      earning: 705.5,
    },
  ];

  // DOM elements
  const transactionsContainer = document.getElementById("transactions-container");
  const searchInput = document.getElementById("search-input");
  const columnHeaders = document.querySelectorAll(".column-header");
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
        <div class="transaction-cell">${transaction.weight} kg</div>
        <div class="transaction-cell">₹${transaction.earning.toFixed(2)}</div>
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
        case "weight":
          valueA = parseFloat(a.weight);
          valueB = parseFloat(b.weight);
          break;
        case "earning":
          valueA = a.earning;
          valueB = b.earning;
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

  // Filter transactions
  function filterTransactions(searchTerm) {
    if (!searchTerm) {
      renderTransactions(transactions);
      return;
    }

    const filteredTransactions = transactions.filter(transaction => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        transaction.txnId.toLowerCase().includes(searchTermLower) ||
        transaction.vegetableName.toLowerCase().includes(searchTermLower) ||
        transaction.date.includes(searchTerm) ||
        transaction.weight.includes(searchTerm) ||
        transaction.earning.toString().includes(searchTerm)
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

  logoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Initial render
  renderTransactions(transactions);
});