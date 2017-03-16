const baseUrl = "https://demo.docusign.net/restapi/v2/accounts/93ba53da-1ec0-459c-a5f3-c2374e0b1a68/envelopes/d8709c9d-1a54-4e1d-995b-c4dc18938880/views/recipient";

const accountId = "93ba53da-1ec0-459c-a5f3-c2374e0b1a68";
const integratorKey = "111ac7d0-7f23-4648-a21b-2083b1ee8889";
export function getESignIdUrl() {

  let url = baseUrl;

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

export function getEnvelopeData(pdfBase64){
    let url = "https://demo.docusign.net/restApi/v2/accounts/"+accountId+"/envelopes";

    var data = {
    "status": "sent",
    "emailSubject": "Envelope with Embedded Signer",
    "documents": [{
        "documentId": "1",
        "name": "contract.pdf",
        "documentBase64": pdfBase64,
    }],
    "recipients": {
        "signers": [{
            "email": "sonikamaheshwari067@gmail.com",
            "name": "Sonika",
            "recipientId": "1",
            "clientUserId": "1234"
        }]
    }
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