import blocklist from "./blocklist.json" assert { type: "json" };

export default function isUriBlocked(uri) {
    const domain = new URL(uri).hostname;
    return blocklist[domain] || false;
}
