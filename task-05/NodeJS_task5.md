For completing of this task you can use any Node.js
compatible ORM you want.

Create 3 isntances:

Director:
- id;
- full name;
- year of birth;


Movie:
- id;
- directorId - required;
- name;

Genre:
- id;
- title;

You need to provide all CRUD operation for all of instances.

The problem is that each movie can have multiple genres at the
same time and one genre can describe a lot of movies.
So you need to provide this type of relationship (many-to-many)
using your ORM.

Also you need to provide ability to assign genre to movie.

AC:

1. As i client i want to be able to create, read, update and delete directors;
2. As i client i want to be able to create, read, update and delete movies;
3. As i client i want to be able to create, read, update and delete genres;
4. As i client i want to be able to mark some movie with specific genre.
