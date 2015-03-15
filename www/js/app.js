// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var loaduserid=null;
angular.module('starter', ['ionic', 'starter-controllers','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
    $urlRouterProvider.otherwise("/signin");
})
.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	db = $cordovaSQLite.openDB({ name: "bankasiadb.db" });
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS useridinfo (user_id text)");
	
	       var query = "SELECT user_id FROM useridinfo";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
				//alert("user ID :"+res.rows.item(0).user_id);
				loaduserid = res.rows.item(0).user_id;
					//$scope.user = { uname:	res.rows.item(0).user_id};
					alert("user ID :"+loaduserid);	
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
		
  });
})


