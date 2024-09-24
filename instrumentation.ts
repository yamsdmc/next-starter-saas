export function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        require("./sentry.server.config.js");
    } else {
        require("./sentry.client.config.js");
    }
}