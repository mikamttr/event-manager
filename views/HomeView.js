import EventForm from "../components/EventForm.js";
import EventList from "../components/EventList.js";
import { loadEvents, addEvent } from '../utils/eventService.js';

export default {
    components: { EventForm, EventList },
    data() {
        return {
            events: loadEvents(), // Load events from localStorage
            error: false,
            searchQuery: ''
        };
    },
    computed: {
        filteredEvents() {
            // Filter events based on the search query
            return this.events.filter(event =>
                event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
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
            this.events = loadEvents(); // Refresh event list after new event is added
        }
    },
    template: `
    <div>
        <div class="columns">
            <div class="column is-three-fifths pr-5">
                <div class="control has-icons-left" style="max-width: 570px">
                    <input class="input is-rounded mb-5" type="search" v-model="searchQuery" placeholder="Search events">
                        <span class="icon is-small is-left"><i class="bi bi-search"></i></span>
                </div>
                <event-list :events="filteredEvents"></event-list>
            </div>
        
            <div class="column">
                <event-form @add="createEvent"></event-form>
                <p class="has-text-danger" v-if="error">Please enter a value</p>
            </div>
        </div>
    </div>
    `
};