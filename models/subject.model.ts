import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: [true, "Subject name is required"],
        unique: [true, "Subject already exist choose another subject name"],
        trim: [true]
    }
}, { timestamps: true});


subjectSchema.pre('save', function(){
    this.subjectName = this.subjectName?.toLocaleLowerCase();
});

const Subject = model('Subject', subjectSchema);


export default Subject;