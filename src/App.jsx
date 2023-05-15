import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseUrl, setResponseUrl] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Make a request to your backend API endpoint
      const response = await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Access the public URL from the response
      const publicURL = response.data.publicURL;

      // Set the response URL in state
      setResponseUrl(publicURL);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {responseUrl && <p>Response URL: {responseUrl}</p>}
    </div>
  );
}

export default App;
