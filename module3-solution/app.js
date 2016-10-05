(function () {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);

function FoundItems(){
  var ddo={
  template: '{{cat.name}},{{cat.short_name}},{{cat.description}}'
  };
  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
  var menu = this;
  menu.searchTerm = "";
  menu.foundItems=[];
  menu.noItem=false;
  menu.getData =function(){
  if(menu.searchTerm==""){
	  menu.noItem=true;
  }
  else{
  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response) {
  var categories = response.data.menu_items;
  
  menu.foundItems.length = 0;
  for (var i = 0; i < categories.length; i++) {
  var desc = categories[i].description;
  
  if (desc.toLowerCase().indexOf(menu.searchTerm) !== -1) {
  menu.foundItems.push(categories[i]);
  }
  }
  if(menu.foundItems.length>0)
	  menu.noItem = false;
  else
	  menu.noItem = true;
  
  })
  .catch(function (error) {
  console.log(error);
  })
  }
  };

  menu.removeItem = function(itemIndex){
  menu.foundItems.splice(itemIndex,1);
  };

  }

  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function () {
  var response = $http({
  method: "GET",
  url: "https://davids-restaurant.herokuapp.com/menu_items.json"
  });

  return response;
  };
  }
})();
