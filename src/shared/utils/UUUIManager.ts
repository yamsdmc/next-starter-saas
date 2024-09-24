import {v4 as uuidv4, validate as isUUID} from 'uuid';

/**
 * Utility class for UUID operations
 */
export class UUIDManager {
    static generate(): string {
        return uuidv4();
    }

    static isValid(uuid: string): boolean {
        return isUUID(uuid);
    }
}