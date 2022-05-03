CREATE TABLE IF NOT EXISTS Form(
    "Id"                    INTEGER      NOT NULL UNIQUE PRIMARY KEY, 
    "PokemonId"             INTEGER      NOT NULL, -- foreign key on pokemon
    "Type"                  INTEGER      NOT NULL, -- foreign key on formtype
    "Description"           VARCHAR(255)     NULL);