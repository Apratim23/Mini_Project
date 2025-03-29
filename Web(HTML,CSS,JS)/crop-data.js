/**
 * Crop data submission functionality
 * This file handles the submission of crop data by farmers
 */

// Sample crop types
const cropTypes = [
    "Tomato",
    "Potato",
    "Onion",
    "Carrot",
    "Spinach",
    "Cabbage",
    "Cucumber",
    "Lettuce",
    "Broccoli",
    "Cauliflower",
  ];
  
  // Save crop data
  function saveCropData(cropData) {
    // Get existing crop data or initialize empty array
    const existingCropData = getCropData() || [];
  
    // Add new crop data
    existingCropData.push(cropData);
  
    // Save back to localStorage
    localStorage.setItem("cropData", JSON.stringify(existingCropData));
  
    return true;
  }
  
  // Get all crop data
  function getCropData() {
    const cropData = localStorage.getItem("cropData");
    return cropData ? JSON.parse(cropData) : [];
  }
  
  // Get crop data for a specific farmer
  function getFarmerCropData(farmerId) {
    const cropData = getCropData();
    return cropData.filter((data) => data.farmerId === farmerId);
  }
  
  // Create crop submission form
  function createCropSubmissionForm(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Create form HTML
    const formHTML = `
      <div class="crop-form-container">
        <h3 class="form-title">Submit Crop Data</h3>
        <form id="crop-data-form">
          <div class="form-group">
            <label for="crop-type">Crop Type</label>
            <select id="crop-type" required>
              <option value="" disabled selected>Select crop type</option>
              ${cropTypes.map((crop) => `<option value="${crop}">${crop}</option>`).join("")}
            </select>
          </div>
  
          <div class="form-group">
            <label for="crop-quantity">Quantity (kg)</label>
            <input type="number" id="crop-quantity" min="0.1" step="0.1" required>
          </div>
  
          <div class="form-group">
            <label for="crop-quality">Quality</label>
            <select id="crop-quality" required>
              <option value="" disabled selected>Select quality</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="harvest-date">Harvest Date</label>
            <input type="date" id="harvest-date" required>
          </div>
  
          <div class="form-group">
            <label for="price-per-kg">Price per kg (₹)</label>
            <input type="number" id="price-per-kg" min="1" step="0.01" required>
          </div>
  
          <button type="submit" class="submit-btn">Submit Crop Data</button>
        </form>
      </div>
    `;
  
    // Add form to container
    container.innerHTML = formHTML;
  
    // Add event listener for form submission
    const form = document.getElementById("crop-data-form");
    form.addEventListener("submit", handleCropDataSubmission);
  }
  
  // Handle crop data submission
  function handleCropDataSubmission(event) {
    event.preventDefault();
  
    // Get current user
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) return;
  
    // Get form values
    const cropType = document.getElementById("crop-type").value;
    const quantity = parseFloat(document.getElementById("crop-quantity").value);
    const quality = document.getElementById("crop-quality").value;
    const harvestDate = document.getElementById("harvest-date").value;
    const pricePerKg = parseFloat(document.getElementById("price-per-kg").value);
  
    // Create crop data object
    const cropData = {
      id: `crop-${Date.now()}`,
      farmerId: currentUser.username,
      cropType,
      quantity,
      quality,
      harvestDate,
      pricePerKg,
      totalValue: quantity * pricePerKg,
      submissionDate: new Date().toISOString(),
    };
  
    // Save crop data
    if (saveCropData(cropData)) {
      alert("Crop data submitted successfully!");
      document.getElementById("crop-data-form").reset();
    } else {
      alert("Error submitting crop data. Please try again.");
    }
  }
  
  // Export functions
  window.cropDataModule = {
    createCropSubmissionForm,
    saveCropData,
    getCropData,
    getFarmerCropData,
  };
  