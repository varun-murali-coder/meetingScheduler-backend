const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const nodemailer=require('nodemailer');
const dotenv=require('dotenv');

const MeetingSchema=mongoose.model('Meet');

/**
 * function to create the ticket.
 */
let createMeeting = (req, res) => {
    let meetingCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log("This is the request body"+req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.fromDate) || check.isEmpty(req.body.toDate) || check.isEmpty(req.body.agenda)||check.isEmpty(req.body.participants) ||check.isEmpty(req.body.organizer)  ) {
                
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = time.now()
                let meetingId = shortid.generate()
                let participants=req.body.participants; 
                let test=participants.split(",");
                for(x in test){
                    console.log(test[x]);
                    }

                let newMeeting = new MeetingSchema({

                    meetingId:meetingId,
                    title: req.body.title,
                    fromDate:req.body.fromDate,
                    toDate: req.body.toDate,
                    agenda: req.body.agenda,
                    created: today,
                    lastModified: today,
                    organizer:req.body.organizer,
                    participants:participants.split(",")
                }) // end new blog model

                newMeeting.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in meeting creation')
//Code to trigger the mail for create meeting.

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail', 
    host:'smtp.gmail.com',
    auth: {
      user: 'vcoderlearn185@gmail.com',
      pass:process.env.GmailPD
    },
    tls:{
        rejectUnauthorized:false
    }
  });
  var mailOptions = {
    to: req.body.participants,
    from: 'vcoderlearn185@gmail.com',
    subject: req.body.title,
    text: 'You have a meeting scheduled from' +req.body.fromDate+" to"+req.body.toDate
      
  };
  smtpTransport.sendMail(mailOptions, function(err) {
      if(err){
          console.log(err);
      }
    console.log('mail sent');
  });





                        resolve(result)
                    }
                }) 
            }
        }) 
    } 

    // making promise call.
    meetingCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Meeting Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/**
 * function to read all tickets.
 */
let getAllMeetings = (req, res) => {
    console.log("Inside get all function");
    MeetingSchema.find({})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getAllMeetings', 10)
                let apiResponse = response.generate(true, 'Failed To Find All Ticket Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Ticket Found', 'Meeting Controller: getAllMeetings')
                let apiResponse = response.generate(true, 'No Ticket Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Ticket Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all tickets

/**
 * function to read single ticket-Issue Description Page.
 */
let viewByMeetingId = (req, res) => {

    if (check.isEmpty(req.params.meetingId)) {

        let apiResponse = response.generate(true, 'issueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        MeetingSchema.findOne({ 'meetingId': req.params.meetingId }, (err, result) => {

            if (err) {

                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                let apiResponse = response.generate(true, 'Meeting Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","meetingController:viewByMeetingId",5)
                let apiResponse = response.generate(false, 'Meeting Found Successfully.', 200, result)
                console.log('Its not the issue from backend');
                res.send(apiResponse)
            }
        })
    }
}

/*Function to edit the ticket-Issue Description Page*/
let editMeeting = (req, res) => {

    if (check.isEmpty(req.params.meetingId)) {

        console.log('meetingId should be passed')
        let apiResponse = response.generate(true, 'meetingId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        MeetingSchema.update({ 'meetingId': req.params.meetingId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Meeting Not Found.')
                let apiResponse = response.generate(true, 'Ticket Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Meeting Edited Successfully')
               //Code to trigger the mail for update meeting.
               console.log('The part is:'+ result.participants+"type is:"+typeof(result.participants));

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail', 
    host:'smtp.gmail.com',
    auth: {
      user: 'vcoderlearn185@gmail.com',
      pass:process.env.GmailPD
    },
    tls:{
        rejectUnauthorized:false
    }
  });
  var mailOptions = {

    to:req.body.participants,
    from: 'vcoderlearn185@gmail.com',
    subject: req.body.title,
    text: 'The following meeting has been updated scheduled from' +req.body.fromDate+" to"+req.body.toDate
      
  };
  smtpTransport.sendMail(mailOptions, function(err) {
      if(err){
          console.log(err);
      }
    console.log('mail sent');
  });



                let apiResponse = response.generate(false, 'Meeting Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


/**
 * function to delete the assignment collection.
 */
let deleteMeeting = (req, res) => {

    if (check.isEmpty(req.params.meetingId)) {

        console.log('meetingId should be passed')
        let apiResponse = response.generate(true, 'meetingId is missing', 403, null)
        res.send(apiResponse)
    } else {

        MeetingSchema.remove({ 'meetingId': req.params.meetingId }, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Meeting Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blog Deletion Success')
                let apiResponse = response.generate(false, 'Meeting Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}




module.exports = {

    createMeeting: createMeeting,
    getAllMeetings:getAllMeetings,
    viewByMeetingId:viewByMeetingId,
    editMeeting:editMeeting,
    deleteMeeting:deleteMeeting
    
}// end exports