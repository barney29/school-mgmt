### SCHOOL-MANAGMENT SYSTEM

# Requirement

To get started you need to know about _Javascript programming language_ but to use this inteface you need also to use **Typescript(Ts)**.

- Node js - is a backend tool to use simple and powerfull which is used by javascript programming language.
- Typescript - since javascript is typed tightly it is easy to make a mistake and difficult to debug the application and typescript become the solution.
- MongoDb - Having a little or more knowledge with mongo db or _No-sql_ database is helpful
- Express - is a light weight backend framework which was built for node js

This school managment is focused on to strength authorization, accountability and transparancy among the client which is _student_ and _the school_.
**I do not recommend anyone to use this interface since this will suffer your resource**

# MODELS

- Subject
- Class Room
- Admin
- Registerar
- Student
- Teacher

# Descripion

1. Subject(s) - For the school to teach a subject it needs atleast one subject to teach. So, I created a separated class model called **Subject**.
   The concept of normalization in the _NO-SQL_ database is not that much common but I have tried to use them.
   _Every Teacher have only access to the students data to the subject that he teaches_.

2. Classroom - I have used class room to manage **students** infact the whole system revolve around it just like earth to the sun.
   1. Security
      - Class Room and Registerar
        The registerar only have access to the bulks(many) of student through _classRoom_. The students actual result is concealed from the registerar. The actual detail of the result is accessible to the registerar when genearating _transcript(report)_.
      - Class Room and Teacher
        _Every Teacher have only access to the students data through the class Room that he teaches_.
        _Every Teacher have only access to the students data through the class Room if the student exist in that class_.
   2. Consistency
      - Class Room and registerar
        Enforce the registerar only to register **one subject to be taught by only one teacher**.

## tsconfig.json

Since the comments are a lot I have enabeled in the _tsconfig.json_ file to stop commenting when compiling to **javascript**.
But if you need the comments to be copied to then in the _tsconfig.json_ file `"removeComments": false,`
**Beyond this other parts of the program is simple to follow and continue to update the code**.
