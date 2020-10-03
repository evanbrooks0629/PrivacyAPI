const privacyGetCards = require('./getCards');

const email = "YOUR EMAIL";
const password = "YOUR PASSWORD";

(async () => {
    privacyGetCards.getCards(email, password)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
})();