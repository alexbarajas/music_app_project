import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function Footer() {
  const [volume, setVolume] = React.useState(30);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56, // Standard height
        zIndex: 1300, // High z-index to ensure it's above everything
        backgroundColor: "lightblue",
        width: "100%", // Ensure full width
        boxSizing: "border-box", // Include padding in width calculation
        overflow: "visible", // This allows the slider thumb to overflow without being cut
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
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
              Song Title
            </Typography>
            <Typography variant="caption" color="black" noWrap>
              Artist Name
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
          >
            <SkipPreviousIcon fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>
          <IconButton
            sx={{
              mx: { xs: 0.5, sm: 1 },
              color: "black",
            }}
            size={isSmallScreen ? "small" : "medium"}
          >
            <PlayArrowIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
          </IconButton>
          <IconButton
            size={isSmallScreen ? "small" : "medium"}
            sx={{ color: "black" }}
          >
            <SkipNextIcon fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>
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
            onChange={(e, newValue) => setVolume(newValue)}
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
