const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const time = require('../libs/timeLib')
let meetSchema=new Schema(
    {
        title:{
  type:String,
  default:''
        },
        meetingId:{
            type:String,
            unique:true
        },
        fromDate:{
            type:String,
            default:''
        },
        toDate:{
            type:String,
            default:''
        },
        agenda:{
            type:String,
            default:''
        },
        participants:[
            String
        ],
        created:{
            type:Date,
            default:time.now
        },
        lastModified:{
            type:Date,
            default:time.now
        },
        organizer:{
            type:String,
            default:''

        }


    });

    mongoose.model('Meet',meetSchema);