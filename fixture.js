const dbConnect = require("./db/db");
const User = require("./models/user");
const {faker} = require('@faker-js/faker')
dbConnect().catch((err)=> {console.log(err)})

const numUser = 1000;
// Generate fake data
// faker.js

async function generate(){
    for(let i = 0; i < numUser; i++){
        const user = new User({
            name: faker.internet.userName(),
            age: faker.number.int({ max: 100 }),
            email: faker.internet.email()
        })
        const reuslt = await user.save()
        console.log(`User: ${reuslt.name} generated!`)
    }
}
generate()