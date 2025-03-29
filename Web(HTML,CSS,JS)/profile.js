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

  // Update history link based on user role
  const historyLink = document.getElementById("history-link");
  if (currentUser.userType.trim().toLowerCase() === "farmer") {
    historyLink.href = "farmer-history.html";
  } else {
    historyLink.href = "customer-history.html";
  }

  // DOM elements
  const profilePhoto = document.getElementById("profile-photo");
  const uploadPhotoBtn = document.getElementById("upload-photo-btn");
  const photoUploadInput = document.getElementById("photo-upload-input");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const genderDropdownBtn = document.getElementById("gender-dropdown-btn");
  const genderOptions = document.getElementById("gender-options");
  const selectedGender = document.getElementById("selected-gender");
  const updateProfileBtn = document.getElementById("update-profile-btn");
  const profileIcon = document.getElementById("profile-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const logoutButton = document.getElementById("logout-button");

  // Initialize form with user data
  usernameInput.value = currentUser.username || "";
  emailInput.value = currentUser.email || "";
  phoneInput.value = currentUser.phone || "";
  addressInput.value = currentUser.address || "";
  
  if (currentUser.gender) {
    selectedGender.textContent = currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1);
  }
  
  if (currentUser.photoUrl) {
    profilePhoto.src = currentUser.photoUrl;
    profileIcon.src = currentUser.photoUrl;
  }

  // Toggle gender dropdown
  genderDropdownBtn.addEventListener("click", function() {
    genderOptions.style.display = genderOptions.style.display === "block" ? "none" : "block";
  });

  // Select gender option
  document.querySelectorAll(".gender-option").forEach(option => {
    option.addEventListener("click", function() {
      selectedGender.textContent = this.textContent;
      genderOptions.style.display = "none";
    });
  });

  // Close gender dropdown when clicking outside
  document.addEventListener("click", function(event) {
    if (!genderDropdownBtn.contains(event.target) && !genderOptions.contains(event.target)) {
      genderOptions.style.display = "none";
    }
  });

  // Handle photo upload
  uploadPhotoBtn.addEventListener("click", function() {
    photoUploadInput.click();
  });

  photoUploadInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePhoto.src = e.target.result;
        profileIcon.src = e.target.result;
        currentUser.photoUrl = e.target.result;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      };
      reader.readAsDataURL(file);
    }
  });

  // Update profile
  updateProfileBtn.addEventListener("click", function() {
    // Get updated values
    const updatedUsername = usernameInput.value.trim();
    const updatedPhone = phoneInput.value.trim();
    const updatedAddress = addressInput.value.trim();
    const updatedGender = selectedGender.textContent.toLowerCase();

    // Validate inputs
    if (!updatedUsername) {
      alert("Username cannot be empty");
      return;
    }

    // Update current user data
    currentUser.username = updatedUsername;
    currentUser.phone = updatedPhone;
    currentUser.address = updatedAddress;
    currentUser.gender = updatedGender;

    // Update session storage
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update in registered users (if username changed)
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const userIndex = registeredUsers.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = currentUser;
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }

    // Show success message
    alert("Profile updated successfully!");
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
});