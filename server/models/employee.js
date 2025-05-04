const moongoose = require('mongoose');

const employeeSchema = new moongoose.Schema({
    employee_id: {type: String, required: true, unique: true},
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    hashed_password: {type: String, required: true},
});

module.exports = moongoose.model('Employee', employeeSchema);


