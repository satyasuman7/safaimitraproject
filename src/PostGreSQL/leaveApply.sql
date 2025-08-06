	CREATE TABLE leave_apply (
	    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
	    a_id INT,                                       -- Reference to admin or related table
		user_name VARCHAR(255),					        -- Party Organised
	    employee_code VARCHAR(50),                      -- Venue name
		mobile INT,								        -- Venue Contact
		ward_area VARCHAR(50),						    -- Function Type
		leave_type VARCHAR(50),						    -- Book From App
		leave_start_date DATE,						    -- Number of Guests
		leave_end_date DATE,						    -- Customer Name	
	    no_of_days INT,                                 -- Image filename or URL
	    reason_of_leave TEXT,                           -- Remarks or comments
	    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Creation timestamp
	);

--view table
select * from  leave_apply;

