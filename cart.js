const express = require('express');
const cartItems = express.Router();

//logic for our endpoints
const cart =[
    {id: 1, product: "avocados", price: 2, quantity: 5},
    {id: 2, product: "peppers", price: 4, quantity: 2},
    {id: 3, product: "lettuceBag", price: 5, quantity: 1},
    {id: 4, product: "milk", price: 3, quantity: 3},
    {id: 5, product: "bananas", price: 1, quantity: 7},
    {id: 6, product: "dogFood", price: 50, quantity: 5},
    {id: 7, product: "tomatoes", price: 4, quantity: 2},
    {id: 8, product: "yogurt", price: 5, quantity: 1},
    {id: 9, product: "almonds", price: 8, quantity: 3},
    {id: 10, product: "chocolate", price: 4, quantity: 7},
    {id: 11, product: "cheese", price: 3.5, quantity: 5},
    {id: 12, product: "water", price: 4, quantity: 2},
    {id: 13, product: "beef", price: 10, quantity: 1},
    {id: 14, product: "fish", price: 3, quantity: 3},
    {id: 15, product: "olives", price: 2.5, quantity: 2},
];

//1. GET /cart-items. Response: a JSON array of all cart items at http://localhost:8888/cart-items
//   Response Code: 200 (OK)

    cartItems.get("/", (request, response) => { 
        //query maxPrice, prefix, pageSize
        let filtered = cart;
        if (request.query.maxPrice){
            filtered = cart.filter( (cart) => cart.price <= (request.query.maxPrice))
        }
        if(request.query.prefix){
                 filtered = cart.filter((cart) => cart.product.startsWith(request.query.prefix.toLowerCase()))
                  }    
        if(request.query.pageSize){
            filtered = cart.slice(0, (request.query.pageSize))
        }
        response.status(200); 
        response.json(filtered);           
 });

//2. GET /cart-items/:id. Response: a JSON object of the item with the given ID.
//   Response Code: 200 (OK). IF item with that ID cannot be found, return a string
//   response “ID Not Found” with response code 404 (Not Found)

//example on what to put in browser http://localhost:8888/cart-items/2

    cartItems.get("/:id", (request, response) => { 
    const carts = cart.find(c => c.id === parseInt(request.params.id));
    if(!carts) {
        response.status(404).send("ID not found");
    }
    else{
        response.status(200); 
        response.json(carts);
    }
  });

//3. POST /cart-items Action: Add a cart item to the array using the JSON body of the request. 
//   Also generate a unique ID for that item.
//   Response Code: 201 (Created)
    //example on what to put in browser http://localhost:8888/cart-items

    cartItems.post("/", (request,response) => {
    const newItem = {
        id: cart.length +1,
        product: request.body.product,
        price: request.body.price,
        quantity: request.body.quantity 
    };
     cart.push(newItem);
     response.status(201); 
     response.send(newItem);
});

// 4. PUT /cart-items/:id  Action: Update the cart item in the array that has the given id. 
//    Use the JSON body of the request as the new properties.
//      b. Response: the updated cart item object as JSON.
//      c. Response Code: 200 (OK).

        cartItems.put('/:id', (request,response) => {
        const cartUpdate = cart.find(c => c.id === parseInt(request.params.id));
            //update cart
        cartUpdate.product = request.body.product;
        cartUpdate.price = request.body.price;
        cartUpdate.quantity = request.body.quantity;
        response.status(200);
        response.send(cartUpdate);

});

 //5. DELETE /cart-items/:id
 //    a. Action: Remove the item from the array that has the given ID.
 //    b. Response: Empty
 //    c. Response Code: 204 (No Content)

        cartItems.delete("/:id", (request, response) => {  
        const cartDelete = cart.find(c => c.id === parseInt(request.params.id));
         //delete
        const index = cart.indexOf(cartDelete); 
        cart.splice(index, 1);
   
        response.status(204).send("Deleted");
        response.send(cartDelete);
 });

//export module so we can use in other files
module.exports = cartItems;