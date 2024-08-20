export const asyncHandler = (fn) => {
    return (req, res, next) => {
      // Wraps your function in a promise and handles errors automatically
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  


  // if the callback fucntion contains error then the 
  // outer function wwill execute catch block and next error
  // handling middleware will be called

  // if the callback fucntion contains no error then nothing will
  // be returned promise will be resolved and normal flow of
  // function will continue 