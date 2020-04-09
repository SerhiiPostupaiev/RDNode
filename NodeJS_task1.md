For the hometask you should create docker-compose.yml with nodejs and nodemon. 
With nginx web-server for serving static files. Ex. SPA. 

|
|--src
|   |
|   |- index.js
|
|-static
|   |-index.html
|   |-main.js 
|
docker-compose.yml
Dockerfile
nginx.conf

AC:
1. As a developer I want to be able to run docker-compose up --build and receive fully working environment.
2. As a developer I want to have ability to use node.js debugger on 9222 port and be able to send requests to node application on port 3000.
3. As a developer I want to reach static files from folder inside app.