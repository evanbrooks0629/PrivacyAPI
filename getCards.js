const axios = require('axios');
const privacyLogin = require('./login');

let cards = [];

async function getCards (email, password) {

    try {

        const vals = await privacyLogin.login(email, password);
        const [userToken, userId, id, exp] = vals;

        console.log('LOGGED IN...RETREIVING CARDS');

        // third response, once logged in get the user's cards
        const getCards = await axios.get('https://privacy.com/api/v1/card/', 
            {
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Authorization": `Bearer ${userToken}`,
                    "Connection": "keep-alive",
                    "Cookie": `http-referrer=https%3A%2F%2Fwww.google.com%2F; abtests=%5B%7B%22name%22%3A%22extension-install-test%22%2C%22value%22%3A%22dashboard-modal%22%7D%2C%7B%22name%22%3A%22signup-share-test%22%2C%22value%22%3A%22none%22%7D%5D; referringSite=www.google.com; ${id}; TFADeviceID=${userId}; ${exp}; token=${userToken}`,
                    "Host": "privacy.com",
                    "Referer": "https://privacy.com/login",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
                }
            }
        );

        getCards.data.cardList.forEach(cardObject => {
            if (cardObject.state === 'OPEN') {
                cards.push({
                    name: cardObject.memo,
                    pan: cardObject.PAN,
                    expMonth: cardObject.expMonth,
                    expYear: cardObject.expYear,
                    cvv: cardObject.CVV
                });
            }
        });
        
        return cards;

    } catch (error) {

        console.log(error);
        return null;

    }

}

exports.getCards = getCards;