// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaCheck } from "react-icons/fa";
// import { storage } from './../firebase'; // Firebase storage
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// const Product = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [srtFile, setSrtFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [newSrtFileName, setNewSrtFileName] = useState(null);
// const [processingStatus, setProcessingStatus] = useState('');

//   const uploadFileToFirebase = (file, folder) => {
//     const storageRef = ref(storage, `${folder}/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Track the progress
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress); // Update progress state
//       },
//       (error) => {
//         console.error('Upload failed:', error);
//       },
//       () => {
//         // When the upload is complete, get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log(`${file.name} available at:`, downloadURL);
//           // If both files are uploaded, process them
//           if (videoFile && srtFile) {
//             handleProcessFiles(downloadURL, srtFile.name);
//           }
//         });
//       }
//     );
//   };

//   const handleProcessFiles = async (videoURL, subtitleName) => {
//     try {
//       const response = await fetch('http://localhost:9874/process-files', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           videoFilePath: videoURL,
//           subtitleFilePath: `subtitles/${subtitleName}`,
//         }),
//       });
  
//       const data = await response.json();
//       if (data.message === 'Processing complete') {
//         setProcessingStatus('Processing complete!');
  
//         // Store the new SRT file name
//         setNewSrtFileName(data.newSrtFileName);
//       } else {
//         setProcessingStatus('Processing failed: ' + data.error);
//       }
//     } catch (error) {
//       console.error('Error processing files:', error);
//       setProcessingStatus('Error processing files');
//     }
//   };
  
//   const onDropVideo = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setVideoFile(file);
//     setVideoPreview(URL.createObjectURL(file)); // Show video preview
//     uploadFileToFirebase(file, 'videos'); // Upload to Firebase in 'videos' folder
//   }, []);

//   const onDropSrt = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setSrtFile(file);
//     uploadFileToFirebase(file, 'subtitles'); // Upload to Firebase in 'subtitles' folder
//   }, []);

//   const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isDragActiveVideo } = useDropzone({
//     onDrop: onDropVideo,
//     accept: 'video/*',
//   });

//   const { getRootProps: getSrtRootProps, getInputProps: getSrtInputProps, isDragActive: isDragActiveSrt } = useDropzone({
//     onDrop: onDropSrt,
//     accept: '.srt',
//   });

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[90vh] text-white text-center">
//       <h1 className="text-3xl font-bold mb-6">Upload subtitles and Video files</h1>

//       <div className="space-y-6">
//         {/* Video Upload Section */}
//         <div
//           className={`relative w-80 h-32 border-2 text-bold opacity-50 text-black border rounded-lg flex items-center justify-center cursor-pointer ${
//             isDragActiveVideo ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-white'
//           }`}
//           {...getVideoRootProps()}
//         >
//           <input {...getVideoInputProps()} />
//           {isDragActiveVideo ? (
//             <p className="text-blue-600">Drop the video file here...</p>
//           ) : videoFile ? (
//             <div className="text-green-600">
//               <p>Video uploaded successfully!</p>
//               <FaCheck className="h-6 w-6 text-green-600 absolute top-2 right-2" />
//             </div>
//           ) : (
//             <p>Drag and drop a video file here, or click to select a video</p>
//           )}
//         </div>

//         {/* Subtitle Upload Section */}
//         <div
//           className={`relative w-80 h-32 border-2 text-bold opacity-50 text-black border rounded-lg flex items-center justify-center cursor-pointer ${
//             isDragActiveVideo ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-white'
//           }`}
//           {...getSrtRootProps()}
//         >
//           <input {...getSrtInputProps()} />
//           {isDragActiveSrt ? (
//             <p className="text-green-600">Drop the subtitle (.srt) file here...</p>
//           ) : srtFile ? (
//             <div className="text-green-600">
//               <p>Subtitle uploaded: {srtFile.name}</p>
//               <FaCheck className="h-6 w-6 text-green-600 absolute top-2 right-2" />
//             </div>
//           ) : (
//             <p>Drag and drop a subtitle file here, or click to select a subtitle (.srt)</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-8">
//         {uploadProgress > 0 && uploadProgress < 100 && (
//           <div className="w-full bg-gray-200 h-4 rounded-lg">
//             <div
//               className="bg-green-500 h-4 rounded-lg"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         )}

//         {videoFile && srtFile ? (
//           <div className="text-center">
//             <p className="text-green-600 mb-4">Video and subtitle uploaded successfully! Ready for preview.</p>

//             {/* Video Preview */}
//             {videoPreview && (
//               <video className="rounded-lg shadow-lg" controls width="400">
//                 <source src={videoPreview} type={videoFile.type} />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </div>
//         ) : (
//           <p className="text-white-500">Please upload a video and subtitle file to preview the output.</p>
//         )}

//         {processingStatus && <p className="text-yellow-600">{processingStatus}</p>}
//       </div>
//       <div className="text-center">
//     {newSrtFileName && (
//       <a
//         href={`http://localhost:9874/download-srt/${newSrtFileName}`}
//         className="text-blue-600 underline"
//         download
//       >
//         Download New SRT File
//       </a>
//     )}
//   </div>
//     </div>
//   );
// };

// export default Product;


import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheck } from "react-icons/fa";

const Product = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [srtFile, setSrtFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');

  const onDropVideo = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  }, []);

  const onDropSrt = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSrtFile(file);
  }, []);

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isDragActiveVideo } = useDropzone({
    onDrop: onDropVideo,
    accept: 'video/*',
  });

  const { getRootProps: getSrtRootProps, getInputProps: getSrtInputProps, isDragActive: isDragActiveSrt } = useDropzone({
    onDrop: onDropSrt,
    accept: '.srt',
  });

  const handleProcessFiles = async () => {
    if (!videoFile || !srtFile) return;
  
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('subtitle', srtFile);
  
    try {
      setProcessingStatus('Processing files...');
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'adjusted_subtitles.srt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setProcessingStatus('Processing complete. File downloaded.');
      } else {
        const errorData = await response.text();
        console.error('Processing failed:', errorData);
        setProcessingStatus(`Processing failed: ${errorData}`);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setProcessingStatus(`Error processing files: ${error.message}`);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-white text-center">
      <h1 className="text-3xl font-bold mb-6">Upload Subtitles and Video Files</h1>

      <div className="space-y-6">
        {/* Video Upload Section */}
        <div
          {...getVideoRootProps()}
          className={`relative w-80 h-32 border-2 text-bold opacity-50 text-black border rounded-lg flex items-center justify-center cursor-pointer ${
            isDragActiveVideo ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-white'
          }`}
        >
          <input {...getVideoInputProps()} />
          {isDragActiveVideo ? (
            <p className="text-blue-600">Drop the video file here...</p>
          ) : videoFile ? (
            <div className="text-green-600">
              <p>Video uploaded successfully!</p>
              <FaCheck className="h-6 w-6 text-green-600 absolute top-2 right-2" />
            </div>
          ) : (
            <p>Drag and drop a video file here, or click to select a video</p>
          )}
        </div>

        {/* Subtitle Upload Section */}
        <div
          {...getSrtRootProps()}
          className={`relative w-80 h-32 border-2 text-bold opacity-50 text-black border rounded-lg flex items-center justify-center cursor-pointer ${
            isDragActiveSrt ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-white'
          }`}
        >
          <input {...getSrtInputProps()} />
          {isDragActiveSrt ? (
            <p className="text-green-600">Drop the subtitle (.srt) file here...</p>
          ) : srtFile ? (
            <div className="text-green-600">
              <p>Subtitle uploaded: {srtFile.name}</p>
              <FaCheck className="h-6 w-6 text-green-600 absolute top-2 right-2" />
            </div>
          ) : (
            <p>Drag and drop a subtitle file here, or click to select a subtitle (.srt)</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 h-4 rounded-lg">
            <div
              className="bg-green-500 h-4 rounded-lg"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {videoFile && srtFile ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">Video and subtitle uploaded successfully! Ready for preview.</p>

            {/* Video Preview */}
            {videoPreview && (
              <video className="rounded-lg shadow-lg" controls width="400">
                <source src={videoPreview} type={videoFile.type} />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Process and Download Button */}
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" 
              onClick={handleProcessFiles}
            >
              Process and Download
            </button>
          </div>
        ) : (
          <p className="text-white-500">Please upload a video and subtitle file to proceed.</p>
        )}

        {processingStatus && <p className="text-yellow-600">{processingStatus}</p>}
      </div>
    </div>
  );
};

export default Product;