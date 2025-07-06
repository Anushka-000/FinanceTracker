import express,{Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from './routes/financial-records';
import cors from "cors";
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const mongoURI: string = "mongodb+srv://Anushka:%40nushka2005@personalfinancetracker.e5w6b.mongodb.net/"

mongoose.connect(mongoURI).then(() => console.log("Connected to MongoDB!")).catch((err) => console.log("Failed to connect to MongoDB:", err));

app.use("/financial-records",financialRecordRouter);
app.listen(port,()=> {
  console.log(`server running on port ${port}`);
});
//node version: v22.13.0