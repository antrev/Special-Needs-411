

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

create table parks(
id serial primary key,
name varchar not null,
landuse varchar not null,
park_id int references users (id)
);

