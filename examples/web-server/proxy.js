const http = require('http');

// The proxy's port
const PORT = 8000;

// List of our backend servers
const mainServers = [
  { host: 'localhost', port: 8001 },
  // { host: 'localhost', port: 8002 }
];

// create the proxy server
const proxy = http.createServer();

proxy.on('request', (clientRequest, proxyResponse) => {
  // Select a server to route the incoming request to ( using round-robin algorithm )
  const mainServer = mainServers.shift();
  mainServers.push(mainServer);

  console.log(`Request on proxy server: ${clientRequest.method} ${clientRequest.url}`);
  console.log(`Proxy algorithm chosen web server: ${mainServer.port}`);

  // The request that we are sending to one of our main server
  const proxyRequest = http.request({
    host: mainServer.host,
    port: mainServer.port,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers
  });

  proxyRequest.on('response', (mainServerResponse) => {
    // Set the status code and headers for response that we are sending to the client
    proxyResponse.writeHead(mainServerResponse.statusCode, mainServerResponse.headers);

    mainServerResponse.pipe(proxyResponse);
  });


  // write the data from client request to the proxy request
  clientRequest.pipe(proxyRequest);

});

proxy.listen(PORT, () => {
  console.log('Proxy server is running on http://localhost:8000');
});