const STORAGE_KEY = 'events';

export function loadEvents() {
    const events = localStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
}

export function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function addEvent(newEvent) {
    const events = loadEvents();
    events.unshift(newEvent);
    saveEvents(events);
}

export function updateEvent(updatedEvent) {
    const events = loadEvents();
    const index = events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = updatedEvent;
        saveEvents(events);
    }
}

export function deleteEvent(eventId) {
    let events = loadEvents();
    events = events.filter(event => event.id !== eventId);
    saveEvents(events);
}
