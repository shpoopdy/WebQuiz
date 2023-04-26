-- Mikey Crispin
-- CS 328 - Spring 2022
-- April 25, 2022
-- This is the Quiz table.


drop table Quiz cascade constraints;

create table Quiz(
 username         varchar(30),
 q1               char(30) not null,
 q2               char(30) not null,
 q3               char(30) not null,
 q4               char(30) not null,
 q5               char(30) not null,
 q6               char(30)  not null,
 score            number not null
);
