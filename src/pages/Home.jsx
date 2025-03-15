import React from "react";
import MusicFolderSelector from "../components/MusicFolderSelector";
import TrackList from "../components/TrackList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = ({
  onFilesSelected,
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        I am Alex, I am building a music app!
      </Typography>

      <MusicFolderSelector onFilesSelected={onFilesSelected} />

      <TrackList
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={onTrackSelect}
      />

      {!tracks || tracks.length === 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
            How to use:
          </Typography>
          <Typography component="ol" sx={{ pl: 2, color: "white" }}>
            <li>
              Click "Choose Music Folder" to select a folder containing your
              music files
            </li>
            <li>Your music files will appear in the list</li>
            <li>
              Use the player controls at the bottom to play, pause, and navigate
              your music
            </li>
            <li>Adjust volume using the slider in the bottom right</li>
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default Home;
