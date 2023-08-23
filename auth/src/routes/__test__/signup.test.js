const request=require("supertest");

const {app}=require("../../app");

it('returns a 201 on successfully signup',async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email:"test@test.com",
            password:"password"
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email:"testest.com",
            password:"password"
        })
        .expect(400);
})

it('returns a 400 with an invalid password', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email:"test@gamil.test.com",
            password:"pa"
        })
        .expect(400);
})

it('returns a 400 with an missing email and password', async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
          email:"test@test.com"
        })
        .expect(400);

    await  request(app)
    .post('/api/users/signup')
    .send({
      password:"password"
    })
    .expect(400);
})

it('disallows duplicate emails', async()=>{
    await request(app)
        .post("/api/users/signup")
        .send({
            email:'test@test.com',
            password:"password"
        })
        .expect(201)
    
    await request(app)
        .post("/api/users/signup")
        .send({
            email:'test@test.com',
            password:"password"
        })
        .expect(400);

})


it("sets a cookie after successful signup",async()=>{
    const response= await request(app)
    .post("/api/users/signup")
    .send({
        email:'test@test.com',
        password:"password"
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})