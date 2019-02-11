const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const parserJSON = bodyParser.json();
const parserURL = bodyParser.urlencoded({ extended: true });
let data = [
  {
    username: 'Paul',
    phoneNumber: '11-11-11',
    address: 'Lomov st. 165, 69 apt.',
  },
  {
    username: 'Lera',
    phoneNumber: '22-22-22',
    address: 'Kazanskoe pr. 2, 32 apt.',
  },
  {
    username: 'Wendy',
    phoneNumber: '33-33-33',
    address: 'Kirov st. 8, 12 apt.',
  },
  {
    username: 'Nikita',
    phoneNumber: '44-44-44',
    address: 'Gagarin st. 72, 30 apt.',
  },
];

app.use(express.static('./dist'));

app.get('/getData', function (req, res) {
  const filter = req.query.searchKey ? req.query.searchKey : '';
  const filteredData = data.filter(item => 
    item.username.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  
  res.json(filteredData);
});

app.post('/deleteData', parserJSON, function (req, res) {
  data.forEach((elem, index) => {
    if (elem.username === req.body.username) {
      data.splice(index, 1);
    }
  });
  res.json(data);
});

app.post('/editData', parserJSON, function (req, res) {
  data.forEach(elem => {
    if (elem.username === req.body.username) {
      elem.phoneNumber = req.body.phoneNumber;
      elem.address = req.body.address;
    }
  });
  res.json(data);
});

app.post('/addData', parserJSON, function (req, res) {
  data.push({username: req.body.username, phoneNumber: req.body.phoneNumber, address: req.body.address});
  res.json(data);
});

app.listen(3000);