import { loadEvents, updateEvent, deleteEvent } from '../utils/eventService.js';

export default {
    data() {
        return {
            event: null
        };
    },
    created() {
        const id = Number(this.$route.params.id);
        const events = loadEvents();
        this.event = events.find(event => event.id === id);
        if (!this.event) {
            this.$router.push('/'); // Redirect to home if event not found
        }
    },
    methods: {
        formatDateForInput(date) {
            const d = new Date(date);
            // Convert to local time and format as YYYY-MM-DDTHH:MM
            const offset = d.getTimezoneOffset() * 60000;
            const localDate = new Date(d.getTime() - offset);
            return localDate.toISOString().slice(0, 16);
        },
        parseDateFromInput(dateString) {
            return new Date(dateString).toISOString();
        },
        saveChanges() {
            // Update the event date to UTC format
            this.event.date = this.parseDateFromInput(this.event.date);
            updateEvent(this.event);
            this.$router.push('/'); // Redirect to home after save
        },
        deleteEvent() {
            if (confirm('Are you sure you want to delete this event?')) {
                deleteEvent(this.event.id);
                this.$router.push('/'); // Redirect to home after delete
            }
        },
        goBack() {
            this.$router.push('/'); // Redirect to home
        }
    },
    template: `
    <div class="container">
        <button class="button is-text mb-4" @click="goBack">
            <i class="bi bi-arrow-left mr-2"></i>
            Back to Home
        </button>
        
        <form @submit.prevent="saveChanges">
            <div class="field">
                <label class="label" for="title">Title</label>
                <div class="control">
                    <input
                        id="title"
                        class="input"
                        type="text"
                        v-model="event.title"
                        required
                    />
                </div>
            </div>

            <div class="field">
                <label class="label" for="date">Date</label>
                <div class="control">
                    <input
                        id="date"
                        class="input"
                        type="datetime-local"
                        :value="formatDateForInput(event.date)"
                        @input="event.date = $event.target.value"
                        required
                    />
                </div>
            </div>

            <div class="field">
                <label class="label" for="location">Location</label>
                <div class="control">
                    <input
                        id="location"
                        class="input"
                        type="text"
                        v-model="event.location"
                        required
                    />
                </div>
            </div>

            <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control">
                    <textarea
                        id="description"
                        class="textarea"
                        v-model="event.description"
                        required
                    ></textarea>
                </div>
            </div>

            <div class="buttons">
                <button class="button is-danger is-dark" @click="deleteEvent">Delete Event</button>
                <button class="button is-success is-dark" type="submit">Save Changes</button>
            </div>
        </form>
    </div>
    `
};
