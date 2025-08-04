CREATE TABLE attendence (
  id SERIAL PRIMARY KEY,
  a_id INT NOT NULL, 
  latitude_check_in DECIMAL,
  longitude_check_in DECIMAL,
  latitude_check_out DECIMAL,
  longitude_check_out DECIMAL,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  check_in_photo TEXT,
  check_out_photo TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--view table
select * from attendence

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

