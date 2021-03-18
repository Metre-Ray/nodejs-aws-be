'use strict';


/**
 * Find product by ID
 * Returns a single product
 *
 * productId BigDecimal ID of product to return
 * returns Product
 **/
exports.getProductById = function(productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : "image",
  "price" : 6,
  "count" : 1,
  "description" : "description",
  "id" : 0,
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all products from the store
 * 
 *
 * returns List
 **/
exports.getProducts = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : "image",
  "price" : 6,
  "count" : 1,
  "description" : "description",
  "id" : 0,
  "title" : "title"
}, {
  "image" : "image",
  "price" : 6,
  "count" : 1,
  "description" : "description",
  "id" : 0,
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

