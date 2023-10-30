const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Data for testing (in-memory storage)
let items = [
  { id: 1, name: 'Manoj' },
  { id: 2, age: '32' },
  { id: 3, address: 'New Delhi' }
];

app.use(bodyParser.json());

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Update by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);
    res.send('Item deleted');
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
