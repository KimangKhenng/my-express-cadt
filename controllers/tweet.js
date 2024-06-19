const Tweet = require("../models/tweet")
const User = require("../models/user")

const createTweet = async (req, res, next)=>{
    const {text, byUser} = req.body
    try{
        const tweet = new Tweet({
            text: text,
            byUser: byUser
        })
        const result = await tweet.save()
        const user = await User.findById(byUser)
        user.tweets.push(result._id)
        await user.save()
        return res.json(result)
    }catch(err){
        next(Error(err.errmsg))
    }
}
module.exports = {createTweet}