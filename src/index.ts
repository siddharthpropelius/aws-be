import express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  return res.status(200).json("hello");
});

app.listen(3001, () => {
  console.log("Server running on port 3001"); // Server listening on port 3001
});
