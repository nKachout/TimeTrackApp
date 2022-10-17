
// Importing modules 
const mongoose = require('mongoose');
  
// Creating user schema 
const CalendarSchema = mongoose.Schema({ 
    calendar_content : { 
        data : Buffer, 
        contentType : String
    }
}); 

// Method to set salt and hash the password for a user 
CalendarSchema.methods.setContent = function(_content) { 
     
    this.calendar_content = _content;

};
  
// Exporting module to allow it to be imported in other files 
const Calendar = module.exports = mongoose.model('Calendar', CalendarSchema);