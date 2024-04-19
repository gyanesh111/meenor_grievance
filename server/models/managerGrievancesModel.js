// grievance.js 
const mongoose = require('mongoose');

const managerGrievanceSchema = new mongoose.Schema({ 
    grievance: {
        type: String,
        required: false
    }, 
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    department: {
        type: String,
        enum:['r&d','developers','management','intern','hr'],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum:['processing','resolved'],
        default: "processing"
    },
    feedback: {
        type: String,
        default: "NA"
    },
    date: {
        type: Date,
        default: Date.now
    },
    severity:{
        type: String,
        enum: ['minor','major','critical'],
        default: 'minor'
    },
    //connection of grievance schema with the employee schema
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    resolvedGrievance:{
        type: String,
        
    }
});

module.exports = mongoose.model('managergrievances', managerGrievanceSchema);  