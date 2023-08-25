const request =require("supertest");

const {app} =require("../../app");
const {Ticket}=require("../../models/ticket")

it("has a route handler listening to /api/tickets for post requests",async()=>{
    const response = await request(app)
        .post("/api/tickets")
        .send({})
    
    expect(response.status).not.toEqual(404)

})


it("can only be accessed if the user is signed in",async()=>{
    await request(app)
        .post("/api/tickets")
        .send({})
        .expect(401)

    // expect(response.status).toEqual(401)
})

it('returns a status other 401 if the user is signed in',async()=>{
    const response=await request(app)
        .post("/api/tickets")
        .set("Cookie",global.signin())
        .send({});
    
    expect(response.status).not.toEqual(401);
})

it("return as error if an invalid title is provided",async()=>{
   const response= await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title:"",
        price: 10
    }).expect(400);


    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        price: 10
    }).expect(400);
})


it("return an error if an invalid price is provided",async()=>{
    
    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title:"asldkjf",
        price: -10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title:"asldkjf"
    })
    .expect(400);
})

it("creates a ticket with valid inputs",async()=>{
    
    let tickets=await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title="dfdf"
    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title,
        price: 20
    })
    .expect(201)

    tickets= await Ticket.find({});
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
})



