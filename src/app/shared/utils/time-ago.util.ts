export function timeAgo(dateStringUtc: Date): string {
    const dateUtc = new Date(dateStringUtc);

    const offsetInSec = dateUtc.getTimezoneOffset() * 60;
    const date = new Date(dateUtc);
    const now = new Date();

    const diffInSecondsNew = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInSeconds = Math.floor(diffInSecondsNew + offsetInSec)

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    switch (true) {
        case diffInSeconds < 60:
            return 'just now';
        case minutes < 60:
            return `${minutes}m ago`;
        case hours < 24:
            return `${hours}h ago`;
        case days < 7:
            return `${days}d ago`
        case weeks < 4:
            return `${weeks}w ago`
        default:
            return date.toLocaleDateString("DD/MM/YYYY")
    }

}