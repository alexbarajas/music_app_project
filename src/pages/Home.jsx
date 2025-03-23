import React from "react";
import MusicFolderSelector from "../components/MusicFolderSelector";
import TrackList from "../components/TrackList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const Home = ({
  onFilesSelected,
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          color: theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        I am Alex, I am building a music app!
      </Typography>

      <MusicFolderSelector onFilesSelected={onFilesSelected} />

      <TrackList
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={onTrackSelect}
      />

      {!tracks || tracks.length === 0 ? (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            How to use:
          </Typography>
          <Typography
            component="ol"
            sx={{
              pl: 2,
              color: theme.palette.text.secondary,
            }}
          >
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
