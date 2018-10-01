# CoinBuddyBot - Final project for Ironhack bootcamp.

CoinBuddyBot is a cryptocoin market tracking and notification project. It displays the top 10 most active cryptocoins by transaction volume(24 hour window).

To receive price notifications via Telegram, you can link your account to Telegram either by going to the profile page and clicking/tapping on the specified link or by scanning the qr code.

Then you can add coins to track, select the price change percentage (-/+) for the notification target and enable notifications.

#Setup

1. Clone or copy this repository
2. `npm install`
3. Change the DB name in `src/server/config.js`
4. Add JTW Passphrase, Cloudinary Name/Key/Secret, Nomics API and Telegram Bot Token in `src/server/config.js`
5. `npm run dev`
6. Go to `http://localhost:3000` to test.

## Deployment

This setup is ready to deploy to Heroku. Simply connect your github repository to Heroku and trigger a deployment or activate automatic deployments.

Do not forget to install the mlab plugin in Heroku.

## Other

This project uses cryptocompare.com and nomics.com API's for cryptocoin data.
