import router from "./router/index.js";


const options = {
    mounted() {
        console.log("mounted");
    }
};

const app = Vue.createApp(options);
app.use(router);
app.mount("#app");