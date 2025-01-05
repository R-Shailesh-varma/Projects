document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadButton");
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const status = document.getElementById("status");

    // Event listener for the image input change event (when a file is selected)
    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                imageInput.value = ""; // Clear the input
                imagePreview.style.display = "none"; // Hide the preview if not an image
                status.textContent = "Please upload a valid image file.";
                status.style.color = "red";
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.style.display = "block";
                imagePreview.src = e.target.result;
                status.textContent = ""; // Clear status if file is valid
            };
            reader.readAsDataURL(file);
        }
    });

    // Upload button click event
    uploadButton.addEventListener("click", uploadImage);
});

async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const status = document.getElementById("status");
    const loading = document.getElementById("loading");

    if (!fileInput.files.length) {
        status.textContent = "Please choose an image to upload.";
        status.style.color = "red";
        return;
    }

    const selectedFile = fileInput.files[0];

    // Check if the file is an image (additional check)
    if (!selectedFile.type.startsWith("image/")) {
        status.textContent = "Only image files are allowed.";
        status.style.color = "red";
        return;
    }

    loading.style.display = "block";  // Show loading spinner
    status.textContent = "";
    status.style.color = "black";  // Reset status color

    try {
        const selectedImage = await selectedFile.arrayBuffer();

        // Initialize the client and make an API call to the new endpoint
        const client = await window.gradioClient(
            "https://moazx-plant-leaf-diseases-detection-using-cnn.hf.space/"
        );

        const result = await client.predict("/predict", [
            new Blob([selectedImage]) // Send the image blob as input
        ]);

        displayResults(result.data);
    } catch (error) {
        console.error("Error:", error);
        status.textContent = "Error uploading and predicting image: " + (error.message || "unknown error");
        status.style.color = "red";
    } finally {
        loading.style.display = "none";  // Hide loading spinner
    }
}

function displayResults(data) {
    const rightPanel = document.querySelector(".right-panel");
    const status = document.getElementById("status");
    status.innerHTML = "";

    if (data && data.length > 0 && data[0].confidences) {
        // Sort results by confidence
        const sortedConfidences = data[0].confidences.sort((a, b) =>
            parseFloat(b.confidence) - parseFloat(a.confidence)
        ).slice(0, 5);

        // Create container for displaying the results
        const resultsContainer = document.createElement("div");
        resultsContainer.className = "results-container";

        sortedConfidences.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";

            const label = document.createElement("div");
            label.className = "disease-label";
            label.textContent = result.label;

            const confidenceValue = document.createElement("div");
            confidenceValue.className = "confidence-value";
            const confidence = (parseFloat(result.confidence) * 100).toFixed(2);
            confidenceValue.textContent = `${confidence}%`;

            const progressContainer = document.createElement("div");
            progressContainer.className = "progress-container";

            const progressBar = document.createElement("div");
            progressBar.className = "progress-bar";
            progressBar.style.width = `${confidence}%`;

            progressContainer.appendChild(progressBar);
            resultItem.appendChild(label);
            resultItem.appendChild(confidenceValue);
            resultItem.appendChild(progressContainer);

            resultsContainer.appendChild(resultItem);
        });

        // Remove old results if they exist
        const existingResults = rightPanel.querySelector(".results-container");
        if (existingResults) {
            existingResults.remove();
        }

        rightPanel.appendChild(resultsContainer);
    } else {
        status.textContent = "No prediction results available.";
        status.style.color = "red";
    }
}
