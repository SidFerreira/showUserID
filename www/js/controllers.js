angular.module('starter-controllers', []])
.controller('SignInCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup, $timeout,mySqliteService) {
 	console.log("Signg In Controller :"+loaduserid);
 
 	$scope.uid = function() {
	//alert("init");
        var query = "SELECT user_id FROM useridinfo";
        mySqliteService.execute(query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
				//alert("user ID :"+res.rows.item(0).user_id);
				$scope.loaduserid = res.rows.item(0).user_id;
					//$scope.user = { uname:	res.rows.item(0).user_id};
						
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
	$scope.uid2 = function() {
//$scope.loaduserid='era@mybank.com';
	}
	//$scope.uid();
	
	$scope.user = { uname:loaduserid};
		
		
 	$scope.login= function (user) {
		
	alert("Loing In Controller :"+loaduserid);
		
		 var query = "SELECT user_id FROM useridinfo where user_id=?";
		  $cordovaSQLite.execute(db, query,[user.uname]).then(function(res) {
            if(res.rows.length > 0) {			
				for(var i=0; i<res.rows.length; i++){
					
				//$scope.branch_code_values=	res.rows.item(i).branch_code;				
				// $scope.results.push(res.rows.items(i));

				} 
				
            } else {
				
				
             
						//Begin Else Query
						var queryUserID = "SELECT user_id FROM useridinfo";
				 
					$cordovaSQLite.execute(db, queryUserID).then(function(res) {
						if(res.rows.length > 0) {			
							for(var i=0; i<res.rows.length; i++){
							var uid=res.rows.item(i).user_id;
							
							//Begin Update
							 var queryUserIDUpdate = "UPDATE useridinfo set user_id=? where user_id=?";
								 $cordovaSQLite.execute(db, queryUserIDUpdate,[user.uname,uid]).then(function(res) {
								  alert("Updated Successfully");								
								}, function (err) {
								   // console.error(err);
									 alert("Error Method");
								});
							//End Update

							} 
							
						} else {
						 
							//Begin For Insert
								var insertqQuery = "INSERT INTO useridinfo (user_id) VALUES (?)";
									 $cordovaSQLite.execute(db, insertqQuery,[user.uname]).then(function(res) {
								alert("Insert successfully !");
								
								}, function (err) {
								   // console.error(err);
									 alert("Error Method");
								});
							//End For Inser
						}
					}, function (err) {
					   // console.error(err);
						 alert("Error Method");
					});
					//End Else Query
            }
        }, function (err) {
           // console.error(err);
			 alert("Error Method");
        });
	}
 
 })
 .controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {})