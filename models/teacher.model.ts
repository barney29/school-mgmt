import { Schema, model } from "mongoose";

const teacherSchema = new Schema({

    _id: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Teacher name is required"]
    },
    class: [{
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom',
    }],
    teaches: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, "Atleast one subject is required"]
    }
    ],
    password: {
        type: String,  
    },
    salary: {
        type: Number,
        default: 0
    },
    club: [{
        type: Schema.Types.ObjectId,
        ref: 'Club'
    }],
    role: {
        type: String,
        default: 'teacher',
        enum: ['admin', 'teacher', 'homeroom-teacher', 'registerar', 'accountant', 'secretary']
    }
}, { timestamps: true});


const Teacher = model('Teacher', teacherSchema);

export default Teacher;