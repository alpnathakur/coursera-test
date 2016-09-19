 var app = angular.module("LunchCheck",[]);
  app.controller("LunchCheckController",LunchCheckController);
  LunchCheckController.$inject=['$scope'];
  function LunchCheckController($scope){
	  $scope.menuData="";

    $scope.displayMessage= function(){
        $scope.message="";
      var menuArray = $scope.menuData.split(",");
      var count=0;//actual item counts
      //check for empty strings
      for(var i=0;i<menuArray.length;i++){
        if(menuArray[i].trim() !="")
        count++;
      }
      $scope.count = count;
      if(count==0){
      $scope.message="Please enter data first";
      $scope.menuData="";
    }
      else if(count <4)
      $scope.message="Enjoy!";
      else {
        $scope.message="Too much!";
      }
    }
	$scope.fontcolorClass = function(number){
      if(number==0)
      return 'red';
      else {
        return 'green';
      }
    }
	    $scope.inputTextBorder = function(number){
      if(number==0)
      return 'redborder';
      else {
        return 'greenborder';
      }
    }
  }
   
    

  