import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// Get all records by userId
router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId });

    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }

    res.status(200).send(records);
  } catch (err: any) {
    console.error("GET /getAllByUserID Error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

// Create new record
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Incoming POST data:", req.body); // 🔍 log incoming data

    const newRecord = new FinancialRecordModel(req.body);
    const savedRecord = await newRecord.save();

    res.status(201).send(savedRecord);
  } catch (err: any) {
    console.error("POST /financial-records Error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

// Update existing record
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedRecord) return res.status(404).send("Record not found");

    res.status(200).send(updatedRecord);
  } catch (err: any) {
    console.error("PUT /:id Error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

// Delete a record
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);

    if (!deletedRecord) return res.status(404).send("Record not found");

    res.status(200).send(deletedRecord);
  } catch (err: any) {
    console.error("DELETE /:id Error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

export default router;
