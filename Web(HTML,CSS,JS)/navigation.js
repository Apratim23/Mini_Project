/**
 * Shared navigation functionality
 * This script handles navigation based on user type
 */

document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in
    const currentUserJSON = sessionStorage.getItem("currentUser");
  
    if (!currentUserJSON) {
      // If not on login page, redirect to login
      if (!window.location.href.includes("login.html")) {
        window.location.href = "login.html";
      }
      return;
    }
  
    // Parse user data
    const currentUser = JSON.parse(currentUserJSON);
  
    // Set up navigation based on user type
    setupNavigation(currentUser);
  
    // Set up dropdown menu
    setupDropdownMenu();
  });
  
  /**
   * Set up navigation based on user type
   */
  function setupNavigation(currentUser) {
    const isCustomer = currentUser.userType !== "farmer";
    const isFarmer = currentUser.userType === "farmer";
  
    // Get all navigation links
    const homeLinks = document.querySelectorAll(
      ".home-link, .nav-item:has(.home-icon)",
    );
    const dashboardLinks = document.querySelectorAll(
      ".dashboard-link, .nav-item:has(.dashboard-icon)",
    );
    const inventoryLinks = document.querySelectorAll(
      ".nav-item:has(.inventory-icon), a[href='inventory.html']",
    );
    const historyLinks = document.querySelectorAll(
      "#history-link, #history-button",
    );
  
    // Set up home and dashboard links
    homeLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (isFarmer) {
          window.location.href = "farmer-dashboard.html";
        } else {
          window.location.href = "dashboard.html";
        }
      });
    });
  
    dashboardLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (isFarmer) {
          window.location.href = "farmer-dashboard.html";
        } else {
          window.location.href = "dashboard.html";
        }
      });
    });
  
    // Set up history links
    historyLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (isFarmer) {
          window.location.href = "farmer-history.html";
        } else {
          window.location.href = "customer-history.html";
        }
      });
    });
  
    // Set up logout buttons
    const logoutButtons = document.querySelectorAll("#logout-button");
    logoutButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        // Clear session storage
        sessionStorage.removeItem("currentUser");
        // Redirect to login page
        window.location.href = "login.html";
      });
    });
  
    // Check if user is on the correct dashboard
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "dashboard.html" && isFarmer) {
      window.location.href = "farmer-dashboard.html";
    } else if (currentPage === "farmer-dashboard.html" && isCustomer) {
      window.location.href = "dashboard.html";
    }
  }
  
  /**
   * Set up dropdown menu functionality
   */
  function setupDropdownMenu() {
    const dropdownToggles = document.querySelectorAll(
      ".dropdown-icon, #menu-toggle, .profile-dropdown-toggle",
    );
  
    dropdownToggles.forEach((toggle) => {
      if (!toggle) return;
  
      // Find the closest dropdown menu
      const dropdownMenu = toggle
        .closest(".user-profile, .user-controls, .user-actions")
        ?.querySelector(".dropdown-menu");
  
      if (!dropdownMenu) return;
  
      // Toggle dropdown on click
      toggle.addEventListener("click", function () {
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });
  
      // Close dropdown when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !toggle.contains(event.target) &&
          !dropdownMenu.contains(event.target)
        ) {
          dropdownMenu.style.display = "none";
        }
      });
    });
  }
  