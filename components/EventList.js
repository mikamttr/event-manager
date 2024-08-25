export default {
    template: `
    <div>
        <ul>
            <li v-for="event in events" :key="event.id" class="event-item mb-4">
                <h5 class="title is-5">{{ event.title }}</h5>
                
                <div class="columns is-vcentered">
                    <div class="column is-three-fifths">
                        <span class="icon is-small has-text-info mr-2">
                            <i class="bi bi-calendar"></i>
                        </span>
                        <span>{{ formatDate(event.date) }}</span>
                    </div>
                    
                    <div class="column is-one-quarter">
                        <span class="icon is-small has-text-success mr-2">
                            <i class="bi bi-geo-alt"></i>
                        </span>
                        <span>{{ event.location }}</span>
                    </div>

                    <div class="column has-text-right">
                        <router-link :to="{ name: 'event', params: { id: event.id } }" class="icon is-small has-text-primary">
                            <i class="bi bi-three-dots"></i>
                        </router-link>
                    </div>
                </div>
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
            return new Date(date).toLocaleDateString('fr-FR', options);
        },
        handleDelete(eventId) {
            this.$emit('delete', eventId);
        }
    }
};
