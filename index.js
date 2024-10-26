import express from "express";
import { router as userRouter } from "./users/users.js";

const PORT = 3008;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
