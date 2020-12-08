import * as lesson from '../controller/lesson.controller' ;

const lessonRoutes = (app) => {
    app.post('/api/v1/lessons', lesson.addLesson);   
    app.get('/api/v1/lessons', lesson.getAllLesson);  
    app.get('/api/v1/lessons/:lessonId', lesson.getLessonById);  
    app.put('/api/v1/lessons/:lessonId', lesson.updateLesson); 
    app.delete('/api/v1/lessons/:lessonId', lesson.deleteLesson);  
};

export default lessonRoutes;