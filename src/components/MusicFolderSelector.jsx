import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";

const MusicFolderSelector = ({ onFilesSelected }) => {
  const [folderPath, setFolderPath] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const folderInputRef = useRef(null);

  const handleFolderSelect = async (e) => {
    const fileList = e.target.files;
    if (!fileList.length) return;

    setIsLoading(true);

    // Get folder path (this will be partial due to security restrictions)
    const folderName = fileList[0].webkitRelativePath.split("/")[0];
    setFolderPath(folderName);

    // Filter for audio files
    const musicFiles = Array.from(fileList).filter(
      (file) =>
        file.type.startsWith("audio/") ||
        file.name.endsWith(".mp3") ||
        file.name.endsWith(".wav") ||
        file.name.endsWith(".ogg") ||
        file.name.endsWith(".flac") ||
        file.name.endsWith(".m4a") ||
        file.name.endsWith(".alac")
    );

    setFiles(musicFiles);

    // Pass files to parent component if callback exists
    if (onFilesSelected && typeof onFilesSelected === "function") {
      onFilesSelected(musicFiles);
    }

    setIsLoading(false);
  };

  const triggerFolderInput = () => {
    folderInputRef.current.click();
  };

  const clearSelection = () => {
    setFolderPath("");
    setFiles([]);
    // Reset the file input
    folderInputRef.current.value = "";

    // Pass empty array to parent component if callback exists
    if (onFilesSelected && typeof onFilesSelected === "function") {
      onFilesSelected([]);
    }
  };

  return (
    <div className="mb-8">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Music Folder Selection
      </Typography>
      <div className="mb-4">
        {/* Hide the actual file input completely */}
        <input
          ref={folderInputRef}
          type="file"
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleFolderSelect}
          style={{ display: "none" }}
        />

        <button
          onClick={triggerFolderInput}
          className="px-4 py-2 bg-purple-600 text-white rounded mr-2 hover:bg-purple-700"
        >
          Choose Music Folder
        </button>

        {folderPath && (
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicFolderSelector;
