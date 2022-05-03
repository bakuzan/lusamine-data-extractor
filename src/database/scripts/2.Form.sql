CREATE TABLE IF NOT EXISTS Form(
    "Id"                    INTEGER      NOT NULL UNIQUE PRIMARY KEY, 
    "PokemonId"             INTEGER      NOT NULL, -- foreign key on pokemon
    "InstanceType"          INTEGER      NOT NULL, -- foreign key on formtype
    "RegionId"              INTEGER          NULL, -- foreign key on region
    "Description"           VARCHAR(255)     NULL);