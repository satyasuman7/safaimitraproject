CREATE TABLE party_waste_report (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
    a_id INT,                                       -- Reference to admin or related table
	party_organised VARCHAR(255),					-- Party Organised
    venue_name VARCHAR(255),                        -- Venue name
	venue_contact INT,								-- Venue Contact
	function_type VARCHAR(50),						-- Function Type
	book_from_app VARCHAR(10),						-- Book From App
	no_of_guests INT,								-- Number of Guests
	customer_name VARCHAR(50),						-- Customer Name	
    image VARCHAR(255),                             -- Image filename or URL
    remarks TEXT,                                   -- Remarks or comments
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Creation timestamp
);

--view table
select * from  party_waste_report;

