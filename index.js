

const http = require('http');
const product = require('./products'); 
let productList = product.get();

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/products' && req.method === 'GET') {
    let body = '';
    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      try {
        const { amount } = JSON.parse(body);

        if (isNaN(amount)) {
          res.end(JSON.stringify({ message: "Invalid amount entered" }));
          return;
        }

        const filtered = productList.filter(p => parseInt(p.productPrice) <= amount);
        res.end(JSON.stringify(filtered));
      } catch (error) {
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const port = 4203;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
