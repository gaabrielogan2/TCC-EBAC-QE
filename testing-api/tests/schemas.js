const couponSchema = {
    title: 'Coupon Schema',
    type: 'object',
    required: ['id', 'code', 'amount'],
    properties: {
      id: {
        type: 'integer'
      },
      code: {
        type: 'string'
      },
      amount: {
        type: 'string'
      },
    }
  };
  
  module.exports = {
    couponSchema
  };
  