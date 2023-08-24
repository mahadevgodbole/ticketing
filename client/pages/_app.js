// require('bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent=({Component, pageProps,currentUser})=>{
    return <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
    </div>;
};



AppComponent.getInitialProps=async(appContext)=>{
    // console.log(Object.keys(appContext))
    // console.log(appContext)


    const client=buildClient(appContext.ctx);//appContext.ctx because we are in custom component not in page component
    const {data}= await client.get('/api/users/currentuser');
    
    let pageProps={};
    if(appContext.Component.getInitialProps){
        //To run props of pages getInitialProps 
        pageProps=await appContext.Component.getInitialProps(appContext.ctx);
    }

    console.log(pageProps);

    return {
        pageProps,
        ...data
    };
};

export default AppComponent;