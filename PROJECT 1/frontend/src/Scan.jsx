import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"

const Scan = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file); // Log the selected file

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log("File read as base64:", reader.result); // Log the base64 result
        setPreview(reader.result);  // Set the base64 image preview
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error); // Log error reading the file
        setStatus("Error reading file");
      };

      reader.readAsDataURL(file);  // Read the file as base64 string
    }
  };

  // Handle upload and API request
  const handleUpload = async () => {
    if (!image) {
      setStatus("Please choose an image to upload.");
      console.log("No image selected");
      return;
    }

    setLoading(true);
    setStatus('');
    setResults([]);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      console.log("Image base64 to be sent:", base64Image); // Log the base64 image data

      try {
        // Make the API call to backend (which communicates with Gradio)
        const response = await axios.get("http://localhost:5000/upload", {
          params: { image: base64Image },
        });
        console.log("API response:", response.data); // Log the API response
        setResults(response.data); // Set the results for display
      } catch (error) {
        console.error("Error uploading image:", error); // Log any error in uploading
        setStatus("Error uploading and predicting image.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);  // Read the selected image file as base64
  };

  return (
    <div>
      <h1>Upload and Predict</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload and Predict</button>

      {status && <p>{status}</p>}
      {loading && <p>Loading...</p>}

      {preview && <img src={preview} alt="Preview" width="300" />}

      {results.length > 0 && (
        <div>
          <h2>Prediction Results</h2>
          {results.map((result, index) => (
            <div key={index}>
              <div>{result.label}</div>
              <div>{result.confidence}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scan;
