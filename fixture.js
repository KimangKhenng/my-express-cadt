const dbConnect = require("./db/db");
const Tweet = require("./models/tweet");
const User = require("./models/user");
const { faker } = require('@faker-js/faker')
dbConnect().catch((err) => { console.log(err) })

const numUser = 1000
const numTweet = 10000
// Generate fake data
// faker.js

async function generate() {
    let userList = []
    for (let i = 0; i < numUser; i++) {
        const user = new User({
            name: faker.internet.userName(),
            age: faker.number.int({ max: 100 }),
            email: faker.internet.email()
        })
        const reuslt = await user.save()
        userList.push(reuslt._id)
        console.log(`User: ${reuslt.name} generated!`)
    }

    for (let i = 0; i < numTweet; i++) {
        const randomId = userList[Math.floor(Math.random() * userList.length)]
        const tweet = new Tweet({
            text: faker.lorem.paragraph(),
            byUser: randomId,
        })
        const reuslt = await tweet.save()
        console.log(`Tweet: ${reuslt._id} generated!`)
    }

    const tweets = await Tweet.find()
    const users = await User.find()
    users.forEach(async (user) => {
        const belongTweets = tweets.filter(tt => {
            return tt.byUser.toString() == user._id
        })
        let tweetsArray = []
        belongTweets.forEach(ttt => {
            tweetsArray.push(ttt._id)
        })
        user.tweets = tweetsArray
        await user.save()
        console.log(`User: ${user._id} saved!`)
    })
}
generate()