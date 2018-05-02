INSERT INTO Clients VALUES("100000", "Ozzy Perez");
INSERT INTO Clients VALUES("100000A", "ABC Company, Inc.");
INSERT INTO Employees VALUES(0, "nobody", "nobody", null, "$2a$10$fz8qgIi86rYBWJ.Gkr0vre1UxijQA1pgI6x8ctydzUIVMUFjkhWKm", "nobody");
INSERT INTO Employees VALUES(0,  "Oziel", "Perez", null, "$2a$10$REnTefPx0/ysHCwS6eGo2el7BtmHtpOO0mAdiCq261qWRWnYG2Mh6", "OzzyTheGiant");
INSERT INTO ProjectCategories VALUES(1, "Tax Return");
INSERT INTO ProjectCategories VALUES(2, "Financial Statements");
INSERT INTO Projects VALUES(1, "2017 Form 1040", "100000", NOW(), "2017-04-15 23:59:59", 2017, 1);
INSERT INTO Projects VALUES(2, "Financial Statements - March 2017", "100000", NOW(), null, 2017, 2);
INSERT INTO Projects VALUES(3, "2017 Form 1065", "100000A", NOW(), null, 2017, 1);
INSERT INTO DocumentCategories VALUES(1, "Tax Return");
INSERT INTO DocumentCategories VALUES(2, "Compilation");
INSERT INTO DocumentCategories VALUES(3, "Work Papers");
INSERT INTO Documents VALUES("ASDFQWERZCV", "file1", 1, "100000", 1, 2017, 1);
INSERT INTO Documents VALUES("AAAAAAAAAAA", "file2", 1, "100000", 1, 2017, 3);
INSERT INTO Documents VALUES("BBBBBBBBBBB", "file3", 1, "100000A", 2, 2017, 2);
INSERT INTO Documents VALUES("CCCCCCCCCCC", "file4", 4, "100000A", 2, 2017, 2);
INSERT INTO Documents VALUES("DDDDDDDDDDD", "file5", 1, "100000A", 2, 2017, 3);

select * from Employees;