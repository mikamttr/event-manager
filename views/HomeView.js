import EventForm from "../components/EventForm.js";
import EventList from "../components/EventList.js";
import { loadEvents, addEvent, deleteEvent } from '../utils/eventService.js';

export default {
    components: { EventForm, EventList },
    data() {
        return {
            events: loadEvents(), // Load events from localStorage
            error: false
        };
    },
    methods: {
        createEvent(eventData) {
            if (!eventData.title.trim() || !eventData.date) {
                this.error = true;
                return;
            }

            this.error = false;

            const event = { id: Date.now(), ...eventData };
            addEvent(event);
            this.events = loadEvents(); // Refresh event list
        },
        deleteEvent(eventId) {
            deleteEvent(eventId);
            this.events = loadEvents(); // Refresh event list
        }
    },
    template: `
    <div>
        <event-form @add="createEvent"></event-form>
        <p style="color: red" v-if="error">Please enter a value</p>
        <event-list :events="events" @delete="deleteEvent"></event-list>
    </div>
    `
};
