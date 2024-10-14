export function handleError(error) {
  /*eslint-disable */
  if (error?.response) {
    //console.log("Error....", error.response.data.message);
    throw error.response.data.message || "An error occurred on the server";
  } else if (error.request) {
    throw "There is a problem with the network connection";
  } else {
    throw "An error occurred. Please try again";
  }
  /*eslint-enable */
}

/* error request - The request was made but no response was received 
  error response - The request was made and the server responded with a status code 
  that falls out of the range of 2xx
  Something happened in setting up the request that triggered an Error */
