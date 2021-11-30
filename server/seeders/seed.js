const mongoose = require('mongoose');
const db = require('../models');

const biiggieSeed = [
    {
        title: 'Taco Food Truck Startup',
        createdAt: new Date(new Date().setDate(new Date().getDate())),
        deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
        description: 'My Biiggie that I I need help getting my dream taco food truck business off the ground. I serve all types of tacos and have worked very hard renovating an old truck I but. Any help is welcome!',
        images: ['https://mobile-cuisine.com/wp-content/uploads/2015/09/food-truck-branding.jpg'],
        helpOptions: [
            {
                name: 'Graphic Designer',
                description: 'A graphic designer to help design the truck.',
                numOfPeople: 1,
            },
            {
                name: 'Vehicle Wrap Installer',
                description: 'A vehible wrap artist to install a wrap on the truck.',
                numOfPeople: 1,
            },
            {
                name: 'Marketer',
                description: 'Help advertise the business.',
                numOfPeople: 3,
            },
        ],
    },
]

db.Biiggie.deleteMany({})
    .then(() => db.Biiggie.collection.insertMany(biiggieSeed))
    .then((data) => {
        console.log(data.result.n + 'records inserted!');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });