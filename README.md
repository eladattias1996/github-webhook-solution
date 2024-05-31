# Solution Run Manual

## Prerequisites
- `Node.js` installed in your computer

## How to run?
- Clone the project using `git clone` command
- Install dependencies using `npm install`
- Run `npm run start`

## Explanation about the logs
- When the app starts - the following log should appear: `Server is running on port 3000`
- When an event that should be monitored is received then the following log should appear: `Got supported event <event_type>, about to process it` (if there is an event that shouldn't be monitored then there is no log!)
- When a malicious behavior is detected then an appropriate log appears, for example: `A suspicious team called hacker_3 in organization elad-attias-excercise-org was created`

## Tested environement
This app was tested with:
- Mac OS X
- Node.js version 21.4.0
