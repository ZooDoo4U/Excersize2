
(function()
{
    'use strict';
    angular.module('ShoppingListCheckOffApp',[])
    .controller( 'ToBuyController', ToBuyController )
    .controller( 'AlreadyBoughtController', AlreadyBoughtController  )
    .service('ShoppingListService',ShoppingListService);

    //
    //  Defend again minification errors... (verified)
    ToBuyController.$inject = ['ShoppingListService' ];

    function ToBuyController(ShoppingListService)
    {
        var toBuy = this;
        var shopService = ShoppingListService;
        toBuy.id            = 0;    
        toBuy.itemName      = "";
        toBuy.itemQuantity  = 0;

        toBuy.buyItemList = function()
        {
            console.log("buyItemList -- get");
            return shopService.buyItemList();
        }
        
        toBuy.addNewItemToBuy = function()
        {
            if( toBuy.newItemName.length <1) 
            {
                return;
            }

            var newItem =
                {
                    id:             0,
                    itemName:       toBuy.newItemName,
                    itemQuantity:   toBuy.newItemQuantity
                };
                        
            shopService.addNewItemToBuy(newItem);
            toBuy.newItemName="";
            toBuy.newItemQuantity=0;

        }

        toBuy.itemBought = function(id) 
        {          
            ShoppingListService.itemPurchased(id);
        }
        
        // Seed list with some items to start.    
        ShoppingListService.addNewItemToBuy({id: 0, itemName: "Thai Food", itemQuantity: 1} );
        ShoppingListService.addNewItemToBuy({id: 0, itemName: "Pizza",     itemQuantity: 2} );
        ShoppingListService.addNewItemToBuy({id: 0, itemName: "Coffee",    itemQuantity: 3} );
        ShoppingListService.addNewItemToBuy({id: 0, itemName: "Beer",      itemQuantity: 5} );

    };

    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController (ShoppingListService)
    {
        var showList = this;

        showList.boughtList = function(itemIndex)
        {
            return ShoppingListService.boughtItemList() ;
        };

        showList.moveBackToBuy = function(id)
        {
            ShoppingListService.moveBackToBuy(id);            
        };

    };

    function ShoppingListService()
    {
        var service=this;
        var itemIds=1;
        var toBuyItems=[];
        var boughtItems=[];

        service.addNewItemToBuy = function(newItem)
        {
            newItem.id = itemIds;
            ++itemIds;
            toBuyItems.push(newItem);
            console.log( "added " , newItem.itemName);
        };

        service.buyItemList = function()
        {
            return toBuyItems;
        }

        service.boughtItemList  = function()
        {
            return boughtItems;
        }

        service.itemPurchased = function(id)
        {
            for( var idx = 0; idx < toBuyItems.length; ++idx) 
            {
                if( toBuyItems[idx].id === id) 
                {
                    var item = toBuyItems[idx];
                    toBuyItems.splice(idx,1);
                    boughtItems.push(item);
                }
            }
        };

        service.moveBackToBuy = function(id)
        {
            for( var idx = 0; idx < boughtItems.length; ++idx) 
            {
                if( boughtItems[idx].id === id) 
                {
                    var item  = boughtItems[idx];
                    boughtItems.splice(idx,1);
                    toBuyItems.push(item);
                }
            }
        };
    };
})();


