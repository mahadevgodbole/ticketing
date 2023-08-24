module.exports={
    webpackDevMiddleware: config =>{
        // 300millisecond to reflect
        config.watchOptions.poll = 300
        return config;
    }
};