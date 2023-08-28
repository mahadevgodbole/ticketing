const request = require("supertest")

const { app } = require("../../app");
const mongoose = require("mongoose")


it("return a 404 if the provided id deoes not exit", async () => {

    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: 'aslkdj',
            price: 20
        })
        .expect(404);



});


it("return a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'aslkdj',
            price: 20
        })
        .expect(401);

});



it("return a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send(
            {
                title: "asldkfj",
                price: 20
            }
        );

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.signin())
        .send({
            title: "adfdfdfdffd",
            price: 10000
        })
        .expect(401);
});


it("return a 400 if the user provides an invalid title or price", async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send(
            {
                title: "asldkfj",
                price: 20
            }
        );

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send(
            {
                title: "",
                price: 20
            }
        )
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send(
            {
                title: "aafdfdf",
                price: -10
            }
        )
        .expect(400);


});



it("updates the ticket provided valid input", async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send(
            {
                title: "asldkfj",
                price: 20
            }
        );
    
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set("Cookie",cookie)
            .send({
                title:"new title",
                price:100
            })
            .expect(200);
    
    const ticketResponse= await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .send();

    expect(ticketResponse.body.title).toEqual("new title");
    expect(ticketResponse.body.price).toEqual(100);

});