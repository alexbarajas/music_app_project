import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loopMode, setLoopMode] = useState("all"); // "none", "one", or "all"
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Set up audio event listeners
    const audio = audioRef.current;

    const handleEnded = () => {
      if (loopMode === "one") {
        // Replay the same track
        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.error("Replay failed:", error);
        });
      } else {
        handleNext();
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    // Add event listeners
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);

    // Update volume initially
    audio.volume = volume / 100;

    return () => {
      // Clean up event listeners
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.pause();
    };
  }, [loopMode]); // Added loopMode as dependency

  // Handle track change
  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrackIndex !== null && tracks.length > 0) {
      const currentTrack = tracks[currentTrackIndex];

      // Reset current time
      setCurrentTime(0);

      // Create and set the object URL
      audio.src = URL.createObjectURL(currentTrack);

      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex, tracks]);

  // Handle volume change
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // Handle play state change
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleFilesSelected = (files) => {
    // Create track objects from files
    const newTracks = Array.from(files).map((file) => {
      return file;
    });

    setTracks(newTracks);

    // Auto-select first track if it's the first time loading tracks
    if (newTracks.length > 0 && currentTrackIndex === null) {
      setCurrentTrackIndex(0);
    }
  };

  const handlePlayPause = () => {
    if (currentTrackIndex !== null) {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else if (loopMode === "all" && tracks.length > 0) {
      // Loop to the last track if at the beginning
      setCurrentTrackIndex(tracks.length - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else if (loopMode === "all" && tracks.length > 0) {
      // Loop back to first track when reached the end
      setCurrentTrackIndex(0);
    } else if (loopMode === "none") {
      // Stop playing if we're at the end and not looping
      setIsPlaying(false);
    }
  };

  const toggleLoopMode = () => {
    // Cycle through loop modes: none -> one -> all -> none
    setLoopMode((prev) => {
      if (prev === "none") return "one";
      if (prev === "one") return "all";
      return "none";
    });
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const getCurrentTrack = () => {
    if (currentTrackIndex !== null && tracks.length > 0) {
      return tracks[currentTrackIndex];
    }
    return null;
  };

  const getTrackTitle = () => {
    const currentTrack = getCurrentTrack();
    if (currentTrack) {
      // Remove file extension for cleaner display
      return currentTrack.name.replace(/\.[^/.]+$/, "");
    }
    return "No track selected";
  };

  // Extracting artist name is not straightforward from files
  const getArtistName = () => {
    const currentTrack = getCurrentTrack();
    if (currentTrack) {
      const fileName = currentTrack.name;
      // Common patterns: "Artist - Title" or "Artist_Title"
      const separators = [" - ", "_", "-"];

      for (const separator of separators) {
        if (fileName.includes(separator)) {
          return fileName.split(separator)[0];
        }
      }
      return "Unknown Artist";
    }
    return "Unknown Artist";
  };

  return {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    duration,
    currentTime,
    loopMode,
    handleFilesSelected,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleVolumeChange,
    handleTrackSelect,
    handleSeek,
    toggleLoopMode,
    getCurrentTrack,
    getTrackTitle,
    getArtistName,
    hasPrevious: currentTrackIndex > 0 || loopMode === "all",
    hasNext: currentTrackIndex < tracks.length - 1 || loopMode === "all",
  };
};

export default AudioPlayer;
