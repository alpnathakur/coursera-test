(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
      console.log("in buy controller");
      var buy = this;
      buy.items = ShoppingListCheckOffService.getBuyList();
      //console.log(buyList.items);
      buy.buyItems=function(itemIndex) {
        ShoppingListCheckOffService.removeFromBuyList(itemIndex);
      }
    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        console.log("in bought controller");
      var bought = this;
      bought.items = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService(){
      var service = this;
      var boughtItems=[];
      var toBuyItems=[{ name: "cookies", quantity: 10 },{ name: "chips", quantity: 15 },{ name: "cold-drink", quantity: 5 },{ name: "chocos", quantity: 2 },{ name: "noodles", quantity: 11 }];
      console.log(toBuyItems);
      //add to bought items
      service.addToBoughtList = function(item){
        boughtItems.push(item);
      };
      //remove from tobuy items
      service.removeFromBuyList = function(itemIndex){
        boughtItems.push(toBuyItems[itemIndex]);
      //service.addToBoughtList();
        toBuyItems.splice(itemIndex,1);
      };
      service.getBoughtList= function(){
        return boughtItems;
      };
      service.getBuyList=function(){
        return toBuyItems;
      };
    }

})();
