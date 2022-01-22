var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x0BE48330fE09E24b32B0babb4df9f1786BcB3bbC";
var userKitties = [];
var userTokens = [];

var selectedMother
var selectedFather

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0]})
        user = accounts[0];
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
            location.reload()
        })
        .on('changed', function(event){
            // nothing to do yet
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error);
        });
    });
})

function selectFather (catId) {
  $('#fatherDropDownButton').text(`Cat ${catId}`)
  selectedFather = catId
}

function selectMother (catId) {
  $('#motherDropDownButton').text(`Cat ${catId}`)
  selectedMother = catId
}

function breed () {
  let mother = $('#motherDropDownButton').prop("catId")
  let father = $('#fatherDropDownButton').prop("catId")

  console.log(instance.methods)
  
  instance.methods.breed(selectedMother, selectedFather).send({}, function (error, txHash){
    if (error)
      console.log(error)
    else {
      console.log("transaction hash: " + txHash)
    }
  })

}

function initCollection () {
  if (user) {
    // get total supply
    instance.methods.totalSupply().call().then(function(result) {
      let totalSupply = parseInt(result)
      // get each token owner
      let owners = []
      for (i=0; i<totalSupply; ++i) {
        owners.push(instance.methods.ownerOf(i).call())
      }
      Promise.all(owners).then((values) => {
        // filter user tokens
        userTokens = [...Array(values.length).keys()].filter( (token) => {
          return values[token].toLowerCase() == user.toLowerCase()
        } )
        console.log(userTokens)
        Promise.all(userTokens.map( (token) => {return instance.methods.getKitty(token).call() } )).then ( (kitties) => {
          console.log(kitties)
          userKitties = kitties
          if (document.getElementById('userCatList')) {
            $('#userCatList').empty()
            // userKitties.forEach( (kitty) => {
            //   appendCat(kitty.genes)
            // })
            
            for (let i=0; i<userTokens.length; i++) {
              appendCat(userTokens[i], userKitties[i].genes)
            }
          }
          if (document.getElementById("motherBreedDropdown")) {
            $('#motherBreedDropdown').empty()
            $('#fatherBreedDropdown').empty()
            for (let i=0; i<userTokens.length; i++) {
              let tokenId = userTokens[i]
              $('#motherBreedDropdown').append(`<a cat=${tokenId} class="dropdown-item" onclick=selectMother(${tokenId}) >Cat ${tokenId}</a>`);
              $('#fatherBreedDropdown').append(`<a cat=${tokenId} class="dropdown-item" onclick=selectFather(${tokenId}) >Cat ${tokenId}</a>`);
            }
          }
        })
      })
    })
  }
}
