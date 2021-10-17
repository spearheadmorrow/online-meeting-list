This is a meeting finder designed to list online recovery meetings for the Stockholm-based AA Swenglish group. (https://swenglish.info/)

## How to Set Up Your Local Development Environment

### Link Your Data

_Note: The meeting finder is integrated with Sentry.io for error reporting. Sign up for an account on their website and generate a unique DSN URL. You will need it in the step, where you create your environment variables._

1. Get an API Key from the [Google Developers Console](https://console.cloud.google.com) with the Sheets API enabled
1. Make a copy of [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0)
1. Open your spreadsheet and set the visibility to "anyone with the link can view"
1. Add environment variables. One option is to create a file called `.env` in your root folder, and add your spreadsheet's URL (when you're in edit mode, not the URL displayed when you publish it to the web):

```
REACT_APP_GOOGLE_SHEET="add URL to your Google Sheet here"
REACT_APP_GOOGLE_API_KEY="add key here"
REACT_APP_SENTRY_DSN_URL="add your Sentry URL here"
REACT_APP_PACKAGE_NAME="copy from your package.json file"
REACT_APP_PACKAGE_VERSION="copy from your package.json file"
```
  1. The last two variables are needed to tag your release in Sentry.

Or, if you are using a service like [Netlify](https://www.netlify.com), you can skip that step and add these variables directly to your build settings.
### Install and Run Locally

1. Clone this repository.
1. In the project directory, run `yarn` once to install the dependencies.
1. Run `yarn start` to start the app in development mode.

### Deploy to your Website

1. In the project directory, run `yarn build`.
2. Create an archive (ZIP file) of the generated `build` directory.
3. Send to Swenglish IT service chair and they will upload it to the website.

### Staying Up to Date

1. In the project directory, run `git pull`.
1. Re-run `yarn` in case dependencies were updated.

## TODO
- set npm pkg name and version programmatically
- https://docs.sentry.io/product/cli/releases/#creating-releases
### Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please use [Prettier](https://prettier.io), and keep properties in alphabetical order)
1. Create a pull request that references the issue. Please name [@joshreisner](https://github.com/joshreisner) as a reviewer.

## Application Architecture

### Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). Uses [Moment.js](https://momentjs.com) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.

### Managing Data

The data for the demo in managed in [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0). Some notes:

- It's helpful to use the `Format > Clear Formatting` command, since styling doesn't carry over to the app.
- It's a good practice to remove the meeting times and phone numbers from the Notes column, this prevents the inevitable scenario where it gets updated in one place but not another
- The Timezone column is necessary because time zones don't stay in sync due to daylight savings. Best to store them in their local time and allow the app to translate them for the user on the fly.
- Use soft returns (control-return on a Mac) to separate times in the Times column and indicate paragraph breaks in the Notes column
- In cases where the format or types vary between times of the same meeting, that can either be mentioned in the Notes column, or separate entries could be created. For example, if the Friday night ocurrence of a weekly meeting is Women-only, then it's probably best to create a new row for just that Friday meeting.

### JSON Feed Alternative

If you would prefer to use a custom JSON feed rather than a Google Sheet, you can use the parameter:

```
REACT_APP_JSON_URL="https://your-website.org/meetings.json"
```

JSON should be in the format:

```
[
    {
        "name": "Saturday Night Speaker Meeting",
        "times": "Saturday 7:00 PM",
        "timezone": "America/Los_Angeles",
        "url": "https://zoom.us/j/1234567890",
        "phone": "",
        "access_code": "",
        "email": "groupemail@gmail.com",
        "types": "Open, English",
        "formats": "Video",
        "notes": "Weekly meeting at 7pm Pacific. Meeting ID: 123 456 7890\nPassword: 255804"
    }
]
```
