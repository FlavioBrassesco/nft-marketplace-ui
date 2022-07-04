# NFT Marketplace boilerplate

Core technologies: Hardhat & Solidity, NextJS, Material UI
 
# UPDATE
We're going to implement first the blockchain functionality and then plug a cache mechanism

MockupDeploy ready. Marketplace filling with on-chain mockup data.
** May need to address issue with high gas costs

** Implement a smart contract proxy to have, for example, a single panic switch, and in a future the functionality to allow owners to create collections and mint automatically

** what happens when someone buys in erc20... window opens to send eth? is there a way to fix it?

----

Proxy pattern will be implemented for service data caching

# Check:
Connect button needs to disappear if I connect directly from metamask  
Data needs to be fetched correctly even if I change the network.  
An alert should be issued if the user switches networks  

All blockchain readings should be done through an API endpoint that guarantees a proper configured provider.  
This means that redux slices for reading data could contain async thunks  
Saved frontend services are only used for write operations.  
We need to define a new API with express, so it can be deployed independently.