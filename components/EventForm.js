export default {
    template: `
    <div>
        <form @submit.prevent="addEvent">
            <label for="title">Title:</label>
            <input id="title" type="text" v-model="title" required>

            <label for="date">Date:</label>
            <input id="date" type="datetime-local" v-model="date" required>

            <label for="location">Location:</label>
            <input id="location" type="text" v-model="location" required>

            <label for="description">Description:</label>
            <textarea id="description" v-model="description" required></textarea>

            <button type="submit">Add Event</button>
        </form>
    </div>
    `,
    data() {
        return {
            title: "",
            date: "",
            location: "",
            description: ""
        };
    },
    methods: {
        addEvent() {
            this.$emit("add", {
                title: this.title,
                date: new Date(this.date),
                location: this.location,
                description: this.description
            });

            this.title = "";
            this.date = "";
            this.location = "";
            this.description = "";
        }
    }
};
