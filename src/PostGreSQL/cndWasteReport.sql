CREATE TABLE cnd_waste_report (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
    a_id INT,                                       -- Reference to admin or related table
    created_by INT,                                 -- ID of the user who created it
    location VARCHAR(255),                          -- Location of waste
    description TEXT,                               -- Description of the waste
    photo VARCHAR(255),                             -- Photo file name or URL
    date DATE,                                      -- Report date
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Creation timestamp
);


--view table
select * from cnd_waste_report