import { useState } from "react";
import { RouterProvider } from "react-router-dom";

function Scan() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePredict = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStatus('Prediction Result');
        }, 2000);
    };

    return (
        <>
            <div className="scan-main-container">
                <div className="scan-left-panel">
                    <h1>Plant Disease Detection</h1>
                    <div className="scan-upload-container">
                        <div className="scan-file-input-wrapper">
                            <input className="choose-button" type="file" id="imageInput" name="image" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <button className="scan-button" type="button" id="uploadButton" onClick={handlePredict}>
                            Upload and Predict
                        </button>
                    </div>
                    <div className="scan-preview-section">
                        <h2>Image Preview</h2>
                        <div className="scan-image-preview-container">
                            {image && <img id="imagePreview" src={image} alt="Preview" />}
                        </div>
                    </div>
                </div>

                <div className="scan-right-panel">
                    <h2>Results</h2>
                    <div id="status">{status}</div>
                </div>
            </div>
            {loading && (
                <div id="loading">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            )}
        </>
    );
}

export default Scan;
