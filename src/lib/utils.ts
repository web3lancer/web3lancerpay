// Utility function for class names
export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

// Utility function to format currency
export function formatCurrency(value: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(value);
}

// Utility function to format date
export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

// Utility function to format time
export function formatTime(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}
// Utility function to format date and time
export function formatDateTime(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}
// Utility function to format number
export function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
}
// Utility function to format percentage
export function formatPercentage(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
// Utility function to format phone number
export function formatPhoneNumber(value: string) {
    const phoneNumber = value.replace(/\D/g, "");
    const countryCode = phoneNumber.slice(0, 3);
    const areaCode = phoneNumber.slice(3, 6);
    const localNumber = phoneNumber.slice(6);
    return `+${countryCode} (${areaCode}) ${localNumber}`;
}
// Utility function to format email
export function formatEmail(value: string) {
    const email = value.trim().toLowerCase();
    return email;
}
// Utility function to format address
export function formatAddress(value: string) {
    const address = value.trim();
    return address;
}
// Utility function to format URL
export function formatURL(value: string) {
    const url = value.trim();
    return url;
}
// Utility function to format IP address
export function formatIPAddress(value: string) {
    const ipAddress = value.trim();
    return ipAddress;
}