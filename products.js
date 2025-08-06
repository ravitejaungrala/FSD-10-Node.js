var products=[
    {
     productId:"1",
      productName: "Asus Gaming",
      productDescription: "Best for gaming",
      productCategory: "Laptop",
      productPrice: "45000",
      productImage: "https://via.placeholder.com/150"
    },
    {
      productId: "2",
      productName: "HP Business",
      productDescription: "Best for work",
      productCategory: "Laptop",
      productPrice: "55000",
      productImage: "https://via.placeholder.com/150"
    }
]
function getProducts(){
    return products;
}
exports.get=getProducts;