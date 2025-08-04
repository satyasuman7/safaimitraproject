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
const __dirname = path.resolve();

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
pool.connect().then(() => console.log("Connected to PostgreSQL")).catch((err) => console.error("DB Connection Error:", err));

// Multer setup for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/dbImages");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `photo-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET attendance data
router.get("/attendence", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM attendence ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).send("Failed to fetch attendance data");
  }
});

// Punch In (POST)
router.post("/attendence", upload.single("photo"), async (req, res) => {
  const { a_id, latitude_check_in, longitude_check_in, check_in } = req.body;
  const photoPath = `/dbImages/${req.file.filename}`;

  if (!a_id || !check_in || !photoPath) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO attendence 
        (a_id, latitude_check_in, longitude_check_in, check_in, check_in_photo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [a_id, latitude_check_in, longitude_check_in, check_in, photoPath]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error("Punch In Error:", error);
    res.status(500).json({ error: "Punch In failed" });
  }
});

// Punch Out (PUT)
router.put("/attendence/:id", upload.single("photo"), async (req, res) => {
  const { latitude_check_out, longitude_check_out, check_out } = req.body;
  const id = req.params.id;
  const photoPath = `/dbImages/${req.file.filename}`;

  if (!check_out || !photoPath) {
    return res.status(400).json({ error: "Missing required fields for Punch Out" });
  }

  try {
    await pool.query(
      `UPDATE attendence
       SET latitude_check_out = $1,
           longitude_check_out = $2,
           check_out = $3,
           check_out_photo = $4,
           update_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [latitude_check_out, longitude_check_out, check_out, photoPath, id]
    );

    res.status(200).json({ message: "Punch Out updated" });
  } catch (error) {
    console.error("Punch Out Error:", error);
    res.status(500).json({ error: "Punch Out failed" });
  }
});

// CONSERVANCY LANE REPORT
router.post("/conservancyreport", async (req, res) => {
    const { a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date } = req.body;

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
    console.error("Conservancy report error:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

// COMMERCIAL CLEAN REPORT
router.post("/commercialcleanreport", async (req, res) => {
    const { a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date } = req.body;

  try {
    const query = `
      INSERT INTO commercial_cleaning_report 
      (a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
      const values = [ a_id, area, ward_no, city, latitude, longitude, sweeper_present, is_clean, date ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Commercial report error:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

export default router;