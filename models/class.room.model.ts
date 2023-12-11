import { Schema, model } from "mongoose";

const classRoomSchema = new Schema({
    class: {
        type: String,
        unique: [true, "Class Room already exist"],
        required: [true, "Class Room Identification is required"]
    },
    students: [{
        type: Schema.Types.String,
        ref: 'Student'
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});


const ClassRoom = model('ClassRoom', classRoomSchema);


export default ClassRoom;