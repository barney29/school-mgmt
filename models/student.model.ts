import { Schema, model } from "mongoose";

const studentSchema = new Schema({

    _id: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Please, Input student name"]
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRoom',
        required: [true, "Each student should attend a class"]
    },
    subjects: [{
        subject: {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
            required: [true, "Students should take atleast one subject"]
        },
        group_work: {
            type: Number,
            default: 0,
        },
        individual_assignment: {
            type: Number,
            default: 0,
        },
        quiz: {
            type: Number,
            default: 0,
        },
        test: {
            type: Number,
            default: 0,
        },
        mid_exam: {
            type: Number,
            default: 0,
        },
        final_exam: {
            type: Number,
            default: 0,
        }
    },
    ],
    password: {
        type: String,
    },
    age: {
        type: Number,
        required: [true, "student age is required"]
    },
    club: [{
        type: Schema.Types.ObjectId,
        ref: 'Club'
    }]
}, { timestamps: true});


const Student = model('Student', studentSchema);

export default Student;