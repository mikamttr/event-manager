export default {
    emits: ['add'],
    template: `
    <div>
        <h4 class="title is-4">Create new event</h4>
        <form @submit.prevent="addEvent">
        <div class="field">
            <label class="label" for="title">Title</label>
            <div class="control">
                <input class="input" id="title" type="text" v-model="title" placeholder="Event title" required>
            </div>
        </div>

        <div class="field">
            <label class="label" for="date">Date</label>
            <div class="control">
                <input class="input" id="date" type="datetime-local" v-model="date" required>
            </div>
        </div>

        <div class="field">
            <label class="label" for="location">Location</label>
            <div class="control">
                <input class="input" id="location" type="text" v-model="location" placeholder="Event location" required>
            </div>
        </div>

        <div class="field">
            <label class="label" for="description">Description</label>
            <div class="control">
                <textarea class="textarea" id="description" v-model="description" placeholder="Event description" required></textarea>
            </div>
        </div>

        <div class="is-flex is-justify-content-flex-end">
            <button class="button is-primary my-3" type="submit" style="width: 250px">Add Event</button>
        </div>
    </form>
    </div>
    `,
    data() {
        return {
            title: '',
            date: '',
            location: '',
            description: ''
        };
    },
    methods: {
        addEvent() {
            this.$emit('add', {
                title: this.title,
                date: new Date(this.date),
                location: this.location,
                description: this.description
            });

            this.title = '';
            this.date = '';
            this.location = '';
            this.description = '';
        }
    }
};
