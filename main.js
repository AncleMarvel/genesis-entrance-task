const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://tiktok33.p.rapidapi.com/trending/feed",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "tiktok33.p.rapidapi.com",
        "x-rapidapi-key": "6d9d778ed1msh9b77ea6429611b3p10db63jsnd9df7d01792d"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});

const app = Vue.createApp({
    data() {
        return {
            hw: "Hello world"
        }
    },
    template: `<h1>{{ hw }}</h1>
    <post></post>`
});

console.dir(app);

app.component('post', {
    data() {
        return {
            und: "Tiktok"
        }
    },
    template: `<h2>{{ und }}</h2>`
});

app.mount("#app");