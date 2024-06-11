const Client = require('mozu-node-sdk/client'), constants = Client.constants;
const CustomerClient = Client.sub({
    currentAccount: Client.method({
      method: constants.verbs.GET,
      url: '{+tenantPod}api/commerce/customer/accounts/current',
    })
})

const SegmentClient = require("mozu-node-sdk/clients/commerce/customer/accounts/customerSegment");
async function get_current_account(context) {
    try {
        const customerClient = new CustomerClient(context)
        const currentAccount = await customerClient.currentAccount()
        return currentAccount
    } catch (error) {
        console.error('unable to get current shopper account')
        console.error(error)
    }
}

async function get_account_segments(context, accountId) {
    let segments = []
    try {
        const segmentClient = new SegmentClient(context)
        segmentClient.context["user-claims"] = null;
        const segmentResponse = await segmentClient.getAccountSegments({
                accountId: accountId,
                pageSize: 50
        })
        console.log('account segments', segmentResponse.items)
        segments = segmentResponse.items.map(s => s.code) || [];
    } catch (error) {
        console.error('unable to get account segments for account id', accountId)
        console.error(error)
    }
    return segments
}

const searchSegmentCodes = ['budget', 'premium']

async function handle(context) {
    console.log('fetching current account')
    const currentAccount = await get_current_account(context)
    if(!currentAccount || !currentAccount.id){
        console.log('no current account found')
        return
    }
    console.log('fetching account segments for account id: ', currentAccount.id)
    const accountSegments = await get_account_segments(context, currentAccount.id)
    if(!accountSegments.length){
        console.log('no account segments found')
        return
    }
    console.log('searching for search segment, account segments length: ', accountSegments.length)
    const searchSegment = accountSegments.find(segment => searchSegmentCodes.includes(segment.code.toLowerCase()))
    if(!searchSegment || !searchSegment.code){
        console.log('no matching search segment found')
        return
    }
    console.log('search segment: ', searchSegment.code)
    context.request.query.searchSettings = searchSegment.code
    return
}
module.exports = function (context, callback) {
    handle(context, callback)
        .then(response => callback())
        .catch(error => callback());
};