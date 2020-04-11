For the hometask you should create nodejs application using old environment. 
As you remember, you set up nginx. You can create FE part without any markup, or just use postman/insomnia for
API requests. 

|
|--nginx
|   |
|   |- Dockerfile
|   |- nginx.conf
|
|--node
|   |
|   |- Dockerfile
|   |- init.sh
|
|--src
|   |
|   |- db.json
|   |- index.js
|   |- package.json
|
|-static
|   |-index.html
|   |-main.js 
|
docker-compose.yml

AC:
1. Create endpoints for main CRUD operation.
As client side application I want to have ability to store new task with header and text. After saving I want to receive all tasks back.
As client side application I want to have ability to read all tasks.
As client side application I want to have ability to read one task by id.
As client side application I want to have ability to save bunch of tasks.
As client side application I want to have ability to delete task by id.

2. Store data in JSON on server.
3. For client side you can use any libraries/frameworks or use simple form with fetch API.
4. Additionally you can create validation of payload.

