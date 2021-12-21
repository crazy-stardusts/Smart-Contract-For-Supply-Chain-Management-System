const Web3 = require('web3')
// const web3 = new Web3('https://ropsten.infura.io/v3/a0efa42f980a4f86a7b520728822238c')
const web3 = new Web3('http://127.0.0.1:7545')

const account1 = '0xEa4b2462Ca60D64f8238037C471C584f49AdeEE5'
const account2 = '0x6e81D9e2f2283227a4b6C5F015bDfdc507E331AE'

const privateKey1 = process.env.PRIVATE_KEY_1
const privateKey2 = process.env.PRIVATE_KEY_2
const privateKey3 = '81efe037e8e22525cbee049aac5a8e5c7a7b5f31df52a4ee08be3c57324ef3b2'


async function getBalance(address) {
    await web3.eth.getBalance(address, (err, bal) => {
        balance = bal;
        console.log(web3.utils.fromWei(bal, 'ether'))
    })
}

async function signAndBrodcastTransaction(txObject, privateKey){
    const signedTransaction = web3.eth.accounts.signTransaction(txObject, privateKey);

    var cAddress
    // Broadcasting Transaction
    await signedTransaction.then(signedTx => {
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
        
        sentTx.on("receipt", reciept => {
            console.log("reciept:", reciept)
            cAddress = reciept['contractAddress']
            console.log("c :",cAddress)

        })
    
        sentTx.on("error", err => {
            console.log("Error : ", err)
        })
    })
    return cAddress
}

var data = '0x608060405234801561001057600080fd5b5060008081905550600060018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061126a806100706000396000f3fe6080604052600436106100555760003560e01c80631144fd721461005a5780638da5cb5b14610076578063a34e5649146100a1578063b15247d9146100cc578063bb1a423d146100f5578063cfdedf8014610125575b600080fd5b610074600480360381019061006f9190610b2a565b610150565b005b34801561008257600080fd5b5061008b6102d3565b6040516100989190610d7f565b60405180910390f35b3480156100ad57600080fd5b506100b66102f9565b6040516100c39190610dbc565b60405180910390f35b3480156100d857600080fd5b506100f360048036038101906100ee9190610ace565b61045e565b005b61010f600480360381019061010a9190610a85565b610539565b60405161011c9190610dde565b60405180910390f35b34801561013157600080fd5b5061013a6106e9565b6040516101479190610d9a565b60405180910390f35b6004600082815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101be57600080fd5b600160028111156101d2576101d1611123565b5b6004600083815260200190815260200160002060020160149054906101000a900460ff16600281111561020857610207611123565b5b1461021257600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60046000848152602001908152602001600020600101549081150290604051600060405180830381858888f19350505050158015610290573d6000803e3d6000fd5b5060026004600083815260200190815260200160002060020160146101000a81548160ff021916908360028111156102cb576102ca611123565b5b021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606000805467ffffffffffffffff811115610318576103176111b0565b5b60405190808252806020026020018201604052801561035157816020015b61033e61084e565b8152602001906001900390816103365790505b50905060005b600054811015610456576003600082815260200190815260200160002060405180606001604052908160008201805461038f90611048565b80601f01602080910402602001604051908101604052809291908181526020018280546103bb90611048565b80156104085780601f106103dd57610100808354040283529160200191610408565b820191906000526020600020905b8154815290600101906020018083116103eb57829003601f168201915b505050505081526020016001820154815260200160028201548152505082828151811061043857610437611181565b5b6020026020010181905250808061044e906110ab565b915050610357565b508091505090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104b857600080fd5b600054600360008054815260200190815260200160002060020181905550816003600080548152602001908152602001600020600001908051906020019061050192919061086f565b5080600360008054815260200190815260200160002060010181905550600080815480929190610530906110ab565b91905055505050565b6000806000905060005b83518110156105db5760006003600086848151811061056557610564611181565b5b6020026020010151815260200190815260200160002060010154141561058a57600080fd5b600360008583815181106105a1576105a0611181565b5b6020026020010151815260200190815260200160002060010154826105c69190610f09565b915080806105d3906110ab565b915050610543565b50348111156105e957600080fd5b600154600460006001548152602001908152602001600020600001819055508060046000600154815260200190815260200160002060010181905550600160046000600154815260200190815260200160002060020160146101000a81548160ff0219169083600281111561066157610660611123565b5b02179055503360046000600154815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600081546106cc906110ab565b91905081905550600180546106e19190610f5f565b915050919050565b6060600060015467ffffffffffffffff811115610709576107086111b0565b5b60405190808252806020026020018201604052801561074257816020015b61072f6108f5565b8152602001906001900390816107275790505b50905060005b600154811015610846576004600082815260200190815260200160002060405180608001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff1660028111156107ff576107fe611123565b5b600281111561081157610810611123565b5b8152505082828151811061082857610827611181565b5b6020026020010181905250808061083e906110ab565b915050610748565b508091505090565b60405180606001604052806060815260200160008152602001600081525090565b82805461087b90611048565b90600052602060002090601f01602090048101928261089d57600085556108e4565b82601f106108b657805160ff19168380011785556108e4565b828001600101855582156108e4579182015b828111156108e35782518255916020019190600101906108c8565b5b5090506108f19190610945565b5090565b60405180608001604052806000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000600281111561093f5761093e611123565b5b81525090565b5b8082111561095e576000816000905550600101610946565b5090565b600061097561097084610e1e565b610df9565b90508083825260208201905082856020860282011115610998576109976111e4565b5b60005b858110156109c857816109ae8882610a70565b84526020840193506020830192505060018101905061099b565b5050509392505050565b60006109e56109e084610e4a565b610df9565b905082815260208101848484011115610a0157610a006111e9565b5b610a0c848285611006565b509392505050565b600082601f830112610a2957610a286111df565b5b8135610a39848260208601610962565b91505092915050565b600082601f830112610a5757610a566111df565b5b8135610a678482602086016109d2565b91505092915050565b600081359050610a7f8161121d565b92915050565b600060208284031215610a9b57610a9a6111f3565b5b600082013567ffffffffffffffff811115610ab957610ab86111ee565b5b610ac584828501610a14565b91505092915050565b60008060408385031215610ae557610ae46111f3565b5b600083013567ffffffffffffffff811115610b0357610b026111ee565b5b610b0f85828601610a42565b9250506020610b2085828601610a70565b9150509250929050565b600060208284031215610b4057610b3f6111f3565b5b6000610b4e84828501610a70565b91505092915050565b6000610b638383610cbc565b60808301905092915050565b6000610b7b8383610d11565b905092915050565b610b8c81610fa5565b82525050565b610b9b81610f93565b82525050565b6000610bac82610e9b565b610bb68185610ed6565b9350610bc183610e7b565b8060005b83811015610bf2578151610bd98882610b57565b9750610be483610ebc565b925050600181019050610bc5565b5085935050505092915050565b6000610c0a82610ea6565b610c148185610ee7565b935083602082028501610c2685610e8b565b8060005b85811015610c625784840389528151610c438582610b6f565b9450610c4e83610ec9565b925060208a01995050600181019050610c2a565b50829750879550505050505092915050565b610c7d81610ff4565b82525050565b6000610c8e82610eb1565b610c988185610ef8565b9350610ca8818560208601611015565b610cb1816111f8565b840191505092915050565b608082016000820151610cd26000850182610d61565b506020820151610ce56020850182610d61565b506040820151610cf86040850182610b92565b506060820151610d0b6060850182610c74565b50505050565b60006060830160008301518482036000860152610d2e8282610c83565b9150506020830151610d436020860182610d61565b506040830151610d566040860182610d61565b508091505092915050565b610d6a81610fea565b82525050565b610d7981610fea565b82525050565b6000602082019050610d946000830184610b83565b92915050565b60006020820190508181036000830152610db48184610ba1565b905092915050565b60006020820190508181036000830152610dd68184610bff565b905092915050565b6000602082019050610df36000830184610d70565b92915050565b6000610e03610e14565b9050610e0f828261107a565b919050565b6000604051905090565b600067ffffffffffffffff821115610e3957610e386111b0565b5b602082029050602081019050919050565b600067ffffffffffffffff821115610e6557610e646111b0565b5b610e6e826111f8565b9050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610f1482610fea565b9150610f1f83610fea565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f5457610f536110f4565b5b828201905092915050565b6000610f6a82610fea565b9150610f7583610fea565b925082821015610f8857610f876110f4565b5b828203905092915050565b6000610f9e82610fca565b9050919050565b6000610fb082610fca565b9050919050565b6000819050610fc582611209565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610fff82610fb7565b9050919050565b82818337600083830152505050565b60005b83811015611033578082015181840152602081019050611018565b83811115611042576000848401525b50505050565b6000600282049050600182168061106057607f821691505b6020821081141561107457611073611152565b5b50919050565b611083826111f8565b810181811067ffffffffffffffff821117156110a2576110a16111b0565b5b80604052505050565b60006110b682610fea565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156110e9576110e86110f4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6003811061121a57611219611123565b5b50565b61122681610fea565b811461123157600080fd5b5056fea2646970667358221220ef4b32a0638b566a226e23c7baf14ccd60e7dd1c8f573c369f86a066d321508064736f6c63430008060033'

const txObject = {
    gas : '2100000',
    gasPrice : web3.utils.toWei('10', 'gwei'),
    data : data
}
const cAddress = signAndBrodcastTransaction(txObject, privateKey3)
// cAddress.then(c => {
//     console.log("Contract Address : ", c);
// })
