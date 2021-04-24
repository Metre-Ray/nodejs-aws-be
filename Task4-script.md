# Sql script to create and fill tables database from DBeaver

```
create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	price integer
)

create table stocks (
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price) values 
('Product-1', 'Short Product Description 1', 10),
('Product-2', 'Short Product Description 2', 12),
('Product-3', 'Short Product Description 3', 14),
('Product-4', 'Short Product Description 4', 8),
('Product-5', 'Short Product Description 5', 8),
('Product-6', 'Short Product Description 6', 18),
('Product-7', 'Short Product Description 7', 11),
('Product-8', 'Short Product Description 8', 5)

insert into stocks (product_id, count) values 
('1facc8f9-3d5b-4a2d-b0d7-8eec3b72d8c1', 10),
('af0161f4-550e-4c2f-92c6-0b59308ebe96', 3),
('59ebfc55-81ee-4718-ae96-0a1d12d89655', 45),
('89357ea0-6170-44d2-bdce-7520b2f0050c', 18),
('fd79d64b-e7e0-4a15-b3aa-9d1668bb75eb', 32),
('f339a08f-b89d-4d84-bab9-446e57407b56', 14),
('c2f654da-328a-44c5-9a41-7f1184062ade', 11)
```
