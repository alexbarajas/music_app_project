import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const TrackList = ({ tracks, currentTrackIndex, onTrackSelect }) => {
  if (!tracks || tracks.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ mt: 4, overflow: "hidden" }}>
      <Box sx={{ p: 2, bgcolor: "primary.main" }}>
        <Typography variant="h6" color="white">
          Your Music ({tracks.length} tracks)
        </Typography>
      </Box>

      <List sx={{ maxHeight: "400px", overflow: "auto" }}>
        {tracks.map((track, index) => (
          <ListItem
            disablePadding
            key={index}
            selected={index === currentTrackIndex}
            divider
          >
            <ListItemButton onClick={() => onTrackSelect(index)}>
              <MusicNoteIcon
                sx={{
                  mr: 2,
                  color:
                    index === currentTrackIndex
                      ? "primary.main"
                      : "text.secondary",
                }}
              />
              <ListItemText
                primary={track.name.replace(/\.[^/.]+$/, "")}
                secondary={`${(track.size / (1024 * 1024)).toFixed(2)} MB`}
                primaryTypographyProps={{
                  color:
                    index === currentTrackIndex ? "primary.main" : "inherit",
                  fontWeight: index === currentTrackIndex ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TrackList;
