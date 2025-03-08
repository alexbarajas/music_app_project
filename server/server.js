import express from "express";
import cors from "cors";

const app = express();
const port = 6001;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the Music App Backend!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
