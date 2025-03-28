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
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";

export default function Footer({
  isPlaying = false,
  onPlayPause = () => {},
  onPrevious = () => {},
  onNext = () => {},
  volume = 30,
  onVolumeChange = () => {},
  onMuteToggle = () => {},
  isMuted = false,
  trackTitle = "No track selected",
  artistName = "Unknown Artist",
  currentTrack = null,
  albumArt = null,
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
        height: isSmallScreen ? "56px" : "64px",
        zIndex: 1300,
        width: "100%",
        boxSizing: "border-box",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Track info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "25%", sm: "22%" },
          pl: 1,
        }}
      >
        {albumArt ? (
          <Box
            component="img"
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              flexShrink: 0,
              objectFit: "cover",
              borderRadius: "2px",
            }}
            src={albumArt}
            alt="Album cover"
          />
        ) : (
          <Box
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              flexShrink: 0,
              backgroundColor: currentTrack ? "#6b46c1" : "#e2e8f0",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="inherit">
              {artistName?.charAt(0) || "♪"}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            ml: 1,
            overflow: "hidden",
          }}
        >
          <Typography variant="subtitle2" noWrap color="inherit">
            {trackTitle}
          </Typography>
          <Typography variant="caption" color="inherit" noWrap>
            {artistName}
          </Typography>
        </Box>
      </Box>

      {/* Time display - current time */}
      <Typography
        variant="caption"
        color="inherit"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "40px",
          textAlign: "right",
          pr: 1,
          opacity: 0.8,
        }}
      >
        {formatTime(currentTime)}
      </Typography>

      {/* Progress bar */}
      <Box sx={{ flex: 1, px: 1 }}>
        <Slider
          size="small"
          value={currentTime}
          max={duration || 100}
          onChange={(e, newValue) => onSeek(newValue)}
          aria-label="Progress"
          sx={{
            color: "inherit",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              backgroundColor: "currentColor",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(255, 255, 255, 0.16)",
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
      </Box>

      {/* Time display - duration */}
      <Typography
        variant="caption"
        color="inherit"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "40px",
          textAlign: "left",
          pl: 1,
          opacity: 0.8,
        }}
      >
        {formatTime(duration)}
      </Typography>

      {/* Playback controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ml: 1,
        }}
      >
        <Tooltip title="Previous Track">
          <span>
            <IconButton
              size="small"
              sx={{ color: "inherit" }}
              onClick={onPrevious}
              disabled={!hasPrevious}
            >
              <SkipPreviousIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={isPlaying ? "Pause" : "Play"}>
          <IconButton
            sx={{
              mx: 0.5,
              color: "inherit",
            }}
            size="small"
            onClick={onPlayPause}
            disabled={!currentTrack}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Next Track">
          <span>
            <IconButton
              size="small"
              sx={{ color: "inherit" }}
              onClick={onNext}
              disabled={!hasNext}
            >
              <SkipNextIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        {/* Loop button */}
        <Tooltip title={loopInfo.tooltip}>
          <IconButton
            size="small"
            onClick={onLoopToggle}
            sx={{
              color: loopMode === "none" ? "inherit" : "inherit",
              opacity: loopMode === "none" ? 0.6 : 1,
              ml: 0.5,
            }}
          >
            {loopInfo.icon}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Volume control */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          ml: 1,
          mr: 2,
          width: { xs: "80px", sm: "100px" },
        }}
      >
        <Tooltip title={isMuted ? "Unmute" : "Mute"}>
          <IconButton
            size="small"
            onClick={onMuteToggle}
            sx={{ color: "inherit" }}
          >
            {isMuted ? (
              <VolumeOffIcon sx={{ fontSize: "small" }} />
            ) : (
              <VolumeUpIcon sx={{ fontSize: "small" }} />
            )}
          </IconButton>
        </Tooltip>

        <Slider
          size="small"
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          aria-label="Volume"
          sx={{
            width: { xs: 50, sm: 70 },
            color: "inherit",
            "& .MuiSlider-thumb": {
              backgroundColor: "currentColor",
              width: 8,
              height: 8,
            },
            "& .MuiSlider-track": {
              backgroundColor: "currentColor",
              height: 3,
            },
            "& .MuiSlider-rail": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              height: 3,
            },
          }}
        />
      </Box>
    </Paper>
  );
}
