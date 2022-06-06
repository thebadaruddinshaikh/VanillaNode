const fs = require("fs");

function writeDataToFile(filename, content) {
	return fs.promises.writeFile(filename, JSON.stringify(content), "utf-8");
}

function getRequestBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			resolve(JSON.parse(body));
		});
	});
}
module.exports = {
	writeDataToFile,
	getRequestBody,
};
