export const SESSION_LENGTH = 60 * 60 * 1000;
export const SESSION_START_TIME = 'sessionStartTime';

export const isSessionActive = (startTime: number = 0) => {
  const sessionDuration = Date.now() - startTime;
  return sessionDuration < SESSION_LENGTH;
};

export const getSessionLocalStorage = () => {
  const storedTime = localStorage.getItem(SESSION_START_TIME);
  return storedTime ? parseInt(storedTime, 10) : undefined;
}
export const setSessionLocalStorage = (time: number) => localStorage.setItem(SESSION_START_TIME, String(time));

export const clearSessionLocalStorage = () => localStorage.removeItem(SESSION_START_TIME);