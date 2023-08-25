const {MongoMemoryServer} =require('mongodb-memory-server');
const mongoose =require("mongoose");
const request =require("supertest")
const {app}=require('../app');





let mongo;

beforeAll(async ()=>{
    process.env.JWT_KEY="asdfasdf"
     mongo=await MongoMemoryServer.create();
    const mongoUri= mongo.getUri();

    await mongoose.connect(mongoUri);
});

//clear previous test data
beforeEach( async()=>{
    const collections= await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({});
    }
});


afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close();
})

//global function (to signin)
global.signin = async()=>{
    const email= 'test@test.com';
    const password='password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,password
        })
        .expect(201)
    
    const cookie =response.get('Set-Cookie');
    return cookie;
    
}