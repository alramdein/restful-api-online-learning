import Lesson from '../models/lesson.model';
import Event from '../models/event.model';

// these function was created to support easy maintainability

export const insertLessonQuery = (req) => {
    return {
        title: req.body.title,
        lecturer: req.body.lecturer,
        type: req.body.type,
        description: req.body.description,
    };
};

export const insertEventQuery = (req) => {
    return {
        eventName: req.body.eventName,
        date: req.body.date,
        description: req.body.description,
    };
};

export const emptyErrorMessage = (responseData, res) => {
    res.status(400).send({
        message: `${responseData.item} can't be empty. Make sure fill all required field.`
    });
};

export const serverErrorMessage = (responseData, err, res) => {
    res.status(500).send({
        message: `Some error occured while ${responseData.activity} the ${responseData.item}.`,
        detail: err.message
    });
};

export const notFoundErrorMessage = (responseData, err, res) => {
    let _id = '';
    if (responseData.item === "Event") 
        _id = `eventName ${responseData.itemId}`;
    else if (responseData.item === "Lesson") 
        _id = `id ${responseData.itemId}`;

    res.status(404).send({
        message: `${responseData.item} not found with ${_id}`
    });
};


export const validateRequest = (req, res, responseData) => {
    switch (responseData.item) {
        case "Event": {
            if(!req.body.eventName || !req.body.date || !req.body.description) {
                emptyErrorMessage(responseData, res); 
                return 0;
            }
            break;
        }
                       
        case "Lesson": {
            if(!req.body.title || !req.body.lecturer || !req.body.type || !req.body.description) { 
                emptyErrorMessage(responseData, res); 
                return 0;
            }
            break;
        }
         
    }

    return 1;
};

export const identifyRequestType = async (responseData, req) => {
    if(responseData.item == "Event") {
        if (responseData.activity === 'retrieving')  
            return await Event.findOne({eventName: req.params.eventName});

        else if (responseData.activity === 'updating') 
            return await Event.findByIdAndUpdate(req.params.eventId,
                insertEventQuery(req), {new: true});

        else if (responseData.activity === 'deleting')
            return await Event.findByIdAndRemove(req.params.eventId);
    } else if(responseData.item == "Lesson") {
        if (responseData.activity === 'retrieving')  
            return await Lesson.findById(req.params.lessonId);

        else if (responseData.activity === 'updating') 
            return await Lesson.findByIdAndUpdate(req.params.lessonId,
                insertLessonQuery(req), {new: true});

        else if (responseData.activity === 'deleting')
            return await Lesson.findByIdAndRemove(req.params.lessonId);
    }
};

export const performRequest = async (responseData, req, res) => {
    try {
        let data = await identifyRequestType(responseData, req);
        console.log(`data: ${data}`);
        if(data.eventName)
            responseData.itemId = req.params.eventId;
        else if(data.price)
            responseData.itemId = req.params.lessonId;

        responseData.data = data;
        handleSuccessSearch(responseData, req, res);
    } catch(err) {
        handleError(responseData, err, res);
    }
};

export const handleError = (responseData, err, res) => {
    if(err.kind === "ObjectId") {
        notFoundErrorMessage(responseData, err, res);
    }
    serverErrorMessage(responseData, err, res);
};

export const handleSuccessSearch = (responseData, req, res) => {
    if(!responseData.data) {
        return notFoundErrorMessage(responseData, undefined, res);
    }
    
    let _id = '';
    if (responseData.item === "Event") 
        _id = `id ${responseData.itemId}`;
    else if (responseData.item === "Lesson")  
        _id = `id ${responseData.itemId}`;
    
    if (responseData.activity === 'retrieving')  
        res.json(responseData.data);
    else if (responseData.activity === 'updating') 
        res.json({"message": `${responseData.item} with ${_id} successfully updated!.`});
    else if (responseData.activity === 'deleting')
        res.json({"message": `${responseData.item} with ${_id} successfully deleted!.`});
};
