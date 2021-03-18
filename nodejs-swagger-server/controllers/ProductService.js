'use strict';

var utils = require('../utils/writer.js');
var ProductService = require('../service/ProductServiceService');

module.exports.getProductById = function getProductById (req, res, next) {
  var productId = req.swagger.params['productId'].value;
  ProductService.getProductById(productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProducts = function getProducts (req, res, next) {
  ProductService.getProducts()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
