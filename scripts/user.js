const app = Vue.createApp({
    data() {
        return {
            name: '',
            user: {},
            stats: {},
            feed: {}
        }
    },
    methods: {
        getName() {
            let vars = location.search.substr(1).split('&').reduce(function (res, a) {
                let t = a.split('=');
                res[decodeURIComponent(t[0])] = t.length == 1 ? null : decodeURIComponent(t[1]);
                return res;
            }, {});
            return vars["name"] ? vars["name"] : '';
        },

        getUserInfo() {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://tiktok33.p.rapidapi.com/user/info/${this.name}`,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tiktok33.p.rapidapi.com",
                    "x-rapidapi-key": "220231438amsh6c89b0f07f31979p13d268jsn735564eb533e"
                }
            };

            $.ajax(settings).done((response) => {
                console.log(response);
                this.user = response.user;
                this.stats = response.stats;
                this.initDescription();
            }).fail((res) => {
                console.error(res);
            });
        },

        initUserInfo() {
            this.getUserInfo();
        },

        initDescription() {
            this.user.signature = this.user.signature.split("\n");
        },
        getFeed() {
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

            $.ajax(settings).done(response => {
                this.feed = response;
                console.log(response);
            }).fail((res) => {
                console.error(res);
            });
            // const settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": `https://tiktok33.p.rapidapi.com/user/feed/${this.name}`,
            //     "method": "GET",
            //     "headers": {
            //         "x-rapidapi-host": "tiktok33.p.rapidapi.com",
            //         "x-rapidapi-key": "220231438amsh6c89b0f07f31979p13d268jsn735564eb533e"
            //     }
            // };

            // $.ajax(settings).done(function (response) {
            //     this.feed = response;
            //     console.log(response);
            // });
        },

        initFeed() {
            this.getFeed();
        }
    },
    watch: {
    },
    mounted() {
        this.name = this.getName();
        this.initUserInfo();
        this.initFeed();
    }
});

app.component('video-post', {
    props: ['data'],
    data() {
        return {
            isOpened: false,
            isPaused: false,
            authorUrl: `user.html?name=${this.data.authorMeta.name}`
        }
    },
    methods: {
        openVideo() {
            if (this.isOpened) {
                return;
            }
            $("html,body").css("overflow", "hidden");
            this.isOpened = true;
        },

        closeVideo(e) {
            e.stopPropagation();
            if (!this.isOpened) {
                return;
            }
            $("html,body").css("overflow", "initial");
            this.isOpened = false;
        },

        playToggler() {
            if (!this.isPaused) {
                $(`video[src="${this.data.videoUrl}"]`).trigger("pause");
            } else {
                $(`video[src="${this.data.videoUrl}"]`).trigger("play");
            }
            this.isPaused = !this.isPaused;
        }
    },
    template:
        `<div class="video-miniature__wrapper" @click="openVideo">
    
        <video class="video-miniature" :src="data.videoUrl" v-on:mouseenter="$event.target.play()" v-on:mouseleave="$event.target.pause()" muted></video>
        <div v-if="!isOpened" class="video-miniature__footer">
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

        <div class="video-opened__wrapper" v-if="isOpened">
            <div class="video-opened__inner-content">
                <video class="video-opened" :src="data.videoUrl" loop autoplay></video>
                <div class="video-opened__surface" @click="playToggler()">
                    <div class="video-opened__surface_left">
                        <button class="video-opened__close-svg_wrapper" @click="closeVideo($event)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <circle cx="24" cy="24" r="24" fill="white" fill-opacity="0.12" />
                                <path
                                    d="M15.2771 16.4795C15.082 16.6749 15.082 16.9919 15.2771 17.1873L31.0356 32.9801C31.2307 33.1756 31.5469 33.1756 31.742 32.9801L32.8651 31.8546C33.0601 31.6591 33.0601 31.3422 32.8651 31.1467L17.1065 15.3539C16.9115 15.1585 16.5952 15.1585 16.4002 15.3539L15.2771 16.4795Z"
                                    fill="white" />
                                <path
                                    d="M31.742 15.3539C31.547 15.1584 31.2307 15.1584 31.0357 15.3539L15.2773 31.1467C15.0822 31.3422 15.0822 31.6591 15.2773 31.8546L16.4003 32.9801C16.5954 33.1756 16.9116 33.1756 17.1067 32.9801L32.8651 17.1873C33.0601 16.9918 33.0601 16.6749 32.8651 16.4794L31.742 15.3539Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <div class="video-opened__description_wrapper">
                            <span class="video-opened__description_author-name">
                            @{{ data.authorMeta.name }}
                            </span>
                            <div class="video-opened__description">
                                {{ data.text }}
                            </div>
                        </div>
                    </div>
                    <div class="video-opened__surface_right">
                        <a :href="authorUrl" class="video-opened__author_wrapper video-opened__right-btn_wrapper">
                            <img :src="data.authorMeta.avatar" :alt="data.authorMeta.nickName"
                                class="video-opened__author_avatar video-opened__counter">
                        </a>
                        <div class="video-opened__likes_wrapper video-opened__right-btn_wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g opacity="0.9" filter="url(#filter0_d)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M16.4879 2.2002C14.7383 2.2002 13.148 2.92924 12.1795 4.30929C10.8503 2.92924 9.25845 2.2002 7.51194 2.2002C4.17817 2.2002 1.40826 5.08936 1.40826 8.52747C1.40826 8.76157 1.41932 8.86799 1.40826 8.87898C1.42564 9.67168 1.79993 11.1002 2.09993 11.7002C4.11916 16.0711 10.4999 20.7002 10.7999 21.0002C11.0999 21.3002 11.3999 21.6002 11.9999 21.6002C12.5999 21.6002 12.8999 21.3002 13.1999 21.0002C13.4999 20.7002 19.0763 16.4872 21.5145 12.3941C21.6204 12.1145 21.6899 11.9763 21.8735 11.6911C21.9899 11.3966 22.1068 11.1298 22.2326 10.9881C22.4542 10.199 22.579 9.60179 22.5916 8.87898C22.5821 8.85846 22.5916 8.75998 22.5916 8.52747C22.5916 5.09095 19.8201 2.2002 16.4879 2.2002Z"
                                        fill="#161823" />
                                </g>
                                <path opacity="0.03" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2.09991 11.691C4.11914 16.0619 10.8047 21.0637 11.1023 21.1819C11.3999 21.3001 11.6999 21.6001 11.9999 21.6001C12.2999 21.6001 12.5999 21.6001 12.8999 21.3001C13.1999 21.0001 19.0763 16.4871 21.5145 12.394C21.6204 12.1144 21.6899 11.9762 21.8735 11.691C21.9899 11.3965 22.1068 11.1296 22.2325 10.9879C22.4542 10.1989 22.5789 9.60167 22.5916 8.87886C22.5821 8.85833 22.5916 8.75986 22.5916 8.52734C21.5145 10.8001 15.1204 18.3001 11.9999 18.6001C8.87943 18.9001 2.43254 12.3516 2.09991 11.691Z"
                                    fill="black" />
                                <defs>
                                    <filter id="filter0_d" x="0.408264" y="2.2002" width="23.1833" height="21.4"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="0.5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            <span class="video-opened__likes_count video-opened__counter">{{ data.diggCount }}</span>
                        </div>
                        <div class="video-opened__comments_wrapper video-opened__right-btn_wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                <g opacity="0.9" filter="url(#filter0_d)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M20.2471 17.6565C22.3 15.6 23.5 13.4581 23.5 10.964C23.5 5.90285 18.8665 1.80005 13.15 1.80005C7.43355 1.80005 2.8 5.90285 2.8 10.9642C2.8 16.0255 7.58346 19.5 13.3 19.5V20.4112C13.3 21.2976 14.2195 21.864 14.9905 21.4269C16.5103 20.5652 18.7304 19.1759 20.2471 17.6565ZM8.1222 9.72826C8.93918 9.72826 9.60145 10.3858 9.60145 11.1957C9.60145 12.0072 8.93918 12.6646 8.1222 12.6646C7.30661 12.6646 6.64431 12.0072 6.64431 11.1957C6.64431 10.3858 7.30661 9.72826 8.1222 9.72826ZM14.6286 11.1957C14.6286 10.3858 13.9666 9.72826 13.15 9.72826C12.3335 9.72826 11.6714 10.3858 11.6714 11.1957C11.6715 12.0072 12.3335 12.6646 13.15 12.6646C13.9666 12.6646 14.6286 12.0072 14.6286 11.1957ZM18.1776 9.72826C18.9944 9.72826 19.6557 10.3858 19.6557 11.1957C19.6557 12.0072 18.9944 12.6646 18.1776 12.6646C17.3607 12.6646 16.6985 12.0072 16.6986 11.1957C16.6986 10.3858 17.3608 9.72826 18.1776 9.72826Z"
                                        fill="#161823" />
                                </g>
                                <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13.3001 19.5C13.3001 19.5 19.0334 19.057 21.4301 15.9883C19.0334 19.3639 16.6368 21.2051 14.5398 21.8189C12.4428 22.4326 13.3001 19.5 13.3001 19.5Z"
                                    fill="url(#paint0_linear)" />
                                <defs>
                                    <filter id="filter0_d" x="0.800049" y="0.800049" width="24.7" height="23.7776"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear" x1="11.2052" y1="18.835" x2="12.154" y2="21.8169"
                                        gradientUnits="userSpaceOnUse">
                                        <stop />
                                        <stop offset="1" stop-opacity="0.01" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span class="video-opened__comments_count video-opened__counter">{{ data.commentCount }}</span>
                        </div>
                        <div class="video-opened__reposts_wrapper video-opened__right-btn_wrapper ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px">
                                <path fill-rule="evenodd"
                                    d="M211,5.5 L211,19.644 L209.554,19.644 L204.625,16.11 L202.201,16.11 L203.226,19.977 L201.294,20.5 L200.13,16.11 L199.438,16.11 C197.54,16.11 196,14.526 196,12.572 C196,10.618 197.54,9.033 199.438,9.033 L204.525,9.033 L209.554,5.5 L211,5.5 Z M201.6685,14.0759992 L205.2685,14.0759992 L209.0005,16.7509992 L209.0005,8.29999924 L205.1575,10.9989992 L199.4385,10.9989992 C198.6455,10.9989992 198.0005,11.6889992 198.0005,12.5379992 C198.0005,13.3859992 198.6455,14.0759992 199.4385,14.0759992 L201.6685,14.0759992 Z"
                                    transform="translate(-192)" />
                            </svg>
                            <span class="video-opened__reposts_count video-opened__counter">{{ data.shareCount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});

app.mount("#app");