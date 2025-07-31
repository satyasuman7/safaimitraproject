CREATE TABLE mo_khata_sale (
  id SERIAL PRIMARY KEY,
  a_id INT,
  created_by INT,
  quantity INT,
  rate NUMERIC(10,2),
  amount NUMERIC(10,2),
  buyer_name VARCHAR(255),
  date DATE,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--view table
select * from mo_khata_sale