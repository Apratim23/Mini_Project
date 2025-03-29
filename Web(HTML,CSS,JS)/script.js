document.addEventListener("DOMContentLoaded", function () {
    // State management
    const state = {
      isDropdownOpen: false,
  
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
        update();
      },
  
      closeDropdown() {
        this.isDropdownOpen = false;
        update();
      },
    };
  
    // DOM elements
    const dropdownToggle = document.querySelector(".profile-dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const timeDisplay = document.querySelector(".time-display");
    const dateDisplay = document.querySelector(".date-display");
    const logoutButton = document.getElementById("logout-button");
    const editProfileButton = document.getElementById("edit-profile-button");
    const usernameDisplay = document.getElementById("username-display");
    const userTypeDisplay = document.getElementById("user-type-display");
  
    // Check if user is logged in
    const currentUserJSON = sessionStorage.getItem("currentUser");
  
    if (!currentUserJSON) {
      // Redirect to login if not logged in
      window.location.href = "login.html";
      return;
    }
  
    // Parse user data
    const currentUser = JSON.parse(currentUserJSON);
  
    // Display user information
    if (usernameDisplay) {
      usernameDisplay.textContent = currentUser.username;
    }
  
    if (userTypeDisplay) {
      userTypeDisplay.textContent = currentUser.userType;
    }
  
    // Handle logout
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        // Clear session storage
        sessionStorage.removeItem("currentUser");
  
        // Redirect to login page
        window.location.href = "login.html";
      });
    }
  
    // Handle edit profile
    if (editProfileButton) {
      editProfileButton.addEventListener("click", function () {
        // Redirect to profile page
        window.location.href = "profile.html";
      });
    }
  
    // Handle history button
    const historyButton = document.getElementById("history-button");
    if (historyButton) {
      historyButton.addEventListener("click", function () {
        // Redirect to appropriate history page based on user type
        if (currentUser.userType === "farmer") {
          window.location.href = "farmer-history.html";
        } else {
          window.location.href = "customer-history.html";
        }
      });
    }
  
    // Update the UI based on state
    function update() {
      // Update dropdown visibility
      dropdownToggle.setAttribute("aria-expanded", state.isDropdownOpen);
      dropdownMenu.style.display = state.isDropdownOpen ? "block" : "none";
    }
  
    // Event Listeners
    dropdownToggle.addEventListener("click", function () {
      state.toggleDropdown();
    });
  
    dropdownToggle.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        state.toggleDropdown();
      }
      if (event.key === "Escape") {
        state.closeDropdown();
      }
    });
  
    // Add event listeners to dropdown items
    dropdownItems.forEach((item) => {
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          // Handle the action based on which item was clicked
          if (item.id === "logout-button") {
            // Clear session storage
            sessionStorage.removeItem("currentUser");
  
            // Redirect to login page
            window.location.href = "login.html";
          }
          state.closeDropdown();
        }
      });
  
      item.addEventListener("click", function () {
        // Handle the action based on which item was clicked
        state.closeDropdown();
      });
    });
  
    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !dropdownToggle.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        state.closeDropdown();
      }
    });
  
    // Update date and time
    function updateDateTime() {
      const now = new Date();
  
      // Format time (HH:MM)
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
  
      // Format date (Month Day, Year)
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateString = now.toLocaleDateString("en-US", options);
  
      // Update the DOM
      timeDisplay.textContent = timeString;
      dateDisplay.textContent = dateString;
    }
  
    // Initial update
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
  
    // Initial UI update
    update();
  });
  