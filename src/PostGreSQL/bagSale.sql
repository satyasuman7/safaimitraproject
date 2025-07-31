CREATE TABLE bag_sale (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing primary key
    a_id INT,                                       -- Reference to admin or related table
    created_by INT,                                 -- ID of the user who created it
    quantity INT,                                   -- Quantity of bags
    rate NUMERIC(10,2),                             -- Rate per bag
    amount NUMERIC(10,2),                           -- Total amount
    buyer_name VARCHAR(255),                        -- Name of the buyer
    date DATE,                                      -- Sale date
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Record creation timestamp
);

--view table
select * from bag_sale