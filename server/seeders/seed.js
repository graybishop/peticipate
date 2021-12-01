const db = require('../models');
const connection = require('../config/connection');

let biiggieId;

connection.once('open', async () => {
    await db.Biiggie.deleteMany({})
    console.log('we made it!!')
    let data = await db.Biiggie.collection.insertMany(biiggieSeed);
    console.log(data);
    biiggieId = await db.Biiggie.findOne({});
    console.log(biiggieId._id);
    let helpOptionSeed = [
        {
            name: 'Graphic Designer',
            description: 'A graphic designer to help design the truck.',
            numOfPeople: 1,
            biiggie: biiggieId._id
        },
        {
            name: 'Vehicle Wrap Installer',
            description: 'A vehible wrap artist to install a wrap on the truck.',
            numOfPeople: 1,
            biiggie: biiggieId._id
        },
        {
            name: 'Marketer',
            description: 'Help advertise the business.',
            numOfPeople: 3,
            biiggie: biiggieId._id
        },
    ]
    await db.HelpOption.deleteMany({});
    let data2 = await db.HelpOption.collection.insertMany(helpOptionSeed);
    console.log(data2);
    await db.Biiggie.updateMany({}, {$set: {helpOptions: [ data2.insertedIds[0], data2.insertedIds[1], data2.insertedIds[2] ]}});
    console.log(await db.Biiggie.findOne({}).populate('helpOptions'))
    process.exit(0);
});

const biiggieSeed = [
    {
        title: 'Taco Food Truck Startup',
        createdAt: new Date(new Date().setDate(new Date().getDate())),
        deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
        description: 'My Biiggie that I I need help getting my dream taco food truck business off the ground. I serve all types of tacos and have worked very hard renovating an old truck I but. Any help is welcome!',
        images: ['https://mobile-cuisine.com/wp-content/uploads/2015/09/food-truck-branding.jpg'],
    },
]

// db.Biiggie.deleteOne({})
//     .then(() => {
//         console.log('made it!');
//         db.Biiggie.collection.insertMany(biiggieSeed)
//     })
//     .then((data) => {
//         console.log(data.result.n + 'records inserted!');
//         process.exit(0);
//     })
//     .catch((err) => {
//         console.error(err);
//         process.exit(1);
//     });