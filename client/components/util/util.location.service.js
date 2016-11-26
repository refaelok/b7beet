'use strict';
/**
 * This service is encapsulate all the rest requet to the server
 * 
 */
 function locationService($http, $location) {
  //  const _ = lodash;
   var Util = {
     buildPath: function(address) {
       var baseUri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
       var key = '&key=AIzaSyBZbR3iaSuiXzq5slZC5wfAThwBTPLYgNs';
       return baseUri + address + key;
     },

     getLocationByAddress: function(address) {
       return $http.get(this.buildPath(address)).
       then(handleResponse)
       .then(validateData)
       .then(formatData)
     }
   };

   return Util;
   function handleResponse(response){
     let code = response.status;
     if      (_.inRange(code, 200, 299)) return responseSuccess(response)
     else if (_.inRange(code, 300, 399)) return redirect(response)
     else if (_.inRange(code, 400, 499)) return clientError(response)
     else if (_.inRange(code, 500, 599)) return serverError(response)
     else return handleError()

   }

   function validateData(data){
     if(data.status === 'OK')
      return data.results
    return null;
   }

   /* we just need the lat lng to k means */
   function formatData(data) {
     let newData = [];
     data && data.forEach(location => {
       if(location.geometry && location.geometry.location){
         newData = location.geometry.location
       } else {
         newData = null;
       }
     })
     return newData
   }

   function responseSuccess(response){
     return Promise.resolve(response.data)
   }

   function handleError(type, code){
     let error = {
       type : type ? type : 'error',
       code : code
     }
     return error;
   }

   function redirect(response) {
     // TODO: implement
     return Promise.resolve(response.data);
   }

   function clientError(response) {
     return handleError('clientError', response.status)
   }

   function serverError(response) {
     return handleError('serverError', response.status)
   }
 }

export default {
  name: 'locationService',
  service: ['$http', '$location', locationService]
}
