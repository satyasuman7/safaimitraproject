CREATE TABLE road_clean_report (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
    a_id INT,                                       -- Swacha Sathi ID
    created_by INT,                                 -- Redundant but useful for joins
    location VARCHAR(255),                          -- Location of the road
    date DATE,                                      -- Cleaning date
    remarks TEXT,                                   -- Remarks
    image VARCHAR(255),                             -- Image file name or URL
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Record creation timestamp
);


--view table
select * from road_clean_report