import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheck } from "react-icons/fa";
import { storage } from './../firebase'; // Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Product = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [srtFile, setSrtFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFileToFirebase = (file, folder) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track the progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Update progress state
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(`${file.name} available at:`, downloadURL);
        });
      }
    );
  };

  const onDropVideo = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file)); // Show video preview
    uploadFileToFirebase(file, 'videos'); // Upload to Firebase in 'videos' folder
  }, []);

  const onDropSrt = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSrtFile(file);
    uploadFileToFirebase(file, 'subtitles'); // Upload to Firebase in 'subtitles' folder
  }, []);

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isDragActiveVideo } = useDropzone({
    onDrop: onDropVideo,
    accept: 'video/*',
  });

  const { getRootProps: getSrtRootProps, getInputProps: getSrtInputProps, isDragActive: isDragActiveSrt } = useDropzone({
    onDrop: onDropSrt,
    accept: '.srt',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">Upload subtitles and Video files</h1>

      <div className="space-y-6">
        {/* Video Upload Section */}
        <div
          className={`relative w-80 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
            isDragActiveVideo ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-white'
          }`}
          {...getVideoRootProps()}
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
          className={`relative w-80 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
            isDragActiveSrt ? 'border-green-500 bg-green-50' : 'border-gray-400 bg-white'
          }`}
          {...getSrtRootProps()}
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
          </div>
        ) : (
          <p className="text-red-500">Please upload a video and subtitle file to preview the output.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
