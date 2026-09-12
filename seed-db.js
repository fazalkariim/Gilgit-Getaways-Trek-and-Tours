const http = require('http');

http.get('http://localhost:3000/api/tours', (res) => {
  console.log('Tours seeded:', res.statusCode);
});

http.get('http://localhost:3000/api/expeditions', (res) => {
  console.log('Expeditions seeded:', res.statusCode);
});
