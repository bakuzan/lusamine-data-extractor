CREATE TABLE IF NOT EXISTS Generation(
    "Id"    INTEGER      NOT NULL UNIQUE, 
    "Name"  VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY("Id" AUTOINCREMENT));