const User = require('../../models/user')

const { Strategy, ExtractJwt } = require('passport-jwt')

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'api.cadt.com',
    audience: 'cadt.com'
}
const jwtStrategy = new Strategy(opt, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.id)
    if (!user) {
        done(null, false)
    }
    done(null, user)
    // req.user
})
module.exports = jwtStrategy