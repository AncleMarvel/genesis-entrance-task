const app = Vue.createApp({
    data() {
        return {
            feed: null
        }
    },
    methods: {
        getTrandingFeet() {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://tiktok33.p.rapidapi.com/trending/feed",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tiktok33.p.rapidapi.com",
                    "x-rapidapi-key": "220231438amsh6c89b0f07f31979p13d268jsn735564eb533e"
                }
            };
            
            $.ajax(settings).done(function (response) {
                this.feed = response;
                localStorage.trandingFeet = JSON.stringify(response);
            });
        },

        initTrandingFeet() {
            if (localStorage.trandingFeet) {
                this.feed = JSON.parse(localStorage.trandingFeet);
                console.log(this.feed);
            } else {
                this.getTrandingFeet();
            }
        }
    },
    watch: {
        feed() {
        }
    },
    mounted() {
        this.initTrandingFeet();
    },
    template: 
    `<div class="video-miniatures__container">
        <h2 class="video-miniatures__heading">Tranding Feet</h2>
        <video-miniature v-for="video in feed" :data="video"></video-miniature>
    </div>`
});

app.component('video-miniature', {
    props: ['data'],
    data() {
        return {}
    },
    methods: {
        openVideo(event) {
            console.log(event.target);
        }
    },
    template: 
    `<a href="video.html?video_id=12345" class="video-miniature__wrapper" @click="openVideo($event)">
        <video class="video-miniature" :src="data.videoUrl" v-on:mouseenter="$event.target.play()" v-on:mouseleave="$event.target.pause()" muted></video>
        <div class="video-miniature__footer">
            <div class="video-miniature__footer_svg-wrapper">
                <svg class="video-miniature__footer_svg" width="18" height="18" viewBox="0 0 48 48" fill="black"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z">
                    </path>
                </svg>
            </div>
            <strong class="video-miniature__watch-count">{{ data.playCount }}</strong>
        </div>
    </a>`
    // Роутинг не обязателен: нет необходимости перехода на конкретное состояние страницы
    // Переход на новую страницу будет делать доп запрос, а у меня то уже все данные есть
    // Значит буду использовать просто раскрытие на весь экран
});

app.component('video-opened', {
    props: ['data'],
    data() {
        return {}
    },
    methods: {
        openVideo(event) {
            console.log(event.target);
        }
    },
    template: 
    `<a href="#" class="video-miniature__wrapper" @click="openVideo($event)">
        <video class="video-miniature" :src="data.videoUrl" v-on:mouseenter="$event.target.play()" v-on:mouseleave="$event.target.pause()" muted></video>
        <div class="video-miniature__footer">
            <div class="video-miniature__footer_svg-wrapper">
                <svg class="video-miniature__footer_svg" width="18" height="18" viewBox="0 0 48 48" fill="black"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z">
                    </path>
                </svg>
            </div>
            <strong class="video-miniature__watch-count">{{ data.playCount }}</strong>
        </div>
    </a>`
});

app.mount("#app");