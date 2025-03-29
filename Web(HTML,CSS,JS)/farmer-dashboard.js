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
  
    // Set user information
    document.getElementById("user-name").textContent = currentUser.username;
    document.getElementById("user-type").textContent = currentUser.userType;
  
    // Set current date and time
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      document.getElementById("current-time-date").textContent =
        `${timeString}, ${dateString}`;
    };
    updateDateTime();
    setInterval(updateDateTime, 60000);
  
    // Toggle dropdown menu
    document.getElementById("profile-icon").addEventListener("click", function (event) {
      event.stopPropagation();
      document.getElementById("dropdown-menu").classList.toggle("show");
    });
  
    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      const dropdownMenu = document.getElementById("dropdown-menu");
      if (dropdownMenu.classList.contains("show") && !event.target.closest(".profile-container")) {
        dropdownMenu.classList.remove("show");
      }
    });
  
    // Logout functionality
    document.getElementById("logout-button").addEventListener("click", function (event) {
      event.preventDefault();
      sessionStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  
    // Card click functionality
    document.getElementById("income-card").addEventListener("click", function() {
      window.location.href = "farmer-history.html";
    });
  
    document.getElementById("submit-card").addEventListener("click", function() {
      window.location.href = "inventory.html";
    });
  
    document.getElementById("compost-card").addEventListener("click", function() {
      // Implement compost request functionality
      alert("Compost request feature will be implemented soon!");
    });
  });