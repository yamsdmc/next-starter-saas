import * as Sentry from '@sentry/nextjs';
import { CaptureContext } from '@sentry/types';

export class ErrorMonitoring {
    static captureException(e: unknown, captureContext?: CaptureContext): string {
        const contextWithTimestamp = {
            ...captureContext,
            tags: {
                ...(captureContext as any)?.tags,
                timestamp: new Date().toISOString()
            }
        } as CaptureContext;

        return Sentry.captureException(e, contextWithTimestamp);
    }
}