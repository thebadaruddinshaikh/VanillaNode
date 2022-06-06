const Product = require("../models/productModel");
const { getRequestBody } = require("../utils");
/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Returns all products
 * @route GET /api/products
 */
async function getProducts(req, res) {
	try {
		const products = await Product.fetchAll();

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(JSON.stringify(products));
	} catch (error) {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end(error);
	}
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Number} id
 * @desc fetch a Product from id
 * @route GET /api/products/id
 */
async function getProduct(req, res, id) {
	try {
		const product = await Product.fetch(id);

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(JSON.stringify(product));
	} catch (error) {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end(error);
	}
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Create a Product
 * @route POST /api/products/id
 */
async function createProduct(req, res) {
	try {
		const { title, description, price } = await getRequestBody(req);
		const product = {
			title,
			description,
			price,
		};
		console.log(product);
		const newProduct = await Product.create(product);
		res.writeHead(201, { "Content-Type": "text/html" });
		res.end(JSON.stringify(newProduct));
	} catch (error) {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end(error);
	}
}

async function deleteProduct(res, id) {
	try {
		let deleteProduct = await Product.deleteProduct(id);
		res.writeHead(201, { "Content-Type": "text/html" });
		res.end(JSON.stringify(deleteProduct));
	} catch (error) {
		console.log(error);
	}
}

async function updateProduct(req, res, id) {
	try {
		const { title, description, price } = await getRequestBody(req);
		const product = {
			title,
			description,
			price,
		};
		let updatedProduct = await Product.updateProduct(id, product);
		console.log("From update", id);
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(JSON.stringify(updatedProduct));
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	deleteProduct,
	updateProduct,
};
