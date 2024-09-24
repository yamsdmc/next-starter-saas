# API Routes Explanation

### Authentication Routes:

- **`/api/auth/login`**: This route handles user login via Auth0.
- **`/api/auth/logout`**: This route logs the user out of the application.
- **`/api/auth/signup`**: This route registers a new user with Auth0.
- **`/api/auth/me`**: This route retrieves the authenticated user's profile information.

### Payment Routes:

- **`/api/payment/cancel-subscription`**: Cancels the connected user's Stripe subscription by scheduling it to end at the conclusion of the current billing period.
- **`/api/payment/checkout_session`**: Creates a Stripe checkout session for the user's subscription, returning a redirect URL to the Stripe payment page.
- **`/api/payment/create-portal-session`**: Allows the connected user to access the Stripe customer portal to manage their subscriptions and billing information.
- **`/api/payment/reactive-subscription`**: Enables a connected user to reactivate their Stripe subscription that was previously canceled, effective at the end of the current billing period.
- **`/api/payment/subscription`**: Retrieves payment details for the connected user, including their Stripe invoices and subscriptions.
- **`/api/payment/webhooks`**: Handles Stripe webhooks to process events like `checkout.session.completed` and `invoice.paid` (with the potential to implement others), allowing the system to automatically respond to successful payments and subscriptions.
