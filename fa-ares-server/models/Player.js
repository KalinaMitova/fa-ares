const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
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
  team:{
      type: mongoose.Schema.Types.ObjectId,
      ref: Team,
      required: true,
    },
  number: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  playingPosition: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forword'],
      message: 'Status is invalid, valid values include [Goalkeeper, Defender, Midfielder, Forword].'
    },
    default: 'Defender',
    required: true,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
