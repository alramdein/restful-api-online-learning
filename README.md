# Online Learning Admin WebApp 

CRUD application RESTful API. Created with NodeJs and MongoDb.


## Installation

1. Clone repository with <br/>
```bash
git clone https://github.com/alramdein/restful-api-online-learning.git
```
2. On the root project, run 
```bash
npm install
```
3. Run your MongoDB server with 
```bash 
mongod
```

*The MongoDB server should be listening on `mongodb://localhost:27017/mynode`. Or you can change it on `src/config/database.config.js`. More about [getting started with MongoDB](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)*

4. Still on the root project, run the app in development mode with 
```bash
npm run startDev
``` 
5. The app would be served in `http://localhost:4000/`

To test the API, I recommend using [Insomnia](https://insomnia.rest/download/).

## Routes
2. GET `/`: welcome message
3. POST `/api/v1/events`: add a event
4. GET `/api/v1/events`: get all events
5. GET `/api/v1/events/:eventId`: get event by eventId
6. PUT `/api/v1/events/:eventId`: update event by eventId
7. DELETE `/api/v1/events/:eventId`: delete event by eventId
8. POST `/api/v1/lessons`: add a lesson
9. GET `/api/v1/lessons`: get all lessons
10. GET `/api/v1/lessons/:lessonsId`: get lesson by id
11. PUT `/api/v1/lessons/:lessonsId`: update lesson by id
12. DELETE `/api/v1/lessons/:lessonsId`: delete lesson by id

## Contributing

I'm open to any contribution. When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Author

This project was created by Alif Ramdani. Please kindly credit me if you want to use this project. Thanks
