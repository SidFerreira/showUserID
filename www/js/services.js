angular.module('starter-controllers', []])
.service('mySqliteService', function($cordovaSQLite) {
    var database = null;

    this.getDatabase = function() {
        /// My default promise code. I like to use .success and .error instead of .then
        var deferred = $q.defer(),
            promise = deferred.promise;
        promise.success = function(fn) {  
            promise.then(function(data) { fn(data); });
            return promise;
        };
        promise.error = function(fn) {  
            promise.then(null, function() { fn(); });
            return promise;
        };
        /// END

        if(!isInitialized) {
            db = $cordovaSQLite.openDB({ name: "bankasiadb.db" });
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS useridinfo (user_id text)");
            var query = "SELECT user_id FROM useridinfo";
            $cordovaSQLite.execute(db, query)
                .then(function(res) {
                    if(res.rows.length > 0) {
                        //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                        //alert("user ID :"+res.rows.item(0).user_id);
                        loaduserid = res.rows.item(0).user_id;
                            //$scope.user = { uname:    res.rows.item(0).user_id};
                            alert("user ID :"+loaduserid);  
                    } else {
                        console.log("No results found");
                    }
                    deferred.resolve(db);
                }, function (err) {
                    console.error(err);
                    deferred.reject();
                });
        } else {
            deferred.resolve(db);
        }

        return promise;
    }

    this.execute = function(query) {
        /// My default promise code. I like to use .success and .error instead of .then
        var deferred = $q.defer(),
            promise = deferred.promise;
        promise.success = function(fn) {  
            promise.then(function(data) { fn(data); });
            return promise;
        };
        promise.error = function(fn) {  
            promise.then(null, function() { fn(); });
            return promise;
        };
        /// END
        this.getDatabase().success(function(db) {
            $cordovaSQLite.execute(db, query).then(function(res) {
                deferred.resolve(res);
            }, function() {
                deferred.reject();
            })
        }).error(function() {
            //Failed to get DB
            deferred.reject();  
        })
        return promise;
    };

    return this;
})