export const SESSION_START_STORAGE_KEY = "sessionStartTime";
export const SESSION_LENGTH = 60 * 60 * 1000;

export const setSessionStartTime = () => {
  localStorage.setItem(SESSION_START_STORAGE_KEY, Date.now().toString());
};

export const clearSessionStartTime = () => {
  localStorage.removeItem(SESSION_START_STORAGE_KEY);
};

/**
 * Check if the session is still live based on
 * the session start time and the session length.
 */
export const isAuthenticated = () => {
  const sessionStart = localStorage.getItem(SESSION_START_STORAGE_KEY);
  console.log(sessionStart);
  if (!sessionStart) {
    return false;
  }

  const sessionDuration = Date.now() - parseInt(sessionStart, 10);

  const isSessionActive = sessionDuration < SESSION_LENGTH;

  return isSessionActive;
};
