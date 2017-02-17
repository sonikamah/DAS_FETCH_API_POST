/**
 * Created by jainpri on 1/17/2017.
 */

const baseUrl = "http://localhost:7777/api/";

export const getUserData = () => ({
  "firstName": "John", "lastName": "doe", "email": "johndoe@gmail.com"
})


// export const getUserData = () => {
//   var url = baseUrl+"getUserData";
//   var list = [];
//   return fetch(url)
//     .then(function (response) {
//       return response.json()
//     }).then(function (jsonResponse) {
//       console.log('updated list of objects', jsonResponse)
//       return { "firstName": "John", "lastName": "doe", "email": "johndoe@gmail.com" };
//     }).catch(function (ex) {
//       console.log('parsing failed', ex)
//     });
// }


export function isUserAuth(userData) {

  return fetch(baseUrl + 'isUserAuth', {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify({
        userName : userData.userName,
        password : userData.password
      })
    })
    .then(function (resp) {
      return resp.json()
    })
    .catch(error => error)
    .then(function (resp) {
      return resp
    })
}