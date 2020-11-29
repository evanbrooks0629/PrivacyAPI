# PrivacyAPI
An API that can be used to quickly obtain all the user's open virtual credit cards (VCC's) from privacy.com

# How to Implement
First things first, I would log into privacy.com and go through the 6 digit verification code thing. Make sure to check "remember me for 30 days" to avoid any issues. Once you've done that once, you're good for the next month.

As of now, this is not an npm module since one already exists (using the real privacy.com API), so this acts as a way to implement better functionality for the same thing in your project. In order to use it, just copy login.js and getCards.js. In app.js, you can see that there is a call to the function getCards() from getCards.js, and it takes in your email and password as arguments. Put in your credentials and you're good.
