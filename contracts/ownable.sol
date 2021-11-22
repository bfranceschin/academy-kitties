pragma solidity ^0.5.0;


contract Ownable {
    address public owner;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _; // run the fnuction
    }
    
    constructor () public {
        owner = msg.sender;
    }
}