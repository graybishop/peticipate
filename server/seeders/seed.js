const db = require('../models');
const connection = require('../config/connection');

let biiggieId;
let userId;

connection.once('open', async () => {
    await db.User.collection.deleteMany({});
    console.log('Deleted User collection');
    let userInsert = await db.User.collection.insertMany(userSeed);
    console.log(userInsert);

    userId = await db.User.find({});
    console.log(userId);
    let biiggieSeed = [
        {
            title: 'Taco Food Truck Startup',
            createdBy: userId[1]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
            description: 'I need help getting my dream taco food truck business off the ground. I serve all types of tacos and have worked very hard renovating an old truck I but. Any help is welcome!',
            images: ['https://mobile-cuisine.com/wp-content/uploads/2015/09/food-truck-branding.jpg'],
            likes: 23
        },
        {
            title: 'First EP Production',
            createdBy: userId[2]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 6)),
            description: "I'm a start up musician that needs help in producing my first EP. I'm hoping this Wishing Well can help me reach my dreams.",
            images: ['https://pngimg.com/uploads/vinyl/vinyl_PNG96.png'],
            likes: 42
        },
        {
            title: 'Amazing New Tech',
            createdBy: userId[3]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 24)),
            description: "I want to create technology that will change the way we consume natural resources to something more clean and efficient. This project will really just be a stepping stone to my space exploration.",
            images: ['http://www.onlygfx.com/wp-content/uploads/2017/12/top-secret-stamp-1-1024x1024.png'],
            likes: 1607
        },
        {
            title: 'Online Book Retail',
            createdBy: userId[4]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 12)),
            description: 'I want to create a online retail store for every book imaginable... for now. Eventually I will expand to become the standard of goods acquisition.',
            images: ['https://www.getunderlined.com/wp-content/uploads/2017/08/book-lovers-header.jpg'],
            likes: 158
        },
        {
            title: 'Local River Needs Cleaning',
            createdBy: userId[5]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 4)),
            description: 'I want to get the community together to help clean out trash polluted river. Our community depends on the water from this river and we should take the initiative to help maintain it.',
            images: ['https://s3-ap-southeast-1.amazonaws.com/scrollstorage/1440502167-1109_10.jpg'],
            likes: 16
        },
        {
            title: 'Against School Uniforms',
            createdBy: userId[5]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
            description: 'They are trying to force our children to wear uniforms instead of letting them have a healthy way to express themselves. This is totalitarianism and our community should not stand by this.',
            images: ['https://assets.change.org/photos/5/pc/ax/fSpCaxMPnMLloPB-1600x900-noPad.jpg?1526663748'],
            likes: 137
        },
        {
            title: 'Teacher Recognition',
            createdBy: userId[6]._id,
            deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
            description: 'I want to celebrate Ms. Smith for how much she has helped me with my college readiness. I think she deserves a surprise party and a good gift.',
            images: ['https://townsquare.media/site/10/files/2017/09/teacher-getty-3.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89'],
            likes: 9
        }
    ];
    await db.Biiggie.deleteMany({});
    console.log('Deleted Biiggie collection');
    await db.Biiggie.collection.insertMany(biiggieSeed);
    
    //await db.User.updateOne({}, {$set: {createdBiiggies: [ biiggieInsert.insertedIds[0] ]}});
    //console.log(await db.User.findOne({}).populate('createdBiiggies'))

    biiggieId = await db.Biiggie.find({});
    console.log('This is the biiggies log \n' + biiggieId);
    let helpOptionSeed = [
        {
            name: 'Graphic Designer',
            description: 'A graphic designer to help design the truck.',
            numOfPeople: 1,
            biiggie: biiggieId[0]._id
        },
        {
            name: 'Donation for Vehicle Wrap',
            description: '$100 for a Vehicle wrap artist to install a wrap on the truck.',
            moneyRequested: 100,
            moneyReceived: 0,
            biiggie: biiggieId[0]._id
        },
        {
            name: 'Marketer',
            description: 'Help advertise the business.',
            numOfPeople: 3,
            biiggie: biiggieId[0]._id
        },
        {
            name: 'Donation for recording studio',
            description: '$1000 to rent a studio to record',
            moneyRequested: 1000,
            moneyReceived: 0,
            biiggie: biiggieId[1]._id
        },
        {
            name: 'Donation for EP advertisement',
            description: '$500 to get the word of our EP out there',
            moneyRequested: 500,
            moneyReceived: 0,
            biiggie: biiggieId[1]._id
        },
        {
            name: 'Graphic Designer',
            description: 'Need graphic designer to design album cover and band logo',
            numOfPeople: 1,
            biiggie: biiggieId[1]._id
        },
        {
            name: 'Donation needed to produce clean energy resource tech',
            description: '$100,000 to get the prototype for my new tech finished. Every dollar is 0.0002% profit of all income from the tech.',
            moneyRequested: 100000,
            moneyReceived: 0,
            biiggie: biiggieId[2]._id
        },
        {
            name: 'Graphic Designer for logos',
            description: 'Need graphic designer who will get 3% stake in company for graphics created.',
            numOfPeople: 1,
            biiggie: biiggieId[3]._id
        },
        {
            name: 'Need developer for site',
            description: 'Require a developer for the site to get things running for 33% stake in the company.',
            numOfPeople: 1,
            biiggie: biiggieId[3]._id
        },
        {
            name: 'Need marketing expert for business',
            description: 'Need marketing expert for business and recommendations for 5% stake in the company.',
            numOfPeople: 1,
            biiggie: biiggieId[3]._id
        },
        {
            name: 'Need Volunteers',
            description: '100 people willing to come out to the river and clean up garbage.',
            numOfPeople: 100,
            biiggie: biiggieId[4]._id
        },
        {
            name: 'Need Volunteers',
            description: '500 people to attend the School Board meeting and protest against decision',
            numOfPeople: 500,
            biiggie: biiggieId[5]._id
        },
        {
            name: 'Need Attendees',
            description: 'Need 20 people to attend surprise party for Ms. Smith',
            numOfPeople: 20,
            biiggie: biiggieId[6]._id
        },
        {
            name: 'Need Gift for Ms. Smith',
            description: '$100 to get Ms. Smith a present',
            moneyRequested: 100,
            moneyReceived: 0,
            biiggie: biiggieId[6]._id
        }
    ];
    await db.HelpOption.deleteMany({});
    console.log('Deleted HelpOptions collection')
    await db.HelpOption.collection.insertMany(helpOptionSeed);

    let keywordSeed = [
        {
            keyword: 'Food',
            biiggie: biiggieId[0]._id
        },
        {
            keyword: 'Music',
            biiggie: biiggieId[1]._id
        },
        {
            keyword: 'Technology',
            biiggie: biiggieId[2]._id
        },
        {
            keyword: 'Business',
            biiggie: biiggieId[3]._id
        },
        {
            keyword: 'Community',
            biiggie: [ biiggieId[4]._id, biiggieId[5]._id, biiggieId[6]._id ]
        },
        {
            keyword: 'School',
            biiggie: biiggieId[6]._id
        }
    ];
    await db.Keywords.deleteMany({});
    console.log('Deleted Keywords collection');
    await db.Keywords.collection.insertMany(keywordSeed);

    for (const biiggie of biiggieId) {
        let user = await db.User.findOne({_id: biiggie.createdBy});
        user.createdBiiggies.push(biiggie._id);
        await user.save();
    }

    let databaseHelp = await db.HelpOption.find({});
    for (const helpOptions of databaseHelp ) {
        let biiggie = await db.Biiggie.findOne({_id: helpOptions.biiggie});
        biiggie.helpOptions.push(helpOptions._id);
        await biiggie.save();
    }

    let dataKeywords = await db.Keywords.find({});
    for (const keywords of dataKeywords) {
        for (let i = 0; i < keywords.biiggie.length; i++) {
            let biiggie = await db.Biiggie.findOne({_id: keywords.biiggie[i]});
                biiggie.keywords.push(keywords._id);
                await biiggie.save();
        }
    }
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
    },
    {
        username: 'TheEse89',
        password: 'TacoTuesday',
        firstName: 'Jose',
        lastName: 'Gonzales',
        email: 'tacotaker@mail.com',
        description: 'Tacos are my passion, I want them to be my career.',
        image: 'http://www1.pictures.zimbio.com/gi/Cambridge+Folk+Festival+2019+nHeJhqaeJvox.jpg'
    },
    {
        username: 'Crazyriffs182',
        password: 'SmallThingss1999',
        firstName: 'Mark',
        lastName: 'Hoppus',
        email: 'rockshow@mail.com',
        description: 'Gonna pave the way for pop punk',
        image: 'https://theblemish.com/images/2018/07/mark-hoppus-640x587.jpg'
    },
    {
        username: 'astronaut71',
        password: 'apollo11',
        firstName: 'Elon',
        lastName: 'Musk',
        email: 'CosmosStrider@mail.com',
        description: 'I will pave the future for the 1%.',
        image: 'http://static5.businessinsider.com/image/5aa5a87cbe4120ce5f8b4653-2000/elon-musk-spacex-colonize-mars-1.jpg'
    },
    {
        username: 'jdawg64',
        password: 'Madeofmoney12',
        firstName: 'Jeff',
        lastName: 'Bezos',
        email: 'bigJ64@mail.com',
        description: 'I will own the world.',
        image: 'https://www.the-sun.com/wp-content/uploads/sites/6/2020/05/NINTCHDBPICT000574792789.jpg'
    },
    {
        username: 'TeamPlayer',
        password: 'Localhero',
        firstName: 'Joe',
        lastName: 'Schmo',
        email: 'joe@mail.com',
        description: "Your community is your everything",
        image: 'https://www.realityblurred.com/realitytv/images/2018/09/joe-schmo-show-matt-kennedy-gould.jpg'
    },
    {
        username: 'JacksSidekick',
        password: 'DavyJones',
        firstName: 'Will',
        lastName: 'Turner',
        description: 'Planning my roadmap to UF',
        image: 'https://disney-planet.fr/wp-content/uploads/2017/05/will-turner-personnage-pirate-caraibes-malediction-black-pearl-01.jpg'
    }
];