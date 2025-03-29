/**
 * Debugging utility for user authentication
 * This file helps diagnose issues with user login and redirection
 */

// Function to check stored users and their types
function checkStoredUsers() {
    const users = localStorage.getItem("registeredUsers");
  
    if (!users) {
      console.log("No users found in localStorage");
      return [];
    }
  
    try {
      const parsedUsers = JSON.parse(users);
      console.log("Stored users:", parsedUsers);
  
      // Log each user's type
      parsedUsers.forEach((user, index) => {
        console.log(
          `User ${index + 1}: ${user.username}, Type: ${user.userType}`,
        );
      });
  
      return parsedUsers;
    } catch (error) {
      console.error("Error parsing users:", error);
      return [];
    }
  }
  
  // Function to check current logged in user
  function checkCurrentUser() {
    const currentUser = sessionStorage.getItem("currentUser");
  
    if (!currentUser) {
      console.log("No user currently logged in");
      return null;
    }
  
    try {
      const parsedUser = JSON.parse(currentUser);
      console.log("Current user:", parsedUser);
      console.log("User type:", parsedUser.userType);
      return parsedUser;
    } catch (error) {
      console.error("Error parsing current user:", error);
      return null;
    }
  }
  
  // Function to fix user type if needed
  function fixUserType(username, correctType) {
    const users = checkStoredUsers();
  
    if (users.length === 0) {
      return false;
    }
  
    const userIndex = users.findIndex((user) => user.username === username);
  
    if (userIndex === -1) {
      console.log(`User ${username} not found`);
      return false;
    }
  
    // Update the user type
    const oldType = users[userIndex].userType;
    users[userIndex].userType = correctType;
  
    // Save back to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    console.log(
      `Updated user ${username} type from "${oldType}" to "${correctType}"`,
    );
  
    return true;
  }
  
  // Add to window for console access
  window.debugAuth = {
    checkStoredUsers,
    checkCurrentUser,
    fixUserType,
  };
  
  console.log(
    "Auth debugging utilities loaded. Use debugAuth.checkStoredUsers() or debugAuth.checkCurrentUser() to debug.",
  );
  