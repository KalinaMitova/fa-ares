const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
    lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
  },
  dateOfBirth:{
    type: mongoose.Schema.Types.Date,
    required: true
  },
  teams:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    }],
  position: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Assistant Coach', 'Senior Coach', 'Goalkeeper Coach', 'Coach'],
      message: 'Status is invalid, valid values include Assistant Coach, Senior Coach, Goalkeeper Coach, Coach].'
    },
    default: 'Coach',
    required: true,
  },
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
