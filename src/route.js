  import express from "express";
  import cors from "cors";
  import pkg from "pg";
  import dotenv from "dotenv";
  import multer from "multer";
  import path from "path";
  import fs from "fs";

  dotenv.config();
  const { Pool } = pkg;

  const router = express.Router();

  // Middleware for router
  router.use(cors());
  router.use(express.json());

  // Create PostgreSQL connection
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  // Test database connection
  pool
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("DB Connection Error:", err));

  // GET attendance data
  router.get("/attendence", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM attendance ORDER BY id DESC"
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      res.status(500).send("Failed to fetch attendance data");
    }
  });

  //CONSERVANCY LANE REPORT
  router.post("/conservancyreport", async (req, res) => {
    const { a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date, } = req.body;

    try {
      const query = `
        INSERT INTO conservancy_lane_report
        (a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;
      const values = [ a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date ];

      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to submit report" });
    }
  });

  //COMMERCIAL CLEAN REPORT
  router.post("/commercialcleanreport", async (req, res) => {
    const { a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date } = req.body;

    try {
      const query = `
        INSERT INTO commercial_cleaning_report 
        (a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
      `;
      const values = [ a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date ];

      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to submit report" });
    }
});

export default router;