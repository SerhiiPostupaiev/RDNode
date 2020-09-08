This hometask will be divided by 2 parts.

1. You need to develop backend for notes service just line Google Keep using mongoDB.
All CRUD operations have to be provided for notes.
Note document has:
- unique id;
- title;
- text;

2. Develop a web-server with only one GET endpoint. As query parameter you can pass
name of topic on Wikipedia. Your service should go to special endpoint from Wikipedia
API and get metainfo about received topic.
Wikipedia API endpoint URL: https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page={TOPIC_NAME}
All results from this API have to be cached in redis and when user makes second request with the same topic
you need to return cached value from database.

AC:
1.1. As a client i want to be able to create, read, update and delete notes.
1.2. All instances of Note should be stored in appropriate MongoDB collection.
2.1. As a client i want to extract Wikipedia topic metainfo using provided endpoint.
2.2. All responces should be cached so second request with the same topic should be faster.