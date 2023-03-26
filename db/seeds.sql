INSERT INTO department (id, name)
VALUES (001,'Sales');
       (002,'Marketing');
       (003,'Engineering');
       


INSERT INTO roles (id, title, salary, department_id)
VALUES (101,'Sales Manager', 125000, 001);
       (102,'Sales Representative', 75000, 001);
       (103,'Marketing Manager', 115000, 002);
       (104,'Engineering Manager', 130000, 003);
       (105, 'Software Engineer', 95000, 003);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (201,'Angelica','Jannone', 001, 101);
       (202,'Billy', 'Hamilton', 001, null);
       (203,'Lauren','Shephard', 002, 103);
       (204,'Jerry', 'Ratledge', 003, 104);
       (205,'Pat', 'Fiorentino', 003, 105);
    