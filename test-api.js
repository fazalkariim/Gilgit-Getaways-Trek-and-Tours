const http = require('http');
http.get('http://localhost:3000/api/tours', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const tours = JSON.parse(data);
      console.log('Tours API returned:', tours.map(t => t.image).slice(0, 5));
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
});
http.get('http://localhost:3000/api/expeditions', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const exps = JSON.parse(data);
      console.log('Expeditions API returned:', exps.map(t => t.image).slice(0, 5));
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
});
