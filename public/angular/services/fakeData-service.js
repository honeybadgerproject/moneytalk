angular.module('app')
	.service('fakeData', function() {






    /************ stores 1 ***********/

		var store

    var stores = [
										{
											"storeId": "1" ,
											"storeName": "H&M" ,
											"promotions": [
												{ "card": "American Express", "promotion": "........."},
												{ "card": "Visa" , "promotion": "........."}
											]
										}
									];


		this.returnStores = function () {
      return stores;
    }


});
