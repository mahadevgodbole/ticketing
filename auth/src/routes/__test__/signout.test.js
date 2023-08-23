const request=require("supertest");
const {app}=require("../../app");


it("clears the cookie after siging out",async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:"test@test.com",
            password:"password"
        })
        .expect(201);

    const response= await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
    
    // console.log(response.get('Set-Cookie')) geting to below response string to check equality
    expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

})