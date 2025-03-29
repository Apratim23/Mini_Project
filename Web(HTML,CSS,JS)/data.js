/**
 * Data storage and retrieval functionality
 * Uses localStorage for client-side persistence
 */

// Save user data to localStorage
function saveUserData(userData) {
  // Get existing users or initialize empty array
  const existingUsers = getUsersData() || [];

  // Add new user
  existingUsers.push(userData);

  // Save back to localStorage
  localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

  return true;
}

// Update existing user data
function updateUserData(username, updatedData) {
  const users = getUsersData();
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex !== -1) {
    // Update user data with new values
    users[userIndex] = { ...users[userIndex], ...updatedData };

    // Save back to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    return true;
  }

  return false;
}

// Save transaction data
function saveTransaction(transactionData) {
  // Get existing transactions or initialize empty array
  const existingTransactions = getTransactions() || [];

  // Add new transaction
  existingTransactions.push(transactionData);

  // Save back to localStorage
  localStorage.setItem("transactions", JSON.stringify(existingTransactions));

  return true;
}

// Get all transactions
function getTransactions() {
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

// Get transactions for a specific user
function getUserTransactions(username) {
  const transactions = getTransactions();
  return transactions.filter((transaction) => transaction.userId === username);
}

// Save farmer transaction data
function saveFarmerTransaction(transactionData) {
  // Get existing transactions or initialize empty array
  const existingTransactions = getFarmerTransactions() || [];

  // Add new transaction
  existingTransactions.push(transactionData);

  // Save back to localStorage
  localStorage.setItem(
    "farmerTransactions",
    JSON.stringify(existingTransactions),
  );

  return true;
}

// Get all farmer transactions
function getFarmerTransactions() {
  const transactions = localStorage.getItem("farmerTransactions");
  return transactions ? JSON.parse(transactions) : [];
}

// Get transactions for a specific farmer
function getFarmerTransactionsByFarmerId(farmerId) {
  const transactions = getFarmerTransactions();
  return transactions.filter(
    (transaction) => transaction.farmerId === farmerId,
  );
}

// Save farmer transaction data
function saveFarmerTransaction(transactionData) {
  // Get existing transactions or initialize empty array
  const existingTransactions = getFarmerTransactions() || [];

  // Add new transaction
  existingTransactions.push(transactionData);

  // Save back to localStorage
  localStorage.setItem(
    "farmerTransactions",
    JSON.stringify(existingTransactions),
  );

  return true;
}

// Get all farmer transactions
function getFarmerTransactions() {
  const transactions = localStorage.getItem("farmerTransactions");
  return transactions ? JSON.parse(transactions) : [];
}

// Get transactions for a specific farmer
function getFarmerTransactions(farmerId) {
  const transactions = getFarmerTransactions();
  return transactions.filter(
    (transaction) => transaction.farmerId === farmerId,
  );
}

// Get all registered users
function getUsersData() {
  const usersData = localStorage.getItem("registeredUsers");
  return usersData ? JSON.parse(usersData) : [];
}

// Verify login credentials
function verifyCredentials(username, password) {
  const users = getUsersData();

  // Find user with matching username and password
  const matchedUser = users.find(
    (user) => user.username === username && user.password === password,
  );

  // Ensure user type is properly formatted if user exists
  if (matchedUser) {
    // Make sure userType exists and is properly formatted
    if (!matchedUser.userType) {
      matchedUser.userType = "customer"; // Default to customer if missing
    }

    // Log for debugging
    console.log(
      "Found user:",
      matchedUser.username,
      "Type:",
      matchedUser.userType,
    );
  }

  return matchedUser || null;
}

// Check if username already exists
function usernameExists(username) {
  const users = getUsersData();
  return users.some((user) => user.username === username);
}
