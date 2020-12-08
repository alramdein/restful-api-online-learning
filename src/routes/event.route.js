import * as event from '../controller/event.controller' ;

const eventRoutes = (app) => {
    app.post('/api/v1/events', event.addEvent);   
    app.get('/api/v1/events', event.getAllEvent);  
    app.get('/api/v1/events/:eventId', event.getEventById);  
    app.put('/api/v1/events/:eventId', event.updateEvent); 
    app.delete('/api/v1/events/:eventId', event.deleteEvent);  
};

export default eventRoutes;