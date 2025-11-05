import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
dotenv.config();



const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Server is Live');
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, async() => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});