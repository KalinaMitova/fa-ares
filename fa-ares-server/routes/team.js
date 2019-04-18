const express = require('express')
const authCheck = require('../middleware/auth-check');
const adminCheck = require('../middleware/admin-check');
const Team = require('../models/Team');

const router = new express.Router()

function validateTeamForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  // payload.number = parseInt(payload.number)

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length < 3) {
    isFormValid = false
    errors.make = 'Name must be more than 3 symbols.'
  }

  if (!payload || typeof payload.imageUrl !== 'string' || payload.imageUrl.length.trim() === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
    if (payload.imageUrl.startsWitn('http') < 0) {
      isFormValid = false
      errors.image = 'Image URL must  starts with "http" or "https".'
    }
    if (!(payload.imageUrl.endsWith('jpg') >= 0 || payload.imageUrl.endsWith('png') >= 0)) {
      isFormValid = false
      errors.image = 'Image URL must  ends with "jpg" or "png".'
    }
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck,adminCheck, (req, res) => {
  const team = req.body
  const validationResult = validateTeamForm(team)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Team.create(team)
    .then(() => {
      res.status(200).json({
        success: true,
        message: `Team ${team.name} added successfully.`,
        team
      })
    })
})

router.get('/player/all', authCheck ,(req, res) => {
  const page = parseInt(req.query.page) || 1
  // const search = req.query.search

  Team.find({})
    .then((team) => {
      return res.status(200).json(team)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id
  Team.findById(id)
    .then((furniture) => {
      if (!furniture) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        make: furniture.make,
        model: furniture.model,
        year: furniture.year,
        description: furniture.description,
        price: furniture.price,
        image: furniture.image,
      }

      if (furniture.material) {
        response.material = furniture.material
      }

      res.status(200).json(response)
    })
})


// router.get('/user', authCheck, (req, res) => {
//   const user = req.user._id

//   Team.find({creator: user})
//     .then((furniture) => {
//       return res.status(200).json(furniture)
//     })
// })

router.delete('/delete/:id', authCheck,adminCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Team.findById(id)
    .then((team) => {
      if (!team) {
        return res.status(200).json({
          success: false,
          message: 'Team does not exists!'
        })
      }

      if ((team.creator.toString() != user && !req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }

      Team.findByIdAndDelete(id)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Team deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck,adminCheck, (req, res) => {
  const id = req.params.id;
  const team = req.body;

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validateTeamForm(team)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Team.findByIdAndUpdate(id, team)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: `Team  ${team.name} edited successfully!`
      })
  })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Team.findById(id)
    .then(team => {
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        make: furniture.make,
        model: furniture.model,
        year: furniture.year,
        description: furniture.description,
        price: furniture.price,
        image: furniture.image
      }

      if (furniture.material) {
        response.material = furniture.material
      }

      res.status(200).json(response)
    })
})

module.exports = router
