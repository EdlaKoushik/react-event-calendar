const STORAGE_KEY = "calendar_events";

export const loadEvents = (fallbackEvents = []) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackEvents));
  return fallbackEvents;
};

export const saveEvents = (events) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};
