create table users (
id serial primary key not null,
email char,
password_digets char

);

create table schools(
name char,
zipcode int,
reviews char,
schools_id int references users (id)
);

