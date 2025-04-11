import { useState, useEffect } from "react";

interface Position {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface GeolocationState {
  position: Position | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: true,
  });

  const [watchId, setWatchId] = useState<number | null>(null);

  // Get current position once on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          position: null,
          error: `Geolocation error: ${getGeolocationErrorMessage(error.code)}`,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }, []);

  // Start watching position
  const startWatching = () => {
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          position: null,
          error: `Geolocation error: ${getGeolocationErrorMessage(error.code)}`,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );

    setWatchId(id);
  };

  // Stop watching position
  const stopWatching = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  // Clean up watch on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Get descriptive error message
  const getGeolocationErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return "Permission denied. Please allow location access to use this feature.";
      case 2:
        return "Position unavailable. The network is down or satellites can't be reached.";
      case 3:
        return "Timeout. The request to get your location timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  return {
    ...state,
    startWatching,
    stopWatching,
    isWatching: watchId !== null,
  };
}
