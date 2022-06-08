import path from "path";
import fs from "fs";
import http from "http";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
const server = http.createServer((req, res) => {
	//Build file path
	let filePath = path.join(
		__dirname,
		"public",
		req.url === "/" ? "index.html" : req.url
	);

	let extName = path.extname(filePath);
	let contentType = "text/html";

	switch (extName) {
		case ".html":
			contentType = "text/html";
			break;
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".jpg":
			contentType = "image/jpg";
			break;
		case ".png":
			contentType = "image/png";
			break;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end("File Not found");
		}
		res.writeHead(200, { "Content-Type": contentType });
		res.end(data);
	});
});
server.listen(PORT, () => console.log("Server started on port ", PORT));
