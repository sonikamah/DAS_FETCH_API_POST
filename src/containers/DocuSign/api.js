const baseUrl = "https://demo.docusign.net/restapi/v2/accounts/93ba53da-1ec0-459c-a5f3-c2374e0b1a68/envelopes/7aee0b2f-d8e7-4ded-b44a-0bd54d4b8d0f/views/recipient";

export function getESignIdUrl() {

  var url = baseUrl;

  var data = {
    "userName": "Sonika",
    "email": "sonikamaheshwari067@gmail.com",
    "recipientId": "1",
    "clientUserId": "1234",
    "authenticationMethod": "email",
    "returnUrl": "http://localhost:3000/saved/"
  }

  return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-DocuSign-Authentication': '{ "IntegratorKey" : "111ac7d0-7f23-4648-a21b-2083b1ee8889","Username":"sonikamaheshwari067@gmail.com", "Password":"ganeshji" }'
      },
      body: JSON.stringify(data)
    })
    .then(function (resp) {
      return resp.json()
    })
    .catch(error => error)
    .then(function (resp) {
      return resp
    })
}