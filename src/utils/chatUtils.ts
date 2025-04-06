
export const determineResponseType = (userMessage: string, responseTypes: Record<string, string>): keyof typeof responseTypes => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('order') || message.includes('shipping') || message.includes('delivery') || message.includes('track')) {
    return 'order';
  } else if (message.includes('refund') || message.includes('money back') || message.includes('cancel')) {
    return 'refund';
  } else if (message.includes('problem') || message.includes('issue') || message.includes('error') || message.includes('not working')) {
    return 'technical';
  } else if (message.includes('unhappy') || message.includes('disappointed') || message.includes('angry') || message.includes('upset')) {
    return 'complaint';
  } else if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
    return 'pricing';
  }
  
  return 'default';
};

export const formatOrderResponse = (template: string): string => {
  const orderId = Math.floor(Math.random() * 10000);
  const statuses = ['being processed', 'prepared for shipping', 'waiting for carrier pickup', 'in transit'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return template.replace('[ORDER_ID]', orderId.toString()).replace('[STATUS]', randomStatus);
};
