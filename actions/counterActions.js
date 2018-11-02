

export const handleIncrement = increment => {
  console.log("increment: ", increment);

  return {
    type:'INCREMENT',
    increment
  };
};

export const handleIncrement2 = increment => (dispatch, getState) => {

  return {

  };
  
};


