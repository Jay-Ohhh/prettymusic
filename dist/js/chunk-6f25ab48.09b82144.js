(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f25ab48"],{"1c2b":function(t,e,a){},"260f":function(t,e,a){},3256:function(t,e,a){},"4c54":function(t,e,a){t.exports=a.p+"img/logo-icon.7df49c00.png"},7266:function(t,e,a){"use strict";var s=a("260f"),r=a.n(s);r.a},8068:function(t,e,a){"use strict";var s=a("3256"),r=a.n(s);r.a},"9f5b":function(t,e,a){"use strict";var s=a("1c2b"),r=a.n(s);r.a},cdaa:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footer"},[a("div",{staticClass:"container"},[a("p",{staticClass:"title"},[t._v("prettymusic")]),a("p",{staticClass:"desc"},[t._v(t._s(t.oneSentence))]),a("div",{staticClass:"social flex-row"},[a("router-link",{attrs:{to:"/home"}},[a("i",{staticClass:"iconfont nicewangyiyunyinle"})]),t._m(0)],1)]),a("div",{staticClass:"copyright"},[a("div",{staticClass:"container"},[a("p",[a("span",[t._v("Copyright © 2020 "),2020!==t.currentYear?a("span",[t._v("-"+t._s(t.currentYear))]):t._e()]),a("a",{attrs:{href:"https://gitee.com/Jay_Ohhh",target:"_blank"}},[t._v("Jay_Ohhh")]),t._v(" All rights reserved. "),t._m(1),a("br")]),a("a",{staticClass:"project-address",attrs:{href:"https://gitee.com/Jay_Ohhh/prettrymusic",target:"_blank"}},[t._v(" prettymusic项目地址 ")])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"https://gitee.com/Jay_Ohhh/prettrymusic",target:"_blank"}},[a("i",{staticClass:"iconfont niceicon_githubb"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._v("Designed by "),a("a",{attrs:{href:"https://www.lxhcool.cn/",target:"_blank"}},[t._v("lxhcool")]),t._v(" & Improved by "),a("a",{attrs:{href:"https://gitee.com/Jay_Ohhh",target:"_blank"}},[t._v("Jay_Ohhh.")])])}],n=(a("96cf"),a("1da1")),o={data:function(){return{currentYear:(new Date).getFullYear(),oneSentence:""}},created:function(){var t=this;this.getOneSentence(),setInterval((function(){t.getOneSentence()}),5e3)},methods:{getOneSentence:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={c:"f",min_length:30},e.next=3,axios.get("https://v1.hitokoto.cn/",{params:a});case 3:s=e.sent,200===s.status&&(r=s.data.hitokoto,"。"!==r.charAt(r.length-1)&&(r+="。"),t.oneSentence=r+"  -- "+s.data.creator);case 5:case"end":return e.stop()}}),e)})))()}}},i=o,c=(a("9f5b"),a("2877")),l=Object(c["a"])(i,s,r,!1,null,"d146c0c4",null);e["a"]=l.exports},ef52:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header shadow"},[s("div",{staticClass:"container flex-row"},[s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("4c54"),alt:""}}),s("h1",{staticClass:"title"},[t._v("prettymusic")]),s("router-link",{attrs:{to:{path:"/home"},tag:"a"}})],1),s("ul",{staticClass:"nav flex-row"},[s("li",[s("router-link",{attrs:{to:"/home",tag:"a"}},[t._v("发现音乐")])],1),s("li",[s("router-link",{attrs:{to:"/rank",tag:"a"}},[t._v("排行榜")])],1),s("li",[s("router-link",{attrs:{to:"/playlist",tag:"a"}},[t._v("歌单")])],1),s("li",[s("router-link",{attrs:{to:"/singer",tag:"a"}},[t._v("歌手")])],1),s("li",[s("router-link",{attrs:{to:"/video",tag:"a"}},[t._v("视频")])],1),s("li",[s("router-link",{attrs:{to:"/mv",tag:"a"}},[t._v("MV")])],1)]),s("div",{staticClass:"search"},[s("i",{staticClass:"iconfont nicesearch-o",on:{click:t.openSearchInput}})]),s("div",{staticClass:"userbox"},[t.loginStatus?s("div",{staticClass:"logined flex-row"},[s("el-avatar",{staticClass:"avatar",attrs:{src:t.avatarUrl}}),s("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[s("span",{staticClass:"el-dropdown-link"},[t._v(" "+t._s(t.nickname)),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{icon:"el-icon-user",command:"personal"}},[t._v("个人主页 ")]),s("el-dropdown-item",{attrs:{divided:"",icon:"el-icon-switch-button",command:"loginOut"}},[t._v("退出登录 ")])],1)],1)],1):s("div",{staticClass:"login flex-row"},[s("router-link",{attrs:{to:"/login",tag:"a"}},[t._v("登录")])],1)])]),t.openSearch?s("search-input",{attrs:{"open-search":t.openSearch},on:{"update:openSearch":function(e){t.openSearch=e},"update:open-search":function(e){t.openSearch=e}}}):t._e()],1)},r=[],n=a("5530"),o=a("5880"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-wrap",class:t.openSearch?"open":"close"},[a("div",{staticClass:"overlay",on:{click:t.closeSearchPop}}),a("div",{staticClass:"search-body"},[a("div",{staticClass:"search-content"},[a("div",{staticClass:"search-popup-cover"},[t._m(0),a("div",{staticClass:"search-form"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],ref:"input",staticClass:"search-input",attrs:{type:"text",placeholder:"请输入搜索关键词"},domProps:{value:t.keyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)},input:function(e){e.target.composing||(t.keyword=e.target.value)}}}),a("i",{staticClass:"iconfont nicesearch-o",on:{click:t.search}})])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.getSearchHistory.length>0,expression:"getSearchHistory.length>0"}],staticClass:"search-hot"},[a("div",{staticClass:"title flex-row"},[a("i",{staticClass:"iconfont nicelishi"}),a("span",{staticClass:"title-text"},[t._v("历史搜索")]),a("span",{staticClass:"clear-text",on:{click:t.clearSearch}},[t._v("清空")])]),a("ul",{staticClass:"tags"},t._l(t.getSearchHistory,(function(e){return a("li",{key:e},[a("a",{staticClass:"btn flex-row",on:{click:function(a){return t.tag(e)}}},[t._v(t._s(e)+" "),a("i",{staticClass:"close-dark",on:{click:function(a){return a.stopPropagation(),t.deleteItem(e)}}})])])})),0)]),a("div",{staticClass:"search-hot"},[t._m(1),t.hots.length>0?a("ul",{staticClass:"tags"},t._l(t.hots,(function(e){return a("li",{key:e.first},[a("a",{staticClass:"btn",on:{click:function(a){return t.tag(e.first)}}},[t._v(t._s(e.first))])])})),0):t._e()])]),a("div",{staticClass:"btn-close flex-center",on:{click:t.closeSearchPop}},[a("span",{staticClass:"close-light"})])])])},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bg-effect"},[a("span",{staticClass:"layer"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title flex-row"},[a("i",{staticClass:"iconfont niceremensousuo"}),a("span",[t._v("热门搜索")])])}],l=(a("a15b"),a("ac1f"),a("1276"),a("96cf"),a("1da1")),h={data:function(){return{keyword:"",hots:[],historys:[]}},props:{openSearch:{type:Boolean,default:!1}},computed:Object(n["a"])({},Object(o["mapGetters"])(["getSearchHistory"])),methods:Object(n["a"])(Object(n["a"])({},Object(o["mapActions"])(["saveSearchKey","deleteSearchKey","clearSearchHistory"])),{},{closeSearchPop:function(){this.$emit("update:openSearch",!1)},search:function(){0!==this.keyword.split(" ").join("").length&&(this.closeSearchPop(),this.$router.push({path:"/search",query:{keyword:this.keyword}}),this.saveSearchKey(this.keyword))},tag:function(t){this.saveSearchKey(t),this.closeSearchPop(),this.$router.push({path:"search",query:{keyword:t}})},deleteItem:function(t){this.deleteSearchKey(t)},clearSearch:function(){this.clearSearchHistory()},getSearchHot:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getSearchHot();case 2:a=e.sent,200===a.code&&(t.hots=a.result.hots);case 4:case"end":return e.stop()}}),e)})))()}}),created:function(){this.getSearchHot()},mounted:function(){this.$refs.input.focus()}},u=h,p=(a("7266"),a("2877")),d=Object(p["a"])(u,i,c,!1,null,"bbb484f0",null),f=d.exports,v={data:function(){return{openSearch:!1,loginStatus:JSON.parse(sessionStorage.getItem("loginStatus"))}},computed:Object(n["a"])(Object(n["a"])({},Object(o["mapGetters"])(["getLoginStatus","getUserInfo"])),{},{avatarUrl:function(){return JSON.parse(sessionStorage.getItem("myInfo")).avatarUrl||this.getUserInfo.avatarUrl},nickname:function(){return JSON.parse(sessionStorage.getItem("myInfo")).nickname||this.getUserInfo.nickname}}),components:{searchInput:f},watch:{$route:function(t){this.openSearch=!1}},methods:{handleCommand:function(t){"personal"===t?this.$router.push({path:"/personal",query:{id:JSON.parse(sessionStorage.getItem("myInfo")).userId||this.$store.state.userInfo.userId}}):"loginOut"===t&&(sessionStorage.removeItem("token"),sessionStorage.removeItem("cookie"),sessionStorage.removeItem("loginStatus"),this.loginStatus=!1,sessionStorage.removeItem("myInfo"),this.$store.commit("setUserInfo",{}),this.$store.commit("setLoginStatus",!1),this.$forceUpdate(),this.$bus.$emit("forceUpdate"))},openSearchInput:function(){this.openSearch=!0}}},m=v,g=(a("8068"),Object(p["a"])(m,s,r,!1,null,"cdb23c5a",null));e["a"]=g.exports}}]);
//# sourceMappingURL=chunk-6f25ab48.09b82144.js.map