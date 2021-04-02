const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  
  formValues: {
    type: Object,
    required: true
  },
  
  formId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

  history: {
    type: Array
  }
});

mongoose.model('formvalues', formSchema);