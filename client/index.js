var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x0BE48330fE09E24b32B0babb4df9f1786BcB3bbC";
var userTokens = [];

$(document).ready(function(){

    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0]})
        user = accounts[0];

        console.log(instance);

        initCollection();
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

function initCollection () {
    if (user) {
        instance.methods.totalSupply().call().then(function(result) {
            //console.log(result, web3.utils.isBN(result), typeof result, parseInt(result));
            let totalSupply = parseInt(result)
            let owners = []
            for (i=0; i<totalSupply; ++i) {
                owners.push(instance.methods.ownerOf(i).call())
            }
            Promise.all(owners).then((values) => {
                console.log(values)
                let userTokens = [...Array(values.length).keys()].filter( (token) => {
                    //console.log("no filter", token, values[token], user, values[token].toLowerCase()===user.toLowerCase())
                    return values[token].toLowerCase() == user.toLowerCase()
                } )
                console.log(userTokens)
                Promise.all(userTokens.map( (token) => {return instance.methods.getKitty(token).call() } )).then ( (kitties) => {
                    console.log(kitties)
                    userTokens = kitties
                    if (document.getElementById('userCatList')) {
                        $('#userCatList').empty()
                        userTokens.forEach( (token) => {
                            //token
                            appendCat(token.genes);
                        })
                    }
                })
            })
        })
    }
}