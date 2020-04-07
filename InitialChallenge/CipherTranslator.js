const axios = require("axios")
const sha1 = require('js-sha1')
const fs = require('fs')
const FormData = require("form-data")
const myToken = require("./key")['token']

const api = axios.create({
    baseURL: "https://api.codenation.dev/v1/challenge/dev-ps",
})

async function solveChallenge() {
    let challenge = await getCipherChallenge()

    challenge = translateCipher(challenge)

    challenge.resumo_criptografico = sha1(challenge.decifrado)

    await sendCipherChallenge(challenge)
}

async function getCipherChallenge() {
    const response = await api.get("/generate-data", {
        params: {
            token: myToken
        }
    })

    return response.data
}

function translateCipher(challenge) {
    const cipher = challenge.cifrado
    const key = challenge.numero_casas

    let translate = ""
    let charNumber = 0

    for (let i = 0; i < cipher.length; i++){
        charNumber = cipher.charCodeAt(i)

        if(charNumber >= 97 && charNumber <= 122){
            charNumber -= key

            if(charNumber < 97) charNumber = 122 - (96 - charNumber)
        }
        
        translate += String.fromCharCode(charNumber);
    }

    challenge.decifrado = translate

    return challenge
}

async function sendCipherChallenge(challenge) {
    const jsonString = JSON.stringify(challenge)

    fs.writeFile('./answer.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    let formData = new FormData()

    formData.append("answer", fs.createReadStream("./answer.json"))

    api.post('/submit-solution', formData, {
        headers: formData.getHeaders(),
        params: {
            token: myToken
        }
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error.message);
         })
}

solveChallenge()