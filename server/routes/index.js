const express = require('express');

const { signup } = require('../controllers/signupController');
const { login } = require('../controllers/loginController');
const { addProduct } = require('../controllers/saler/product/addProduct');
const { getProduct, getProductById } = require('../controllers/product');
const { updateProduct } = require('../controllers/saler/product/updateProduct');
const { deleteProduct } = require('../controllers/saler/product/deleteProduct');
const { addCategory } = require('../controllers/saler/category/addCategory');
const { checkout } = require('../controllers/customer/checkout');
const OrderController = require('../controllers/customer/order');

const validateSaler = require('../middlewares/validateSaler');

const loginSchema = require('../schemas/users/login');
const productSchema = require('../schemas/products/updateProduct');
const validator = require('../middlewares/validate');


const router = express();

router.post("/signup", signup);
router.post("/login", validator(loginSchema), login);

//Products
router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.post('/products', validateSaler("Saler"), addProduct);
router.put('/products/:id', validateSaler("Saler"), validator(productSchema), updateProduct);
router.delete('/products/:id', validateSaler("Saler"), deleteProduct);

//Categories
router.get('/categories', getProduct);
router.get('/categories/:id', getProductById);
router.post('/categories', validateSaler("Saler"), addCategory);
router.put('/categories/:id', validateSaler("Saler"), updateProduct);
router.delete('/categories/:id', validateSaler("Saler"), deleteProduct);

//Order
router.get('/order', OrderController.index);
router.get('/order/:customerid', getProductById);
router.post('/order', validateSaler("Saler"), addCategory);
router.put('/order/:id', validateSaler("Saler"), updateProduct);

//OrderDetails
router.get('/orderdetail/:orderid', getProduct);
router.post('/orderdetail', validateSaler("Saler"), addCategory);
router.put('/orderdetail', validateSaler("Saler"), updateProduct);
router.delete('/orderdetail/:id', validateSaler("Saler"), deleteProduct);

//Checkout
router.post('/checkout', validateSaler("Customer"), checkout)

//Payment
router.post('/pay', getProduct);

//Customers
router.get('/customers/:id', getProductById);
router.put('/customer/:id', validateSaler("Saler"), updateProduct);

//Salers
router.get('/salers/:id', getProductById);
router.put('/saler/:id', validateSaler("Saler"), updateProduct);

module.exports = router