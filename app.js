import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

app.use('/api', routes);

  export default app;