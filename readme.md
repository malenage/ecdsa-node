## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Tests

For testing purposes, these are the public key (addresses) - private key pairs.

04e605f8eee731d2bb82eec7edd9b3c88b9c4627159c31af594e6e8ae9d3e74ac96853e208f6b62a36d5aec4ccad6176a85ce79a62a3d686634f7c0fae1c60a711
8f8604c99f445a963b6434a6c9526d9a63ec49484c2fd872173b2daf4c6298cc

04f123a8f06330d1df712a713f45a51969c49602a93f684abb7e06f20235f207cfcf9d40a92a0eab3c478e05cac10daf87aef1bebb6cf6cccc4737179bccd253ce
9b7e33405011c3de6e516ef21e85dc4b5f7e35268a22b00a369cc75aecf1665c

042c5b372b3810893e68689cdcc047641ceed537c90459e8cec2a46b04b87c081dd66340f5ef29c4e1625116ec59cd1b6c4d95b9345f36ad5d26d613b33221d32b
fc66d0659d858e83e23e4e2ac014c3f8c242b7eadfc81da43bae82941d1f2c0c