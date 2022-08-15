USE `StoreManagerExample`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `products`;
TRUNCATE TABLE `sales`;
TRUNCATE TABLE `sales_products`;
TRUNCATE TABLE `stock`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO StoreManagerExample.products (title, sale_price) VALUES
    ("CAMISA M OFICIAL SELEÇÃO", 120.50),
    ("PACK CERVEJA LATA 6 UN", 49.99),
    ("LIVRO BRASIL EM BUSCA DO HEXA", 99);

INSERT INTO StoreManagerExample.sales (date, payment_type, total) VALUES
    (NOW(), "CARTÃO", 241),
    (NOW(), "DINHEIRO", 99),
    (NOW(), "CARTÃO", 148.99);

INSERT INTO StoreManagerExample.sales_products (sale_id, product_id, quantity) VALUES
    (1, 1, 2),
    (2, 3, 1),
    (3, 2, 1),
    (3, 3, 1);

INSERT INTO StoreManagerExample.stock (product_id, quantity, date, un_cost) VALUES
    (1, 10, NOW(), 99),
    (2, 15, NOW(), 35.90),
    (3, 50, NOW(), 78.50);