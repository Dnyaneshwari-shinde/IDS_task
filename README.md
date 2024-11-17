#Blog Management System with Nest.js and GraphQL

#User Features
1. Registration: Create a new user account.
2. Login: Authenticate users and provide JWT tokens.
3. User Roles: Role-based access control (Admin/User).
4. User Profiles: Manage user profiles and retrieve user details.
#Blog Features
1. CRUD Operations: Create, Read, Update, and Delete blog posts.
2. GraphQL Queries: Fetch blog posts with optional filters and pagination.
3. Role-Based Access Control:
4. Admin can manage all blog posts.
5. Users can manage only their own posts.

# Steps to run the poeject 

1. git clone the project using below link 
https://github.com/Dnyaneshwari-shinde/IDS_task.git

2. run command npm install

3. Ensure that MongoDB is installed and running locally, or have the connection string for a remote MongoDB instance. create new cluster named as IDS_task

4. Add connection string to the file named with app.module.ts

5. run command npm run start:dev to start the porject 



# Steps to test the project 


1. Test Graphql API with playground 

Users can test GraphQL mutations and queries using the GraphQL Playground, which provides an interactive environment for testing and exploring the GraphQL API.


2. Unit testing 

run command npm run test:e2e that run test case written inside test folder 