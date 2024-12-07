import castArray from '../../castArray'
import reduce from '../../reduce'
import add from '../../add'
import ceil from '../../ceil'
import map from '../../map'
import filter from '../../filter'
import toNumber from '../../toNumber'

const checkout = (shoppingCart, paymentInfo) => {
    shoppingCart = castArray(shoppingCart)

    const iteratee = (acc, item) => add(acc, item.price * item.quantity)
    const totalPrice = reduce(shoppingCart, iteratee, 0)
    const roundedTotalPrice = ceil(toNumber(totalPrice), 2)
    const orderConfirmation = {
        cartItems: shoppingCart,
        totalPrice: roundedTotalPrice,
        paymentInfo: paymentInfo
    }

    return orderConfirmation
}

const makePayment = (paymentInfo, paymentResponse) => {
    const paidItems = filter(paymentResponse.split(' '), item => !isNaN(parseFloat(item)))
    const paymentAmount = toNumber(paidItems)

    if (!paymentInfo || paymentInfo.cardNumber === 'invalid'){
        const transactionRecord = {
            amount: paymentAmount,
            currency: 'EUR',
            status: 'unsuccessful',
            timestamp: new Date().toUTCString(),
        }
        const orderConfirmation = {}
        return { transactionRecord, orderConfirmation }
    }

    if (!paymentAmount || paymentAmount <= 0.0){
        const transactionRecord = {
            status: 'unsuccessful',
            timestamp: new Date().toUTCString(),
        }
        const orderConfirmation = {
            message: "Your payment was unsuccessful",
            itemsPaidFor: [[]],
            contactMethod: 'SMS',
            contactAddress: paymentInfo.phoneNum
        }
        return { transactionRecord, orderConfirmation }
    }

    const transactionRecord = {
        amount: paymentAmount,
        currency: 'EUR',
        status: 'successful',
        timestamp: new Date().toUTCString(),
        paymentInfo: paymentInfo
    }
    
    let message = `Your payment of ${paymentAmount} ${transactionRecord.currency} was successful.`
    const orderConfirmation = {
        message: message,
        itemsPaidFor: paidItems,
        contactMethod: 'SMS',
        contactAddress: paymentInfo.phoneNum
    }

    return { transactionRecord, orderConfirmation }
}

const confirmOrderPlacement = (shoppingCart, paymentInfo) => {
    shoppingCart = castArray(shoppingCart)

    let status = 'successful'

    if(!shoppingCart || shoppingCart.length === 0 || !paymentInfo){
        status = 'unsuccessful'
    }

    const orderConfirmation = {
        message: `Your order has been ${status}ly placed!`,
        contactMethod: 'SMS',
        contactAddress: paymentInfo?.phoneNum
    }

    const paymentStatus = `Payment ${status}`
    const orderedItemNames = map(shoppingCart, item => item.name);

  const confirmationDetails = {
    confirmationMessage: orderConfirmation.message,
    contactMethod: orderConfirmation.contactMethod,
    contactAddress: orderConfirmation.contactAddress,
    paymentStatus: paymentStatus,
    orderedItems: orderedItemNames,
  };

  return confirmationDetails;
}

export { checkout, makePayment, confirmOrderPlacement };