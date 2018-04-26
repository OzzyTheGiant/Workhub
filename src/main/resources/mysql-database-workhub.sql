CREATE DATABASE IF NOT EXISTS Workhub;

CREATE TABLE IF NOT EXISTS Clients (
    ID VARCHAR(20) PRIMARY KEY,
    ClientName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Employees (
    ID SMALLINT PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(20) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(20) NOT NULL,
    MiddleName VARCHAR(20),
    LastName VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS ProjectCategories (
    ID TINYINT PRIMARY KEY,
    Description VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Projects (
    ID INT PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(100) NOT NULL,
    ClientID INT NOT NULL,
    Category TINTYINT NOT NULL,
    DateCreated DATETIME NOT NULL,
    DateDue DATETIME DEFAULT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ID),
    FOREIGN KEY (Category) REFERENCES ProjectCategories(ID)
);

CREATE TABLE IF NOT EXISTS FileTypes (
    ID INT PRIMARY KEY AUTOINCREMENT,
    Type VARCHAR(253) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Documents (
    ID VARCHAR(255) PRIMARY KEY,
    Description VARCHAR(255) NOT NULL,
    ClientID INT NOT NULL,
    ProjectID INT,
    FileTypeID TINYINT NOT NULL,
    FilePath TEXT NOT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ID),
    FOREIGN KEY (FileTypeID) REFERENCES FileTypes(ID)
);

CREATE TABLE IF NOT EXISTS DocumentActionTypes (
    ID TINYINT PRIMARY KEY AUTOINCREMENT,
    Description VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS DocumentHistory (
    ID INT PRIMARY KEY AUTOINCREMENT,
    Action TINYINT NOT NULL,
    DocumentID ID VARCHAR(255) NOT NULL,
    ActionDate DATETIME NOT NULL,
    ActionUser INT NOT NULL,
    FOREIGN KEY (DocumentID) REFERENCES Documents(ID),
    FOREIGN KEY (Action) REFERENCES DocumentActionTypes(ID),
    FOREIGN KEY (ActionUser) REFERENCES Employees(ID)
);