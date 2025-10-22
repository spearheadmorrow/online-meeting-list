# Online Meeting List

A small, fast React + TypeScript app for listing online recovery meetings. Built with Vite, React 18 and Chakra UI.

## Main Points

- Data source: bundled JSON feed (public/meetings.json) or an external JSON feed via VITE_JSON_URL
- Dev: pnpm, Vite (dev server + HMR)
- Deploy: build static `dist/` files (CI workflow included for S3 + CloudFront)

## Quick start

1. Install dependencies:

```sh
pnpm install
```

2. Create a `.env` file at the repo root (or set environment variables in your host). Common keys:

```
VITE_JSON_URL        # optional - use an external JSON feed instead of the bundled one
VITE_JSON_URL        # optional - use a JSON feed instead of Google Sheets
VITE_SENTRY_DSN_URL  # optional - sentry DSN for error reporting
VITE_PACKAGE_NAME    # optional - used for release tagging
VITE_PACKAGE_VERSION # optional - used for release tagging
```

3. Run locally:

```sh
pnpm dev
```

### Build and Preview

```sh
pnpm build
pnpm preview
```

### Deployment

- A GitHub Actions workflow (`.github/workflows/deploy-to-s3.yml`) is included to build and sync `dist/` to an S3 bucket and optionally invalidate CloudFront. To use it configure these repository secrets:

  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_REGION
  - S3_BUCKET
  - CLOUDFRONT_DISTRIBUTION_ID (optional)

## Contributing

- See `CONTRIBUTING.md` for development and PR guidelines. Keep changes small and add tests where meaningful.

## License

- Licensed under the MIT License. See `LICENSE` for details.

If you need help mirroring a different meetings source or adapting the feed format, open an issue with a sample payload and expected behavior.

## Preview deploys (GitHub Pages)

- This repository includes an Action that builds the app and publishes `dist/` to the `gh-pages` branch.
- For pushes to `main`, the site is published at the repository root. For pull requests the workflow publishes the build under `gh-pages/pr-<number>` so you can preview changes per-PR.
- To enable GitHub Pages: go to the repository Settings → Pages and set the source to the `gh-pages` branch (root). The Action will populate that branch automatically.

## How to Set Up Your Local Development Environment

### Link Your Data

The application now relies on a JSON feed. By default the app uses the bundled `public/meetings.json` which is copied to the build assets. If you prefer an external JSON feed, set the following environment variable in your build environment or `.env` file:

```
VITE_JSON_URL="https://your-website.org/meetings.json"
```

The JSON must be an array of meeting objects matching the schema shown below. Sentry and release tagging environment variables (optional) are still supported:

```
VITE_SENTRY_DSN_URL  # optional - sentry DSN for error reporting
VITE_PACKAGE_NAME    # optional - used for release tagging
VITE_PACKAGE_VERSION # optional - used for release tagging
```

### Install and Run Locally

1. Clone this repository.
1. In the project directory, run `pnpm install` (or `yarn`/`npm install`) once to install the dependencies.
1. Run `pnpm dev` to start the app in development mode.

### Deploy to your Website

1. In the project directory, run `pnpm build`.
2. Create an archive (ZIP file) of the generated `dist` directory.
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

### Managing Data

The app expects a JSON array of meeting objects (see the "JSON Feed Alternative" section below). Keep times in a consistent timezone and avoid putting times inside the free-text Notes field when possible.

### JSON Feed Alternative

If you would prefer to use a custom JSON feed rather than a Google Sheet, you can use the parameter:

```
VITE_JSON_URL="https://your-website.org/meetings.json"
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
