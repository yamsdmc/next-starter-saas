import dayjs, { Dayjs, ManipulateType, OpUnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

type DateManagerType = string | number | Date | DateManager | null | undefined | Dayjs;

/**
 * A wrapper class for date manipulation using day.js library
 */
export class DateManager {
    private date: Dayjs;

    constructor(date?: DateManagerType, format?: string) {
        this.date = this.initializeDate(date, format);

        if (!this.date.isValid()) {
            throw new Error('Invalid date');
        }
    }

    private initializeDate(date?: DateManagerType, format?: string): Dayjs {
        if (date === null || date === undefined) {
            return dayjs();
        } else if (Number.isInteger(date)) {
            return dayjs.unix(date as number);
        } else if (date instanceof DateManager) {
            return dayjs(date.toDate);
        } else if (typeof date === 'string') {
            return dayjs(date, format);
        }
        return dayjs(date);
    }

    format(format?: string): string {
        return this.date.format(format);
    }

    startOf(unit: OpUnitType): this {
        this.date = this.date.startOf(unit);
        return this;
    }
    endOf(unit: OpUnitType): this {
        this.date = this.date.endOf(unit);
        return this;
    }

    isBefore(dateToCompare?: Date | string): boolean {
        const comparedDateManager = new DateManager(dateToCompare);
        return this.date.isBefore(comparedDateManager.date);
    }

    subtract(amount: number, unit: ManipulateType): this {
        this.date = this.date.subtract(amount, unit);
        return this;
    }

    day(): number {
        return this.date.day();
    }

    diff(dateToCompare: Date | string | DateManager | Dayjs, unit: dayjs.OpUnitType): number {
        let comparedDate: dayjs.Dayjs;

        if (dateToCompare instanceof DateManager) {
            comparedDate = dateToCompare.dayjsInstance;
        } else {
            comparedDate = dayjs(dateToCompare);
        }
        return this.date.diff(comparedDate, unit);
    }
    get dayjsInstance(): dayjs.Dayjs {
        return this.date;
    }

    get toDate(): Date {
        return this.date.toDate();
    }

    toString(): string {
        return this.date.toString();
    }

    add(amount: number, unit: ManipulateType): this {
        this.date = this.date.add(amount, unit);
        return this;
    }

    /**
     * Returns the number of seconds since the Unix Epoch.
     * exemple: 1633350000
     */
    unix(): number {
        return this.date.unix();
    }
}
