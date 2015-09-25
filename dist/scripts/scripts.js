document.querySelector("html").classList.add("js");var eradikalApp=angular.module("eradikalApp",["ngSanitize","ngRoute"]);eradikalApp.controller("navCtrl",["$scope",function(t){t.btNav=function(a){a.stopPropagation(),t.navOpen=!t.navOpen}}]),eradikalApp.controller("playCtrl",["$scope","$http",function(t,a){t.btPlay=function(){t.playOpen=!t.playOpen}}]),eradikalApp.controller("viewCtrl",["$scope","$element","$window","$location",function(t,a,e,n){t.$on("$viewContentLoaded",function(){e.ga("send","pageview",{page:n.url()})}),t.$on("$routeChangeStart",function(){a.addClass("loading")}),t.$on("$routeChangeSuccess",function(){setTimeout(function(){a.removeClass("loading")},600)})}]),eradikalApp.controller("band",["$scope","$http",function(t,a){a.get("data/band.json").then(function(a){t.data=a.data},function(t){})}]),eradikalApp.controller("shop",["$scope","$http",function(t,a){t.baseUrl="http://eradikalinsane.bigcartel.com",a.get("http://api.bigcartel.com/eradikalinsane/products.json").then(function(a){t.data=a.data},function(t){})}]),eradikalApp.controller("videos",["$scope","$http","$sce",function(t,a,e){var n="http://www.youtube.com/embed/";a.get("data/videos.json").then(function(a){a.data.forEach(function(t){t.url=e.trustAsResourceUrl(n+t.id)}),t.data=a.data},function(t){})}]),eradikalApp.controller("shows",["$scope","$http",function(t,a){t.data={},a.get("data/shows.json").then(function(a){t.data.imgs=a.data},function(t){}),a({method:"jsonp",url:"http://api.bandsintown.com/artists/EradikalInsane/events.json?api_version=2.0&app_id=ei2015&date=all&callback=JSON_CALLBACK"}).then(function(a){for(var e=a.data,n=new Date,o=!1,l=[],i=[],r=l,c="unshift",p=0,s=e.length;s>p;p++){var d=e[p];!o&&new Date(d.datetime)>n&&(o=!0,r=i,c="push"),r[c](d)}t.data.shows={past:l,upcoming:i}},function(t){})}]),eradikalApp.controller("reviews",["$scope","$http",function(t,a){a.get("data/reviews.json").then(function(a){t.data=a.data},function(t){})}]),eradikalApp.controller("contact",["$scope","$http",function(t,a){a.get("data/contact.json").then(function(a){t.data=a.data},function(t){})}]),eradikalApp.controller("links",["$scope","$http",function(t,a){a.get("data/links.json").then(function(a){t.data=a.data},function(t){})}]),eradikalApp.controller("home",["$scope","$http",function(t,a){var e=!1;t.data={},t.flipped=!1,t.flipImage=function(a){switch(a){case"enter":e=!1,t.flipped=!0;break;case"leave":t.flipped=!1;break;case"click":e?t.flipped=!t.flipped:e=!0}},a.get("data/home.json").then(function(a){t.data.imgs=a.data},function(t){}),twitterFetcher.fetch({id:"447793679625764864",dataOnly:!0,customCallback:function(a){t.data.tweets=a,t.$apply()}})}]),eradikalApp.config(["$routeProvider",function(t){t.when("/home",{templateUrl:"partials/home.html",controller:"home"}).when("/band",{templateUrl:"partials/band.html",controller:"band"}).when("/shows",{templateUrl:"partials/shows.html",controller:"shows"}).when("/videos",{templateUrl:"partials/videos.html",controller:"videos"}).when("/shop",{templateUrl:"partials/shop.html",controller:"shop"}).when("/reviews",{templateUrl:"partials/reviews.html",controller:"reviews"}).when("/contact",{templateUrl:"partials/contact.html",controller:"contact"}).when("/links",{templateUrl:"partials/links.html",controller:"links"}).otherwise({redirectTo:"/home"})}]);