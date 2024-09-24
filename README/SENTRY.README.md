# Sentry Setup

### Create an account on [Sentry.io](https://sentry.io):

1. Sign up or log in to your account on [Sentry.io](https://sentry.io).
2. Once logged in, create a new project for your application.

### Installation:

1. Retrieve your Sentry DSN (Data Source Name) from your project settings.
2. Edit your environment variable:

    - Set `NEXT_PUBLIC_SENTRY_DSN` in your environment variables with your Sentry DSN value.

3. Example:

   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
