import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    duration,
    currentTime,
    handleFilesSelected,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleVolumeChange,
    handleTrackSelect,
    handleSeek,
    getCurrentTrack,
    getTrackTitle,
    getArtistName,
    hasPrevious,
    hasNext,
  } = AudioPlayer();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Header toggleDrawer={toggleDrawer} />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            mt: 8, // Account for fixed header height
            mb: 7, // Account for footer height
            width: "100%",
          }}
        >
          <Sidebar open={drawerOpen} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { xs: drawerOpen ? 8 : 2, sm: drawerOpen ? 2 : 2 }, // Responsive margin based on drawer state
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onFilesSelected={handleFilesSelected}
                    tracks={tracks}
                    currentTrackIndex={currentTrackIndex}
                    onTrackSelect={handleTrackSelect}
                  />
                }
              />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Box>
        </Box>
        <Footer
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          trackTitle={getTrackTitle()}
          artistName={getArtistName()}
          currentTrack={getCurrentTrack()}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          duration={duration}
          currentTime={currentTime}
          onSeek={handleSeek}
        />
      </Box>
    </Router>
  );
}
