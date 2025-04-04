import React, { useState, useRef, useEffect } from "react";
import * as mm from "music-metadata";

const AudioPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50); // Store volume before muting
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loopMode, setLoopMode] = useState("all"); // Starting with "all", will cycle through "all" -> "one" -> "none"
  const [trackMetadata, setTrackMetadata] = useState({});
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
    audio.volume = isMuted ? 0 : volume / 100;

    return () => {
      // Clean up event listeners
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
    };
  }, []); // Remove loopMode from dependencies to prevent re-renders on loop change

  // Handle ended event with loop mode inside
  useEffect(() => {
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

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [loopMode]); // Only update this event listener when loopMode changes

  // Parse metadata when tracks change
  const parseMetadata = async (file) => {
    try {
      // Create a Buffer from the File object
      const arrayBuffer = await file.arrayBuffer();

      // Parse metadata using music-metadata
      const metadata = await mm.parseBuffer(
        new Uint8Array(arrayBuffer),
        file.type
      );

      // Extract cover art if available
      let picture = null;
      if (metadata.common.picture && metadata.common.picture.length > 0) {
        const pictureData = metadata.common.picture[0];
        const blob = new Blob([pictureData.data], { type: pictureData.format });
        picture = URL.createObjectURL(blob);
      }

      return {
        title: metadata.common.title || file.name.replace(/\.[^/.]+$/, ""),
        artist: metadata.common.artist || "Unknown Artist",
        album: metadata.common.album || "Unknown Album",
        albumArt: picture || null,
        year: metadata.common.year || null,
        genre: metadata.common.genre?.[0] || "Unknown Genre",
      };
    } catch (error) {
      console.error("Error parsing metadata:", error);
      return {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Unknown Artist",
        album: "Unknown Album",
        albumArt: null,
        year: null,
        genre: "Unknown Genre",
      };
    }
  };

  // Handle track change
  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrackIndex !== null && tracks.length > 0) {
      const currentTrack = tracks[currentTrackIndex];

      // Reset current time
      setCurrentTime(0);
      audio.currentTime = 0; // Explicitly set the audio element's time to 0

      // Create and set the object URL
      audio.src = URL.createObjectURL(currentTrack);

      // Parse metadata for the current track
      const loadMetadata = async () => {
        const metadata = await parseMetadata(currentTrack);
        setTrackMetadata((prevMetadata) => ({
          ...prevMetadata,
          [currentTrackIndex]: metadata,
        }));
      };

      loadMetadata();

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
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

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

  const handleFilesSelected = async (files) => {
    // Create track objects from files
    const newTracks = Array.from(files);
    setTracks(newTracks);

    // Auto-select first track if it's the first time loading tracks
    if (newTracks.length > 0 && currentTrackIndex === null) {
      setCurrentTrackIndex(0);
    }

    // Parse metadata for all tracks
    const newMetadata = {};
    for (let i = 0; i < newTracks.length; i++) {
      const metadata = await parseMetadata(newTracks[i]);
      newMetadata[i] = metadata;
    }

    setTrackMetadata(newMetadata);
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
    if (loopMode === "one") {
      // For Repeat One mode, restart the current track instead of moving to next
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        if (!isPlaying) {
          setIsPlaying(true);
        }
      }
    } else if (currentTrackIndex < tracks.length - 1) {
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
    // Cycle through loop modes: all -> one -> none -> all
    setLoopMode((prev) => {
      if (prev === "all") return "one";
      if (prev === "one") return "none";
      return "all";
    });
    // Make sure we don't interrupt playback when changing loop mode
    if (isPlaying) {
      // We're not updating the audioRef directly here
      // The playback should continue uninterrupted
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (isMuted && newValue > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (!isMuted) {
      // Store current volume before muting
      setPreviousVolume(volume);
    } else {
      // Restore previous volume when unmuting
      setVolume(previousVolume);
    }
    setIsMuted(!isMuted);
  };

  // const handleTrackSelect = (index) => {
  //   setCurrentTrackIndex(index);
  //   setIsPlaying(true);
  // };

  const handleTrackSelect = (index) => {
    // Reset current time when selecting a new track
    if (currentTrackIndex !== index) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (newTime) => {
    if (audioRef.current && currentTrackIndex !== null && tracks.length > 0) {
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
    if (currentTrackIndex !== null && trackMetadata[currentTrackIndex]) {
      return trackMetadata[currentTrackIndex].title;
    }
    return "No track selected";
  };

  const getArtistName = () => {
    if (currentTrackIndex !== null && trackMetadata[currentTrackIndex]) {
      return trackMetadata[currentTrackIndex].artist;
    }
    return "Unknown Artist";
  };

  const getAlbumArt = () => {
    if (currentTrackIndex !== null && trackMetadata[currentTrackIndex]) {
      return trackMetadata[currentTrackIndex].albumArt;
    }
    return null;
  };

  return {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    duration,
    currentTime,
    loopMode,
    handleFilesSelected,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleVolumeChange,
    handleMuteToggle,
    handleTrackSelect,
    handleSeek,
    toggleLoopMode,
    getCurrentTrack,
    getTrackTitle,
    getArtistName,
    getAlbumArt,
    hasPrevious: currentTrackIndex > 0 || loopMode === "all",
    hasNext:
      currentTrackIndex < tracks.length - 1 ||
      loopMode === "all" ||
      loopMode === "one",
  };
};

export default AudioPlayer;
