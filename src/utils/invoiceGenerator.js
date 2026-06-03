// In a real app you would generate a PDF. Here we just return a dummy object.
const generateInvoice = (payment, user, items) => {
  const invoiceNumber = `INV-${Date.now()}`;
  return {
    invoiceNumber,
    date: new Date(),
    user: user.name,
    email: user.email,
    items,
    totalAmount: payment.amount,
    message: 'Invoice generated successfully (PDF generation not implemented)',
  };
};

module.exports = { generateInvoice };