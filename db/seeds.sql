USE employee_tracker

INSERT INTO department (id, name)
VALUES ('Sales');
       ('Marketing');
       ('Engineering');
       ('Legal');
       


INSERT INTO role (id, title, salary, department_id)
VALUES ('Sales Manager', 125000, 1);
       ('Sales Representative', 75000, 1);
       ('Marketing Manager', 115000, 2);
       ('Engineering Manager', 130000, 3);
       ('Software Engineer', 95000, 3);
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3, NULL),
       ('Kevin', 'Tupik', 4, 3),
       ('Kunal', 'Singh', 5, NULL),
       ('Malia', 'Brown', 6, 5),
       ('Sarah', 'Lourd', 7, NULL),
       ('Tom', 'Allen', 8, 7);
    