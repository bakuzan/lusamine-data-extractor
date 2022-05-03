CREATE TABLE IF NOT EXISTS Form(
    "Id"                    INTEGER      NOT NULL UNIQUE PRIMARY KEY, 
    "PokemonId"             INTEGER      NOT NULL, -- foreign key on pokemon
    "EvolvesToPokemonId"    INTEGER      NOT NULL, -- foreign key on pokemon
    "Mechanism"             INTEGER      NOT NULL, -- foreign key on evolutiontype
    "Note"                  VARCHAR(255)     NULL);