const db = require('../models');
const connection = require('../config/connection');

let biiggieId;
let userId;

connection.once('open', async () => {
    await db.User.collection.deleteMany({});
    console.log('Deleted User collection');
    let userInsert = await db.User.collection.insertMany(userSeed);
    console.log(userInsert);

    userId = await db.User.findOne({});
    console.log(userId._id);
    let biiggieSeed = [
        {
            title: 'Taco Food Truck Startup',
            createdBy: userId._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
            description: 'My Biiggie that I I need help getting my dream taco food truck business off the ground. I serve all types of tacos and have worked very hard renovating an old truck I but. Any help is welcome!',
            images: ['https://mobile-cuisine.com/wp-content/uploads/2015/09/food-truck-branding.jpg'],
        },
    ];
    await db.Biiggie.deleteMany({});
    console.log('Deleted Biiggie collection');
    let biiggieInsert = await db.Biiggie.collection.insertMany(biiggieSeed);
    console.log(biiggieInsert);
    await db.User.updateMany({}, {$set: {createdBiiggies: [ biiggieInsert.insertedIds[0] ]}});
    console.log(await db.User.findOne({}).populate('createdBiiggies'))

    biiggieId = await db.Biiggie.findOne({});
    let helpOptionSeed = [
        {
            name: 'Graphic Designer',
            description: 'A graphic designer to help design the truck.',
            numOfPeople: 1,
            biiggie: biiggieId._id
        },
        {
            name: 'Donation for Vehicle Wrap',
            description: '$100 for a Vehicle wrap artist to install a wrap on the truck.',
            moneyRequested: 100,
            moneyReceived: 0,
            biiggie: biiggieId._id
        },
        {
            name: 'Marketer',
            description: 'Help advertise the business.',
            numOfPeople: 3,
            biiggie: biiggieId._id
        },
    ];
    await db.HelpOption.deleteMany({});
    console.log('Deleted HelpOptions collection')
    let helpOptionsInsert = await db.HelpOption.collection.insertMany(helpOptionSeed);
    console.log(helpOptionsInsert);
    let helpOptionsArr = helpOptionsInsert.insertedIds
    console.log(helpOptionsArr);
    /*for ( let i = 0; i < helpOptionsInsert.insertedIds.length; i++) {
        helpOptionsArr = helpOptionsInsert.insertedIds[i];
        await db.Biiggie.updateMany({}, {$set: {helpOptions: [ helpOptionsArr ]}});
        console.log(await db.Biiggie.findOne({}).populate('helpOptions'))
    }*/
    //await db.Biiggie.updateMany({}, {$set: {helpOptions: [ helpOptionsArr.length ]}});
    await db.Biiggie.updateMany({}, {$set: {helpOptions: [ helpOptionsArr[0], helpOptionsArr[1], helpOptionsArr[2] ]}});
    console.log(await db.Biiggie.findOne({}).populate('helpOptions'));

    let keywordSeed = [
        {
            keyword: 'Food',
            biiggie: biiggieId._id
        },
    ];
    console.log('Deleted Keywords collection')
    await db.Keywords.deleteMany({});
    let keywordInsert = await db.Keywords.collection.insertMany(keywordSeed);
    console.log(keywordInsert);
    await db.Biiggie.updateMany({}, {$set: {keywords: [ keywordInsert.insertedIds[0] ]}});
    console.log(await db.Biiggie.findOne({}).populate('keywords'));
    process.exit(0);
});

const userSeed = [
    {
        username: 'Test',
        password: 'Testing',
        firstName: 'Tester',
        lastName: 'Testington',
        email: 'test@mail.com',
        description: 'I am a test',
        image: 'https://i.guim.co.uk/img/media/a5fb31e646d2677f9d44104a3b26ee42955f0acc/0_170_5100_3059/master/5100.jpg?width=620&quality=85&auto=format&fit=max&s=84e762f61ca6617a5161279b33dff75e'
    }
];