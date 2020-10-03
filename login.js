const axios = require('axios');

async function login () {

    try {

        console.log('RUNNING NOW...');

        // first response, get session id and experiment
        const getCredentials = await axios.get('https://privacy.com');
        const id = getCredentials.request.res.headers['set-cookie'][0].split(";")[0];
        const exp = getCredentials.request.res.headers['set-cookie'][1].split(";")[0];

        console.log('GOT CREDENTIALS...LOGGING IN');

        const postLogin = await axios.post('https://privacy.com/auth/local',
            {
                "email":"evanbrooks0629@gmail.com",
                "password":"EvanSoccer$34$",
                "extensionInstalled":false,
                "captchaResponse":null
            },
            {
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Connection": "keep-alive",
                    "Content-Length": 114,
                    "Content-Type": "application/json;charset=UTF-8",
                    "Cookie": `http-referrer=https%3A%2F%2Fwww.google.com%2F; abtests=%5B%7B%22name%22%3A%22extension-install-test%22%2C%22value%22%3A%22dashboard-modal%22%7D%2C%7B%22name%22%3A%22signup-share-test%22%2C%22value%22%3A%22none%22%7D%5D; referringSite=www.google.com; ${id}; TFADeviceID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE2ODkxOTAsImV4cCI6MTYwOTQ2NTE5MH0.yHQ5XQ28iEUVrjinmlqMGGsGHhv2P8_Bs7TeQ-JsDI0; ${exp}`,
                    "Host": "privacy.com",
                    "Origin": "https://privacy.com",
                    "Referer": "https://privacy.com/login",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
                }
            }
        );

        const userToken = postLogin.data.token;
        const userId = postLogin.data.id;

        return [userToken, userId, id, exp];

    } catch (error) {

        console.log(error);
        return null;

    }

}

exports.login = login;