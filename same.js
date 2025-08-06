var http = require('http');
var products = require('./product');
var productList = products.get();

const server = http.createServer((req, res) => {
  res.writeHead(200, 'content-type', 'text/json');
  if (req.url == "home" && req.method == "GET") {
    res.end("hello world")
  }
  else if (req.url == "/products" && req.method == "GET") {
    res.end(JSON.stringify(productList))
  }
  else if (req.url == "/addproduct" && req.method == "POST") {
    let newproduct = "";
    req.on('data', (chunk) => {
      newproduct += chunk;
    })
    req.on('end', () => {
      productList.push(JSON.parse(newproduct));
      res.end("product added successfully");
    })
  }
  else if (req.url.startsWith("/deleteproducts/") && req.method == "DELETE") {
    const id = req.url.split('/')[2];
    const index = productList.findIndex(e => e.productId == id);
    if (index != -1) {
      productList.splice(index, 1)
      res.end("element deleted")
    }
    else {
      res.end("product not found")
    }
  }
  else if (path.startsWith('/updateproducts/') && method === 'PUT') {
    const id = path.split('/')[2]; 
    let updatedData = '';
    req.on('data', chunk => updatedData += chunk);
    req.on('end', () => {
      const updatedProduct = JSON.parse(updatedData);

      
      const index = productList.findIndex(p => p.productId === id);
      if (index !== -1) {
        productList[index] = { ...productList[index], ...updatedProduct };
        res.end(JSON.stringify({ message: 'Product updated successfully' }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    });
  }
})
var port = 4300;
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
})
