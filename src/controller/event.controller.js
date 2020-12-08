import Event from '../models/event.model';
import * as helper from '../helper/helper';

// Object used to store basic data that will be
// used on response body
let responseData = {
    item: "Event", // default item processed in event controller
    itemId: "",
    activity: "",
    data: ""
};

export const addEvent = (req, res) => {
    responseData.activity = "adding";
    
    const isValidate = helper.validateRequest(req, res, responseData);
    console.log("isValidate: "+isValidate);
    if(isValidate) {
        const event = new Event(
            helper.insertEventQuery(req)
        );
    
        // Save new event to database
        event.save()
                .then( _ => {
                    res.json({"message": "Event successfully added!."});
                }).catch(err => {
                    helper.serverErrorMessage(responseData, err, res);
                });
    }
};

export const getAllEvent = (req, res) => {
    responseData.activity = "retrieving";

    Event.find()
        .then( product => {
            res.json(product);
        }).catch(err => {
            helper.serverErrorMessage(responseData, err, res);
        });
};

export const getEventById = (req, res) => {
    responseData.activity = "retrieving";

    helper.performRequest(responseData, req, res);
};

export const updateEvent = (req, res) => {
    responseData.activity = "updating";

    helper.validateRequest(req, res, responseData);

    helper.performRequest(responseData, req, res);
};

export const deleteEvent = (req, res) => {
    responseData.activity = "deleting";

    helper.performRequest(responseData, req, res);
};