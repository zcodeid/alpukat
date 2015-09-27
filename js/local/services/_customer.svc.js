app.factory('CustomerSvc', function($http, $q, _) {
    return {
        get: function() {
            return $http.get('js/local/data.js');
        },

        search: function(q){
        	var d = $q.defer();
        	var url = "http://zcodeapi.herokuapp.com/api/AlpukatCustomer?";
        	var filter = "filter[where][name][regexp]="+q+"/i&";
        	var limit = "filter[limit]=5&";
        	var order = "filter[order]=name&";
        	var token = "access_token=MWob5MXT64yRBImh07tN7hEZEF3W2brt82n1UXDQXmIJZV6av06RACA6PVS7EscJ";
        	$http.get(url+filter+limit+order+token).then(function (res){
        		console.log(res);
        		d.resolve({
        			data: res.data
        		})
        	}, function (e){
        		d.reject(e);
        	});
        	return d.promise;
        },

        search2: function(q) {
            var d = $q.defer();
            $http.get('js/local/data.js').then(function(res) {
                var flag = q == undefined || q == "";
                var out = flag ? res.data.splice(0, 100) :
                    _.filter(res.data, function(o) {
                        q = q.toLowerCase();
                        var a = o.name.toLowerCase();
                        var b = o.meterno.toLowerCase();
                        return a.indexOf(q) != -1 || b.indexOf(q) != -1;
                    });
                d.resolve({
                    data: out.splice(0, 100)
                });
            }, function(e) {
                d.reject(e);
            });
            return d.promise;
        }
    }
});