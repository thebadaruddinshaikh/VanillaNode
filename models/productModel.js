const products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function fetchAll() {
	return new Promise((resolve, reject) => {
		resolve(products);
	});
}

function fetch(id) {
	return new Promise((resolve, reject) => {
		const result = products.filter((prod) => prod.id == id);

		if (result.length) {
			resolve(result);
		} else {
			reject("Product not found");
		}
	});
}

function create(product) {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		products.push(newProduct);
		writeDataToFile("data/products.json", products);
		resolve(products);
	});
}

function deleteProduct(id) {
	return new Promise((resolve, reject) => {
		let deletedProd;
		productList = [];
		products.forEach((element) => {
			if (element.id != id) {
				productList.push(element);
			} else deletedProd = element;
		});
		if (Object.values(deleteProduct).length) {
			writeDataToFile("data/products.json", productList);
			resolve(deletedProd);
		} else reject("Product Does not exists");
	});
}

function updateProduct(id, product) {
	return new Promise((resolve, reject) => {
		prodList = products.filter((prod) => prod.id != id);
		console.log(products);
		const newProd = { id, ...product };
		console.log(newProd);
		prodList.push(newProd);
		writeDataToFile("data/products.json", prodList);
		resolve(newProd);
	});
}
module.exports = { fetchAll, fetch, create, deleteProduct, updateProduct };
