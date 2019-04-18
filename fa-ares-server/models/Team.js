const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true

  },
   imageUrl: {
    type: mongoose.Schema.Types.String,
  },
  players:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'}],
  coachs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach'}],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
