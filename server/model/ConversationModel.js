const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text:{
        type:String,
        default : ""
    },
    imageUrl:{
        type:String,
        default : ""
    },
    videoUrl:{
        type:String,
        default : ""
    },
    seen:{
        type:Boolean,
        default : false
    },

},{
    timestamps:true,
})


const conversationSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        required: [true,"Sender is required"],
        ref : 'User'
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        required: [true,"Receiver is required"],
        ref : 'User'
    },
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref : 'Message',
        }
    ]

},{
    timestamps:true,
})
const MessageModel = mongoose.model('Message',messageSchema)
module.exports = MessageModel;
const ConversationModel = mongoose.model('Conversation',conversationSchema)
module.exports = ConversationModel;