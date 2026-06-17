const generateTransactionId = () => { return `AKTC-${Date.now()}`; };

module.exports = generateTransactionId;