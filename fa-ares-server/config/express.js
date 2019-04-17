const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const localSignupStrategy = require('../passport/local-signup')
const localLoginStrategy = require('../passport/local-login')
const authRoutes = require('../routes/auth')
const playersRoutes = require('../routes/player')
const coachRoutes = require('../routes/coach')
const teamRoutes = require('../routes/team')
const clubRoutes = require('../routes/fa-ares')

module.exports = app => {
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(cors({
    origin: 'http://localhost:4200'
  }))

  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  // routes
  app.use('/auth', authRoutes)
  app.use('/fa-ares', clubRoutes)
  app.use('/fa-ares/player', playersRoutes)
  app.use('/fa-ares/coach', coachRoutes)
  app.use('/fa-ares/team', teamRoutes)
}
