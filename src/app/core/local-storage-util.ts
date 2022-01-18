export class LocalStorageUtil {
    public static readonly APP_NAME = 'efmc'
    public static readonly JWT_KEY = 'jwtKey'

    public static setItem(key: string, value: string): void {
        let items = window.localStorage.getItem(this.APP_NAME)
        if (items === null) {
            let itemsTmp = {
                [key]: value
            }
            window.localStorage.setItem(this.APP_NAME, JSON.stringify(itemsTmp))
        } else {
            let itemsTmp = JSON.parse(items)
            itemsTmp[key] = value;
            window.localStorage.setItem(this.APP_NAME, JSON.stringify(itemsTmp))
        }
    }

    public static getItem(key: string): string {
        const items = window.localStorage.getItem(this.APP_NAME);
        if (items == null) {
            return undefined;
        } else {
            const itemsTmp = JSON.parse(items);
            return String(itemsTmp[key])
        }
    }

    public static clearItems(): void {
        window.localStorage.removeItem(this.APP_NAME);
    }
}
