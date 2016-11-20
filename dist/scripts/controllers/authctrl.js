'use strict';
angular.module('myServiceApp')
  .controller('authctrl', function ($scope,$http,$filter,$location,$cookies) {
    var vm=$scope;
    vm.user={
      "fullname":"",
      "email":"",
      "password":"",
      "dob":"",
      "gender":"Male",
      "mobile":null,
      "image":""
    };

    vm.loginUser= function() {
      console.log(vm.login);
      $http.post('/loginUser',vm.login)
      .then(function(res){
        console.log(res);
        if(res.data.token!==null) {
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $cookies.put('token', res.data.token,{'expires': expireDate});
          $location.path("#/");
        }
      })
      .catch(function(err){
        console.log("error:",err);
      })
    };

    vm.register=function(){
      vm.user.dob=new Date($filter('date')(new Date(vm.user.dob), "yyyy-MM-dd"));//new Date($filter('date')(vm.user.dob,'fullDate'));
      console.log(vm.user);
      $http.post('/register',vm.user)
      .then(function(res){
        console.log("data:",res);
      })
      .catch(function(err){
        console.log("error:",err);
      })
    }

    $(document).ready(function(){
        $(".nav-tabs a").click(function(e){
          e.preventDefault();
          $(this).tab('show');
        });
    });
  });
