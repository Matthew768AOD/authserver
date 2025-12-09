export async function getQuotes(token: string) {
    const res = await fetch("https://localhost:7136/api/Quotes", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    return await res.json();
}