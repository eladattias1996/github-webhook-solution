import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { handleEvent } from "./src/handleEvents";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const handleError = (error: Error) => {
  console.error("An error occured: ", error.message);
};

app.post("/", (req: Request, res: Response) => {
  try {
    handleEvent(req);

    res.sendStatus(200);
  } catch (error: unknown) {
    handleError(error instanceof Error ? error : new Error("Unknown"));

    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("started listening on port 3000");
