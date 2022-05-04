CREATE TABLE IF NOT EXISTS FormType(
    "FormId"  INTEGER NOT NULL,
    "TypeId"  INTEGER NOT NULL,
	FOREIGN KEY("FormId")       REFERENCES "Form"("Id"),
    FOREIGN KEY("TypeId")       REFERENCES "Type"("Id"));