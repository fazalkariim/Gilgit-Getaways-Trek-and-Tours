const http = require('http');

http.get('http://localhost:3000/images/tour-kalash.jpg', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
});
