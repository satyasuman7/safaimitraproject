CREATE TABLE conservancy_lane_report (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
    a_id INT,                                       -- Reference to admin or related table
    area VARCHAR(255),                              -- Area name
    ward_no VARCHAR(50),                            -- Ward number
    city VARCHAR(255),                              -- City Name
    longitude FLOAT,                       			-- Longitude 
    latitude FLOAT,                        			-- Latitude
	sweeper_present INT,							-- No. of Sweeper Present
    is_clean BOOLEAN,                               -- Lane condition
    date DATE,                                      -- Report date
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Created timestamp
);

--view Table
select * from conservancy_lane_report