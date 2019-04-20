const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")
const path = require('path');
const meetingController=require('./../controllers/meetingController');


module.exports.setRouter = function(app){

    let baseUrl = `${appConfig.apiVersion}/meetings`;
    
    app.get(baseUrl+'/all',auth.isAuthorized,meetingController.getAllMeetings);

/**
	 * @api {get} /api/v1/meetings/all Get all tickets
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Meeting Details Found",
	    "status": 200,
	    "data": [
					{
						meetingId: "string",
						title: "string",
						fromDate: "string",
						toDate: "string",
						agenda: "string",
                        organizer: "string",
                        participants:[]
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Meeting Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(baseUrl+'/create',auth.isAuthorized,meetingController.createMeeting);
 /**
	 * @api {post} /api/v1/meetings/create Create meeting
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title  of the meeting passed as a body parameter
	 * @apiParam {String} fromDate  of the meeting passed as a body parameter
	 * @apiParam {String} toDate  of the meeting passed as a body parameter
	 * @apiParam {String} agenda  of the meeting passed as a body parameter
     * @apiParam {Array} participants  of the meeting passed as a body parameter
	 * @apiParam {String} organizer  of the meeting passed as a body parameter

	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Meeting Created successfully",
	    "status": 200,
	    "data": [
					{
						 meetingId: "string",
						title: "string",
						fromDate: "string",
						toDate: "string",
						agenda: "string",
                        organizer: "string",
                        participants:[]
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/:meetingId',auth.isAuthorized,meetingController.viewByMeetingId);

     /**
	 * @api {get} /api/v1/meetings/view/:meetingId Get a single meeting
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} meetingId The meetingId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Meeting Found Successfully.",
	    "status": 200,
	    "data": {
	    			    _id: "string",
	    			    __v: number,
					    meetingId: "string",
						title: "string",
						fromDate: "string",
						toDate: "string",
						agenda: "string",
                        organizer: "string",
                        participants:[]
						created: "date",
						lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl+'/:meetingId/edit',auth.isAuthorized,meetingController.editMeeting);

 /**
	 * @api {put} /api/v1/meetings/:meetingId/edit Edit meeting by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} meetingId  of the ticket passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Meeting Edited Successfully.",
	    "status": 200,
	    "data": [
					{	
                        meetingId: "string",
						title: "string",
						fromDate: "string",
						toDate: "string",
						agenda: "string",
                        organizer: "string",
                        participants:[]
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/:meetingId/delete',auth.isAuthorized,meetingController.deleteMeeting);
     /**
	 * @api {post} /api/v1/meetings/:meetingId/delete Delete meeting by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} meetingId meetingId of the meeting passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Meeting Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */



     

    



}


