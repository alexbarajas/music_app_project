import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Paper,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";

export default function Footer({
  isPlaying = false,
  onPlayPause = () => {},
  onPrevious = () => {},
  onNext = () => {},
  volume = 30,
  onVolumeChange = () => {},
  trackTitle = "No track selected",
  artistName = "Unknown Artist",
  currentTrack = null,
  hasPrevious = false,
  hasNext = false,
  duration = 0,
  currentTime = 0,
  onSeek = () => {},
  loopMode = "all",
  onLoopToggle = () => {},
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Get appropriate loop icon and tooltip text
  const getLoopInfo = () => {
    switch (loopMode) {
      case "one":
        return {
          icon: <RepeatOneIcon />,
          tooltip: "Repeat One",
          color: "primary.main",
        };
      case "all":
        return {
          icon: <RepeatIcon />,
          tooltip: "Repeat All",
          color: "primary.main",
        };
      default:
        return {
          icon: <RepeatIcon />,
          tooltip: "No Repeat",
          color: "text.secondary",
        };
    }
  };

  const loopInfo = getLoopInfo();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "auto", // Allow height to adjust for progress bar
        paddingBottom: 1,
        zIndex: 1300, // High z-index to ensure it's above everything
        backgroundColor: "lightblue",
        width: "100%", // Ensure full width
        boxSizing: "border-box", // Include padding in width calculation
        overflow: "visible", // This allows the slider thumb to overflow without being cut
      }}
    >
      {/* Progress bar - displayed at the top of the footer */}
      <Box sx={{ px: 2, pt: 1 }}>
        <Slider
          size="small"
          value={currentTime}
          max={duration || 100}
          onChange={(e, newValue) => onSeek(newValue)}
          aria-label="Progress"
          sx={{
            color: "black",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              backgroundColor: "black",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)",
              },
              "&.Mui-active": {
                width: 12,
                height: 12,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
            },
          }}
        />

        {/* Time display */}
        {!isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: -1,
              mb: 1,
              fontSize: "0.75rem",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(duration)}
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 56, // Standard height for main controls
          width: "100%",
          maxWidth: "100%",
          px: 1, // Reduced overall padding
        }}
      >
        {/* Track info - extremely simplified on small screens */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 1,
            width: { xs: "25%", sm: "30%" },
            minWidth: isSmallScreen ? "80px" : "120px",
            maxWidth: isSmallScreen ? "110px" : "200px",
          }}
        >
          {/* Show just the album art on very small screens */}
          <Box
            component="img"
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              flexShrink: 0,
              backgroundColor: currentTrack ? "#6b46c1" : "#e2e8f0", // Purple when track loaded
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            src="/api/placeholder/40/40"
            alt="Album cover"
          />
          {/* Only show song info if there's enough space */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              ml: 1,
              overflow: "hidden",
            }}
          >
            <Typography variant="subtitle2" noWrap color="black">
              {trackTitle}
            </Typography>
            <Typography variant="caption" color="black" noWrap>
              {artistName}
            </Typography>
          </Box>
        </Box>

        {/* Playback controls - centered and with flexible width */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 auto",
          }}
        >
          <IconButton
            size={isSmallScreen ? "small" : "medium"}
            sx={{ color: "black" }}
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <SkipPreviousIcon fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>
          <IconButton
            sx={{
              mx: { xs: 0.5, sm: 1 },
              color: "black",
            }}
            size={isSmallScreen ? "small" : "medium"}
            onClick={onPlayPause}
            disabled={!currentTrack}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
            )}
          </IconButton>
          <IconButton
            size={isSmallScreen ? "small" : "medium"}
            sx={{ color: "black" }}
            onClick={onNext}
            disabled={!hasNext}
          >
            <SkipNextIcon fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>

          {/* Loop button */}
          <Tooltip title={loopInfo.tooltip}>
            <IconButton
              size={isSmallScreen ? "small" : "medium"}
              onClick={onLoopToggle}
              sx={{ color: loopInfo.color }}
            >
              {loopInfo.icon}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Volume control - position to ensure visibility */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0, // Prevent this section from shrinking
            width: { xs: "90px", sm: "120px" }, // Fixed width to ensure enough space
            justifyContent: "flex-end",
            pr: 5, // Fixed right padding
          }}
        >
          <VolumeUpIcon
            sx={{
              mr: 0.5,
              color: "black",
              fontSize: isSmallScreen ? "small" : "medium",
            }}
          />
          <Slider
            size="small"
            value={volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            sx={{
              width: { xs: 50, sm: 80 }, // Smaller fixed width
              color: "black",
              "& .MuiSlider-thumb": {
                backgroundColor: "black",
                width: 10,
                height: 10,
              },
              "& .MuiSlider-track": {
                backgroundColor: "black",
                height: 3,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "rgba(0,0,0,0.3)",
                height: 3,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
