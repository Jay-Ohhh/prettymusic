(function(e){function t(t){for(var r,i,a=t[0],c=t[1],s=t[2],l=0,d=[];l<a.length;l++)i=a[l],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,i=1;i<n.length;i++){var a=n[i];0!==o[a]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},o={app:0},u=[];function a(e){return c.p+"js/"+({detail:"detail","group-navgation":"group-navgation"}[e]||e)+"."+{"chunk-1a552cf0":"693a2a6d","chunk-66dc1ce0":"31809487","chunk-264ed81a":"96856655","chunk-17de2613":"f2bb77e4",detail:"c85c3e54","chunk-92139d0a":"66a0ecbd","chunk-aefd076e":"bd3c8dd3","group-navgation":"06f99911","chunk-b3126666":"19e1680e"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-1a552cf0":1,"chunk-264ed81a":1,"chunk-17de2613":1,detail:1,"chunk-92139d0a":1,"chunk-aefd076e":1,"group-navgation":1,"chunk-b3126666":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var r="css/"+({detail:"detail","group-navgation":"group-navgation"}[e]||e)+"."+{"chunk-1a552cf0":"ee74a3aa","chunk-66dc1ce0":"31d6cfe0","chunk-264ed81a":"f5f61089","chunk-17de2613":"78127fd1",detail:"ce9c6fcb","chunk-92139d0a":"74faa895","chunk-aefd076e":"7e5a0289","group-navgation":"82382277","chunk-b3126666":"15ce536f"}[e]+".css",o=c.p+r,u=document.getElementsByTagName("link"),a=0;a<u.length;a++){var s=u[a],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(a=0;a<d.length;a++){s=d[a],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete i[e],f.parentNode.removeChild(f),n(u)},f.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){i[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",d.name="ChunkLoadError",d.type=r,d.request=i,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/prettrymusic/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("4cae")},"3a10":function(e,t,n){},"4cae":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"getBanner",(function(){return ne})),n.d(r,"getRecSongs",(function(){return re})),n.d(r,"getNewSongs",(function(){return ie})),n.d(r,"getSongDetail",(function(){return oe})),n.d(r,"getLyric",(function(){return ue})),n.d(r,"getHotSinger",(function(){return ae})),n.d(r,"login",(function(){return ce})),n.d(r,"getUserDetail",(function(){return se})),n.d(r,"getSearchHot",(function(){return le})),n.d(r,"getUserRecord",(function(){return de})),n.d(r,"getCateList",(function(){return fe})),n.d(r,"getHotList",(function(){return me})),n.d(r,"getSheetList",(function(){return ge})),n.d(r,"getPlayListDetail",(function(){return pe})),n.d(r,"getRelatedPlayList",(function(){return he})),n.d(r,"getSubscribers",(function(){return ve})),n.d(r,"getSheetComment",(function(){return ye})),n.d(r,"collectArtist",(function(){return be})),n.d(r,"signIn",(function(){return ke})),n.d(r,"getUserArtist",(function(){return Se})),n.d(r,"getFollows",(function(){return Pe})),n.d(r,"followUser",(function(){return Ie})),n.d(r,"getRank",(function(){return we})),n.d(r,"getSingers",(function(){return Me})),n.d(r,"getVideoCategory",(function(){return Le})),n.d(r,"getVideoTag",(function(){return Ae})),n.d(r,"getVideoAll",(function(){return xe})),n.d(r,"getVideoOther",(function(){return De})),n.d(r,"getMvAll",(function(){return Oe})),n.d(r,"getArtists",(function(){return He})),n.d(r,"getArtistAlbum",(function(){return Ce})),n.d(r,"getArtistMv",(function(){return je})),n.d(r,"getArtistDesc",(function(){return Te})),n.d(r,"getArtistSimi",(function(){return Ve})),n.d(r,"followSinger",(function(){return Ne})),n.d(r,"getAlbumData",(function(){return Ue})),n.d(r,"getAlbumComment",(function(){return Ee})),n.d(r,"commentSubmit",(function(){return Je})),n.d(r,"commentDelete",(function(){return _e})),n.d(r,"likeResource",(function(){return Re})),n.d(r,"getVideoUrl",(function(){return Be})),n.d(r,"getVideoDetail",(function(){return Ye})),n.d(r,"getVideoDetailInfo",(function(){return Fe})),n.d(r,"getVideoComments",(function(){return qe})),n.d(r,"commentLike",(function(){return $e})),n.d(r,"getVideoRelated",(function(){return Ke})),n.d(r,"getMvUrl",(function(){return ze})),n.d(r,"getMvDetail",(function(){return Ze})),n.d(r,"getMvDetailInfo",(function(){return Ge})),n.d(r,"getMvComments",(function(){return Qe})),n.d(r,"getMvRelated",(function(){return We})),n.d(r,"searchSuggest",(function(){return Xe})),n.d(r,"search",(function(){return et}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],u={name:"App"},a=u,c=n("2877"),s=Object(c["a"])(a,i,o,!1,null,null,null),l=s.exports,d=(n("b0c0"),n("99af"),n("d3b7"),function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"162e"))}),f=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"7abe"))},m=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"389a"))},g=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"ab26"))},p=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"2824"))},h=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"007b"))},v=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-aefd076e"),n.e("group-navgation")]).then(n.bind(null,"e4d7"))},y=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("detail")]).then(n.bind(null,"5946"))},b=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("detail")]).then(n.bind(null,"65e4"))},k=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("detail")]).then(n.bind(null,"94be"))},S=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("detail")]).then(n.bind(null,"6e2e"))},P=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("detail")]).then(n.bind(null,"e3b9"))},I=function(){return n.e("chunk-1a552cf0").then(n.bind(null,"6663"))},w=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-92139d0a")]).then(n.bind(null,"b76f"))},M=function(){return Promise.all([n.e("chunk-66dc1ce0"),n.e("chunk-264ed81a"),n.e("chunk-17de2613")]).then(n.bind(null,"794b"))},L=function(){return Promise.all([n.e("chunk-aefd076e"),n.e("chunk-b3126666")]).then(n.bind(null,"2754"))},A={path:"/login",name:"login",component:I,meta:{title:"登录",isLogin:!0}},x={path:"*",name:"404",component:L,meta:{title:"404-您访问的页面不存在",keepAlive:!1}},D=[{path:"/",redirect:"/home",component:d,children:[{path:"/home",name:"home",component:f,meta:{title:"首页",keepAlive:!1}},{path:"/rank",name:"rank",component:m,meta:{title:"排行榜",keepAlive:!0}},{path:"/playlist",name:"playlist",component:g,meta:{title:"歌单列表",keepAlive:!0}},{path:"/singer",name:"singer",component:p,meta:{title:"歌手列表",keepAlive:!0}},{path:"/video",name:"video",component:h,meta:{title:"视频列表",keepAlive:!1}},{path:"/mv",name:"mv",component:v,meta:{title:"mv列表",keepAlive:!1}},{path:"/playlistdetail",name:"playlistdetail",component:y,meta:{title:"歌曲列表",keepAlive:!0}},{path:"/singerdetail",name:"singerdetail",component:b,meta:{title:"歌手详情",keepAlive:!0}},{path:"/videodetail",name:"videodetail",component:S,meta:{title:"视频详情",keepAlive:!0}},{path:"/mvdetail",name:"mvdetail",component:P,meta:{title:"MV详情",keepAlive:!0}},{path:"/albumdetail",name:"albumdetail",component:k,meta:{title:"专辑详情",keepAlive:!0}},{path:"/personal",name:"personal",component:w,meta:{title:"用户",keepAlive:!0}},{path:"/search",name:"search",component:M,meta:{title:"搜索",keepAlive:!1}}]}],O=[A,x].concat(D),H={playList:[],playing:!1,currentIndex:-1,currentMode:0,searchHistory:JSON.parse(sessionStorage.getItem("search"))||[],historyList:[],songSheet:[],singer:{},playMode:{sequence:0,loop:1,random:2},userInfo:{},loginStatus:!1,backPath:null},C=H,j={setCurrentIndex:function(e,t){e.currentIndex=t},setPlaying:function(e,t){e.playing=t},setPlayList:function(e,t){e.playList=t},setSongSheet:function(e,t){e.songSheet=t},setCurrentMode:function(e,t){e.currentMode=t},setHistoryList:function(e,t){e.historyList=t},setSinger:function(e,t){e.singer=t},setUserInfo:function(e,t){e.userInfo=t},setLoginStatus:function(e,t){e.loginStatus=t},setBackPath:function(e,t){e.backPath=t},setSearchHistory:function(e,t){e.searchHistory=t}},T=(n("c740"),n("6d75")),V=(n("a434"),15),N=50;function U(e,t,n,r){var i=e.findIndex(n);0!==i&&(i>0&&e.splice(i,1),e.unshift(t),r&&e.length>r&&e.pop())}function E(e,t){var n=e.findIndex(t);-1!==n&&e.splice(n,1)}function J(e){var t=JSON.parse(sessionStorage.getItem("search"))||[];return U(t,e,(function(t){return t===e}),V),sessionStorage.setItem("search",JSON.stringify(t)),t}function _(e){var t=JSON.parse(sessionStorage.getItem("search"))||[];return E(t,(function(t){return t===e})),sessionStorage.setItem("search",JSON.stringify(t)),t}function R(){return sessionStorage.removeItem("search"),[]}function B(e){var t=JSON.parse(sessionStorage.getItem("history"))||[];return U(t,e,(function(t){return t.id===e.id}),N),sessionStorage.setItem("history",JSON.stringify(t)),t}function Y(e){var t=JSON.parse(sessionStorage.getItem("history"))||[];return E(t,(function(t){return e.id===t.id})),sessionStorage.setItem("history",JSON.stringify(t)),t}function F(){return sessionStorage.removeItem("history"),[]}function q(e,t){return e.findIndex((function(e){return e.id===t.id}))}var $={selectPlay:function(e,t){var n=t.list,r=t.index;if(e.state.currentMode===e.state.playMode.random){var i=n[r];n=Object(T["c"])(n),r=q(n,i)}e.commit("setPlayList",n),e.commit("setCurrentIndex",r),e.commit("setPlaying",!0)},addHistoryAndPlay:function(e,t){var n=null;n=e.state.currentMode===e.state.playMode.random?Object(T["c"])(B(t)):B(t);var r=n.findIndex((function(e){return e.id===t.id}));e.commit("setHistoryList",B(t)),e.commit("setPlayList",n),e.commit("setCurrentIndex",r),e.commit("setPlaying",!0)},playAll:function(e,t){var n=t.list;e.state.currentMode===e.state.playMode.random&&(n=Object(T["c"])(n)),e.commit("setCurrentIndex",0),e.commit("setPlayList",n),e.commit("setPlaying",!0)},pausePlay:function(e){e.commit("setPlaying",!1)},stopPlay:function(e){e.commit("setPlaying",!1),e.commit("setPlayList",[]),e.commit("setCurrentIndex",-1)},saveSearchKey:function(e,t){e.commit("setSearchHistory",J(t))},deleteSearchKey:function(e,t){e.commit("setSearchHistory",_(t))},clearSearchHistory:function(e){e.commit("setSearchHistory",R())},saveHistoryList:function(e,t){e.commit("setHistoryList",B(t))},deleteOneHistory:function(e,t){e.commit("setHistoryList",Y(t))},clearHistoryList:function(e,t){e.commit("setHistoryList",F()),e.commit("setPlayList",[t])},clearSongSheet:function(e){e.commit("setSongSheet",[])}},K={getCurrentIndex:function(e){return e.currentIndex},getCurrentSong:function(e){return e.playList[e.currentIndex]||{}},getPlayList:function(e){return e.playList},getPlaying:function(e){return e.playing},getCurrentMode:function(e){return e.currentMode},getPlayMode:function(e){return e.playMode},getHistoryList:function(e){return e.historyList},getSearchHistory:function(e){return e.searchHistory},getLoginStatus:function(e){return e.loginStatus},getUserInfo:function(e){return e.userInfo}},z=!1,Z=new Vuex.Store({state:C,mutations:j,getters:K,actions:$,strict:z,plugins:z?[createLogger()]:[]}),G=Z,Q=new VueRouter({routes:O,scrollBehavior:function(e,t,n){return t.meta.keepAlive&&(t.meta.savedPosition=document.documentElement.scrollTop||document.body.scrollTop),{x:0,y:e.meta.savedPosition||0}}});Q.beforeEach((function(e,t,n){var r="404"===Q.resolve(t.path).route.name;"/login"!==e.path||"/"===t.path||r?"/login"===e.path&&r&&(G.commit("setBackPath","/home"),sessionStorage.setItem("backPath","/home")):(G.commit("setBackPath",t.fullPath),sessionStorage.setItem("backPath",JSON.stringify(t.fullPath))),n()}));var W,X=Q,ee=n("5530");W="https://nicemusic-api.lxhcool.cn";var te=axios.create({timeout:5e3,baseURL:W,withCredentials:!0});function ne(){return te.get("/banner")}function re(e){return te.get("/personalized?limit=".concat(e))}function ie(){return te.get("/personalized/newsong")}te.interceptors.request.use((function(e){return e}),(function(e){return Message.error({message:"请求超时！"}),Promise.reject(e)})),te.interceptors.response.use((function(e){var t=e.data,n=e.status;return 200===n?Promise.resolve(t):301===n?(Message.error({message:"请先登录！"}),void X.push({path:"/login"})):Promise.reject(e)}),(function(e){return Promise.reject(e)}));var oe=function(e){return te.get("/song/detail",{params:{ids:e}})},ue=function(e){return te.get("/lyric?id=".concat(e))};function ae(){return te.get("/top/artists?offset=0&limit=30")}function ce(e,t){return te.post("/login/cellphone",{phone:e,password:t,timestamp:(new Date).getTime()})}function se(e){var t=(new Date).getTime();return te.get("/user/detail?uid=".concat(e,"&timestamp=").concat(t))}function le(){return te.get("/search/hot")}function de(e,t){return te.get("/user/record?uid=".concat(e,"&type=").concat(t))}function fe(){return te.get("/playlist/catlist")}function me(){return te.get("/playlist/hot")}function ge(e){return te.get("/top/playlist",{params:e})}function pe(e,t){return te.get("/playlist/detail",{params:{id:e,s:t}})}function he(e){return te.get("/related/playlist?id=".concat(e))}function ve(e){return te.get("/playlist/subscribers",{params:e})}function ye(e){return te.get("/comment/playlist",{params:e})}function be(e,t){return te.post("/playlist/subscribe",{t:e,id:t,timestamp:(new Date).getTime()})}function ke(){return te.get("/daily_signin?type=1")}function Se(e){return te.get("/user/playlist",{params:e})}function Pe(e,t){return te.post("/user/follows",{uid:e,limit:t,timestamp:(new Date).getTime()})}function Ie(e,t){return te.post("/follow",{id:e,t:t,timestamp:(new Date).getTime()})}function we(){return te.get("/toplist/detail")}function Me(e){return te.get("/artist/list",{params:e})}function Le(){return te.get("/video/category/list")}function Ae(){return te.get("/video/group/list")}function xe(e){return te.get("/video/timeline/all?offset=".concat(e))}function De(e,t){return te.get("/video/group?id=".concat(e,"&offset=").concat(t))}function Oe(e){return te.get("/mv/all",{params:e})}function He(e){var t=(new Date).getTime();return te.get("/artists?id=".concat(e,"&timestamp=").concat(t))}function Ce(e){return te.get("/artist/album",{params:e})}function je(e){return te.get("/artist/mv?id=".concat(e))}function Te(e){return te.get("/artist/desc?id=".concat(e))}function Ve(e){return te.get("/simi/artist?id=".concat(e))}function Ne(e,t){return te.post("/artist/sub",{id:e,t:t,timestamp:(new Date).getTime()})}function Ue(e){return te.get("/album?id=".concat(e))}function Ee(e){return te.get("/comment/album",{params:e})}function Je(e){return te.post("/comment",e)}function _e(e){return te.post("/comment",e)}function Re(e){return te.post("/resource/like",e)}function Be(e){return te.get("/video/url?id=".concat(e))}function Ye(e){return te.get("/video/detail?id=".concat(e))}function Fe(e){return te.get("/video/detail/info",{params:e})}function qe(e){return te.get("/comment/video",{params:e})}function $e(e){return te.post("/comment/like",e)}function Ke(e){return te.get("/related/allvideo?id=".concat(e))}function ze(e){return te.get("/mv/url?id=".concat(e))}function Ze(e){return te.get("/mv/detail?mvid=".concat(e))}function Ge(e){return te.get("/mv/detail/info",{params:e})}function Qe(e){return te.get("/comment/mv",{params:e})}function We(e){return te.get("/simi/mv?mvid=".concat(e))}function Xe(e){return te.get("/search/suggest?keywords=".concat(e))}function et(e){return te.get("/cloudsearch",{params:e})}var tt=Object(ee["a"])({},r);n("4dcb"),n("4ee2"),n("3a10");Vue.config.productionTip=!1,Vue.prototype.$api=tt,Vue.prototype.$bus=new Vue,Vue.directive("preventReclick",{inserted:function(e,t){e.addEventListener("click",(function(){!1===e.disabled&&(e.disabled=!0,setTimeout((function(){e.disabled=!1}),t.value||2e3))}))}}),Vue.directive("focus",{inserted:function(e){e.focus()}}),new Vue({render:function(e){return e(l)},router:X,store:G}).$mount("#app")},"4dcb":function(e,t,n){},"4ee2":function(e,t,n){},5880:function(e,t){e.exports=Vuex},"6d75":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return f})),n.d(t,"b",(function(){return p}));n("99af"),n("4de4"),n("a15b"),n("d81d"),n("fb6a"),n("b0c0"),n("b680"),n("ac1f"),n("1276");var r=n("d4ec"),i=n("8bbf"),o=n.n(i);function u(e,t){function n(e,t,n){return e/=t,e%1===0?e:e.toFixed(n)}if(e>=1e4&&e<1e8){var r=n(e,1e4,t);return r+"万"}if(e>=1e8){var i=n(e,1e8,t);return i+"亿"}return e}function a(e,t){return String(e).length===t?e:(Array(t).join(0)+e).slice(-t)}o.a.filter("transNum",u),o.a.filter("formatZero",a);var c=function e(t){var n=t.id,i=t.singer,o=t.name,u=t.album,a=t.duration,c=t.picUrl,s=t.url,l=t.playCount,d=t.score;Object(r["a"])(this,e),this.id=n,this.singer=i,this.name=o,this.album=u,this.duration=a,this.picUrl=c,this.url=s,this.playCount=l,this.score=d};function s(e){return new c({id:e.id,singer:l(e.ar||e.artists),name:e.name,album:e.al?e.al.name:e.album.name,duration:e.dt||e.duration,picUrl:e.al?e.al.picUrl:e.album.artist.img1v1Url,url:"https://music.163.com/song/media/outer/url?id=".concat(e.id,".mp3"),playCount:e.playCount||"",score:e.score||""})}function l(e){if(!e)return"";var t=e.map((function(e){return e.name}));return t.join("/")}function d(e){if("number"!==typeof(1*e))return e;var t=parseInt(e/1e3/60),n=(e/1e3%60).toFixed(0);if(t=a(t,2),n=a(n,2),t>=60){var r=parseInt(e/1e3/60/60);return t=parseInt(e/1e3/60%60),r=a(r,2),t=a(n,2),r+":"+t+":"+n}return t+":"+n}function f(e){for(var t=e.slice(),n=t.length-1;n>0;n--){var r=Math.floor(Math.random()*n),i=t[n];t[n]=t[r],t[r]=i}return t}function m(e,t){var n=new Date(e),r=n.getFullYear(),i=a(n.getMonth()+1,2),o=a(n.getDate(),2),u=a(n.getHours(),2),c=a(n.getMinutes(),2),s=a(n.getSeconds(),2);return"YYYY-MM-DD"===t?"".concat(r,"-").concat(i,"-").concat(o):"YYYY-MM-DD HH:MM:SS"===t?"".concat(r,"-").concat(i,"-").concat(o," ").concat(u,":").concat(c,":").concat(s):"MM/DD HH:MM:SS"===t?"".concat(i,"/").concat(o," ").concat(u,":").concat(c,":").concat(s):void 0}function g(e){var t=6e4,n=60*t,r=24*n,i=30*r,o=12*i,u=(new Date).getTime(),a=u-e;if(a<=0||a>0&&a<t)return"刚刚";if(a>=t&&a<n)return parseInt(a/t)+"分钟前";if(a>=n&&a<r)return parseInt(a/n)+"小时前";if(a>=r&&a<i)return parseInt(a/r)+"天前";if(a>=i&&a<o)return parseInt(a/i)+"个月前";if(a>=o){var c=a/o;return c>=10?"10年前":parseInt(c)+"年前"}}function p(e){var t=new Date(e),n=t.toLocaleDateString(),r=n.split("/"),i=r[0]+"年",o=r[1],u=r[2];return i+"-"+"魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(2*o-2*(u<"102223444433".charAt(o-1)- -19),2)+"座"}o.a.filter("formatTime",d),o.a.filter("formatDate",m),o.a.filter("formatTimeBefore",g)},"8bbf":function(e,t){e.exports=Vue},cebe:function(e,t){e.exports=axios},d670:function(e,t){e.exports=Swiper}});
//# sourceMappingURL=app.1386e922.js.map