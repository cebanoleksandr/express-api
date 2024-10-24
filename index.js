import express from "express";

const PORT = 3008;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
