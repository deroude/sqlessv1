CREATE TABLE "article" (
    "id" serial NOT NULL PRIMARY KEY,
    "author" bigint,
    "category" bigint,
    "title" varchar,
    "text" varchar,
    "tags" varchar,
    "publish_date" timestamptz
);

CREATE TABLE "category" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar
);

CREATE TABLE "user" (
    "id" serial NOT NULL PRIMARY KEY,
    "email" varchar,
    "user_status" varchar
);

