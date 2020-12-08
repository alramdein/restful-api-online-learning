import Lesson from '../models/lesson.model';
import * as helper from '../helper/helper';

// Object used to store basic data that will be
// used on response body
let responseData = {
    item: "Lesson", // default item processed in lesson controller
    itemId: "",
    activity: "",
    data: ""
};

export const addLesson = (req, res) => {
    responseData.activity = "adding";

    const isValidate = helper.validateRequest(req, res, responseData);
    if(isValidate) {
        const lesson = new Lesson(
            helper.insertLessonQuery(req)
        );
    
        // Save new lesson to database
        lesson.save()
                .then( _ => {
                    res.json({"message": `Lesson successfully added!.`});
                }).catch(err => {
                    helper.serverErrorMessage(responseData, err, res);
                });
    }
};

export const getAllLesson = (req, res) => {
    responseData.activity = "retrieving";

    Lesson.find()
            .then( lesson => {
                res.json(lesson);
            }).catch(err => {
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const getLessonById = (req, res) => {
    responseData.activity = "retrieving";

    helper.performRequest(responseData, req, res);
};

export const updateLesson = (req, res) => {
    responseData.activity = "updating";

    helper.validateRequest(req, res, responseData);

    helper.performRequest(responseData, req, res);
};

export const deleteLesson = (req, res) => {
    responseData.activity = "deleting";

    helper.performRequest(responseData, req, res);
};