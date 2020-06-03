(function (){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function foundItems(){
  var ddo =
  {
    templateUrl: 'foundItems.html';
    scope:{
      foundItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService)
{
  var ctrl = this;

  var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

  ctrl.getItems = function(searchTerm)
  {
    promise.then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  };
}

MenuSearchService.$inject = ['$hhtp','ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
   return $http({
     method: "GET",
     url: (ApiBasePath + "/menu_items.json"),
     params: {
       category: searchTerm
     }
   }).then(function (result)
 {
   var foundItems;


   return foundItems;
 });

};
}



})();
