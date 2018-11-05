# ReceptionistAssitant

Help receptionist sort waiting list in priority sequence!

## Limitation

1.  Need to implementing routing in backend.
2.  Did not test the code. There is a bug in delete record function. 
    Please refresh the page after a record is deleted to get the correct record list.

## Technologies Used

The front-end is built in modern javascript (React, Redux, eslint, Babel, Webpack).

The back-end is built in node.js (express.js).

Database is postgresql (version 10.5)


## Install instruction
1.  Please make sure node is installed. npm will go with it. 
2.  create a empty directory or any exist diretory you want; open a terminal
3.  under the path of this directory, run command
    `git clone https://github.com/h-jin/ReceptionistAssitant.git`
4.  run command `npm install`  to install all package dependencies
5.  run command `npm run client` to start client
6.  Database backupfile is in `src/client/database/backup.txt ` 
    store database from backup file. Here is a link of instruction about how to restore database                       `http://suite.opengeo.org/docs/latest/dataadmin/pgDBAdmin/backup.html`
6.  open a new terminal and run command `npm start` to start the server
7.  in browser, input `http://localhost:3000` to check the website
 
