import buildClient from "../api/build-client";



//component
const LandingPage= ({currentUser})=>{
    return currentUser? <h1>You are signed in</h1>:<h1>You are not signed in</h1>
  }
  
  
  LandingPage.getInitialProps = async(contex) =>{
    console.log("LANDING PAGE")
      const client=buildClient(contex)
      const {data}=await client.get("/api/users/currentuser")
    
      return data
  }
  
  export default LandingPage;
  












// ##############################################
// //component
// const LandingPage= ({currentUser})=>{
//   return currentUser? <h1>You are signed in</h1>:<h1>You are not signed in</h1>
// }


// LandingPage.getInitialProps = async(contex) =>{
//     const client=buildClient(contex)
//     const {data}=await client.get("/api/users/currentuser")
  
//     return data
// }

// export default LandingPage;




// ##############################################################

//TO SEND REQUEST FORM CLIENT ON SERVER AND ON BROSWER.
/*
//plain function
//static method call when next js load this component
LandingPage.getInitialProps = async({req}) =>{//make rendertime request

    //window object only availabe on the browser not on nodejs
    if(typeof window==='undefined'){


        const {data}= await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
             headers:req.headers
            }
         );
         return data;


        // we are on the server!
        // request should be made to http://ingress-nginx.ingres-nginx.svc...............

         //http://SERVICENAME.NAMESPACE.svc.cluster.local
         //namspace= ingress-nginx
         //Servicename=ingress-nginx-controller
        // const {data}= await axios.get(
        //    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
        //     headers:{
        //         Host:'ticketing.dev'
        //     }
        //    }
        // );
        // return data;
    }else{
        // we are on the browser!
        // request can be made with a base url of ''
        const {data}=await axios.get('/api/users/currentuser');
        return data;
    }

    // console.log("I WAS EXECUTED");
    // return {};
}

*/





/*server siding rendering 
const LandingPage= ({color})=>{
    console.log("I am in the component",color);
    return <h1>Landing page</h1>
}

//static method call when next js load this component
LandingPage.getInitialProps = () =>{//make rendertime request
    console.log("I am on the server");

    return {color: 'red'};
}

export default LandingPage;
*/