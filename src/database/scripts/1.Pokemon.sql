CREATE TABLE IF NOT EXISTS Pokemon(
    "Id"                    INTEGER      NOT NULL UNIQUE PRIMARY KEY, 
    "NationalIndexNumber"   INTEGER      NOT NULL UNIQUE,
    "Name"                  VARCHAR(255) NOT NULL UNIQUE,
    "GenerationId"          INTEGER      NOT NULL  -- foreign key on generation
    );