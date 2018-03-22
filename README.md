# NodeJS Network Throughput Test via Webserver (Express)

## Objective
Create a simple to install/use webserver to serve an arbitrarily large file. A client can then request the file to test the network throughput.

## Tech
* NodeJS
* Express

## Usage
`node server.js`

## Config

`nodeListen`: The address you want the webserver to listen on on `0.0.0.0` for all interfaces, `192.x.x.x` for private, or `127.0.0.1` for loopback only.

`nodePort`: What port you want to use for incomming connections. `8080` by default.

`fileName`: Name of the file that you want generated.

`fileSize`: How large you want the file to be (in bytes).

```
{
  "nodeListen": "0.0.0.0",
  "nodePort": "8080",
  "fileName": "bigfile.html",
  "fileSize": 4294967296
}
```
