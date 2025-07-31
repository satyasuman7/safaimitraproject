CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,                             -- Auto-incrementing primary key
    a_id INT NOT NULL,                                 -- Foreign key from admin table (Swacha Sathi ID)
    dates DATE NOT NULL,                               -- Attendance date
    check_in TIMESTAMP DEFAULT NULL,                  -- Time of check-in
    check_out TIMESTAMP DEFAULT NULL,                 -- Time of check-out
    status SMALLINT DEFAULT 0,                         -- 0 = Active, 1 = Full Day, 2 = Half Day, 3 = Absent
    latitude VARCHAR(50) DEFAULT NULL,                 -- Latitude at check-in
    longitude VARCHAR(50) DEFAULT NULL,                -- Longitude at check-in
    checkout_latitude VARCHAR(50) DEFAULT NULL,        -- Latitude at check-out
    checkout_longitude VARCHAR(50) DEFAULT NULL,       -- Longitude at check-out
    remarks TEXT DEFAULT NULL,                         -- Optional notes
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Created timestamp
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      -- Updated timestamp
);

-- To automatically update `update_at` on row update:
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_timestamp
BEFORE UPDATE ON attendance
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

--view table
SELECT * FROM attendance;
