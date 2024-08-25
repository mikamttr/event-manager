import HomeView from "../views/HomeView.js";
import EventDetail from "../views/EventDetail.js";

const routes = [
  { path: '/', component: HomeView },
  { path: '/index.html', component: HomeView },
  { path: '/events/:id', name: 'event', component: EventDetail, props: true },
];

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
