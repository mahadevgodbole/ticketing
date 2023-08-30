const nats=require("node-nats-streaming");
const {randomBytes}=require("crypto")

// console.clear()



const stan= nats.connect("ticketing",randomBytes(4).toString('hex'),{
    url:"http://localhost:4222"
})

stan.on("connect",()=>{
    console.log("Listener connected to NATS");

    stan.on("close",()=>{
        console.log("NATS connection closed");
        process.exit();
    })

    const options= stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service');

    const subscrption= stan.subscribe("ticket:created","order-service-queue-group",options);

    subscrption.on("message",(msg)=>{

        const data=msg.getData();

        if(typeof data=== 'string'){
            console.log(`Received event #${msg.getSequence()}, ${data}`)
        }
       
        msg.ack();
    });
})

//close the stan connection
process.on("SIGINT",()=>stan.close());
process.on("SIGTERM",()=>stan.close());