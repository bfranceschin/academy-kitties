var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xc895C47c3Cbd83beca01a3B72A17E0440DBDc387";

$(document).ready(function(){
    // window.ethereum.enable().then(function(accounts){
    //     instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
    //     user = accounts[0];

    //     console.log(instance);
        
    // })



    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0]})
        user = accounts[0];

        console.log(instance);

        
    }).then(function(){
        instance.events.Birth({}, function(error, event){ console.log(event); })
        instance.events.Birth()
        .on("connected", function(subscriptionId){
            console.log("Event subsciption connected with id: " + subscriptionId);
        })
        .on('data', function(event){
            alertstring = "Kitten born with following properties: id: " + event.returnValues.kittenId +
            ", mumId: " + event.returnValues.mumId + ", dadId: " + event.returnValues.dadId + ", genes: " +
            event.returnValues.genes + ", owner: " + event.returnValues.owner + ".";
            console.log(alertstring);
            alert(alertstring);
            //console.log(event.returnValues);
        })
        .on('changed', function(event){
            // nothing to do yet
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error);
        });
    });
})