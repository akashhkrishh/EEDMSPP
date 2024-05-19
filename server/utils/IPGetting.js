const os = require('os');

const IPGet = () =>{
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
      const addresses = networkInterfaces[interfaceName];
      for (const addressInfo of addresses) {
        if (addressInfo.family === 'IPv4' && !addressInfo.internal) { 
          return addressInfo.address;
        }
      } 
    }
    return 'No local IP found';
}

module.exports =  IPGet;
