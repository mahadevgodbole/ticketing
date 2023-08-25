const {MongoMemoryServer} =require('mongodb-memory-server');
const mongoose =require("mongoose");
const request =require("supertest")
const {app}=require('../app');
const jwt=require("jsonwebtoken")




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
global.signin = ()=>{
  // Build a JWT payload. {id, email}
  const payload={
    id: "mahaddefd",
    email:"test@test.com"
  }

  // Create the JWT token
  const token = jwt.sign(payload,process.env.JWT_KEY);

  // Build session Object {jwt:My_JWT}
  const session={jwt:token}

  //Turn that session into JSON
  const sessionJSON=JSON.stringify(session);

  //Take JSON and endcoe it as base64
  const base64=Buffer.from(sessionJSON).toString('base64')

  //return a string thats a encoded data (use array as supertest expect cookie in array)
  return [`session=${base64}`];
}