export default {
    template: `
    <div>
        <ul>
            <li v-for="event in events" :key="event.id">
                <router-link :to="{ name: 'event', params: { id: event.id } }">
                    {{ event.title }} - {{ formatDate(event.date) }} - {{ event.location }}
                </router-link>
                <button @click="handleDelete(event.id)">Delete</button>
            </li>
        </ul>
    </div>
    `,
    props: {
        events: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        handleDelete(eventId) {
            this.$emit('delete', eventId);
        }
    }
};
