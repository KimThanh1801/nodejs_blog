import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use("/api", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
