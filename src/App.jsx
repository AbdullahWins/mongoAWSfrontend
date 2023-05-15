import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  console.log(baseUrl);

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

      // Use the publicURL as needed (e.g., store it in MongoDB)
      // ...
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
