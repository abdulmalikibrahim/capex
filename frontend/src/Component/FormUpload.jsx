import React, { useState } from 'react';
import axios from 'axios';

const FormUpload = ({API_URL,setReloadData,reloadData,showAlert,shop}) => {
    const [file, setFile] = useState(null)
    const [loadingUpload,setloadingUpload] = useState(false)
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the selected file
    };
    
    const handleSubmit = async (e) => {
        setloadingUpload(true)
        e.preventDefault();
        if (!file) {
            showAlert("Warning","Please select a file","warning")
            setloadingUpload(false)
            return
        }
        
        // Prepare the file for upload
        const formData = new FormData();
        formData.append("upload-file", file)
        formData.append("shop",shop)
        
        try {
            const response = await axios.post(`${API_URL}/uploadData`,formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Required for file uploads
                    },
                }
            );

            if (response.status === 200) {
                showAlert("Sukses","File uploaded successfully!","success")
                setReloadData(!reloadData)
                setFile(null)
            } else {
                showAlert("Error","File upload failed. Please try again.","error")
                setloadingUpload(false)
            }
        } catch (error) {
            showAlert("Error","An error occurred while uploading the file.","error")
            console.error("Error uploading file:", error)
            setloadingUpload(false)
        } finally {
            setloadingUpload(false)
        }
    };

    return (
        <div className='card'>
            <div className='card-header p-1 ps-2'>
                Upload Data
            </div>
            <div className='card-body p-0'>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <input type='file' className='form-control' id='file' accept='.xlsx' onChange={handleFileChange} />
                        <button type='submit' className='btn btn-primary'>{ loadingUpload ? <><i className="fas fa-spin fa-spinner"></i>&nbsp;Uploading...</> : <><i className="fas fa-upload pe-2"></i>Upload</> }</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormUpload;