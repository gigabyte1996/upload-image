import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 
admin.initializeApp()

const toUpperCase = (str: any) => str.toUpperCase();

exports.addImage = functions.https.onRequest((request, response) => {
    const text = request.query.text
    const secretText = toUpperCase(text)

    admin
    .database()
    .ref('/messages')
    .push({text: secretText})
    .then(() =>
        response.json({
            message: 'great!!',
            text
        }))


})