export async function login(username: string, password: string) {
    const res = await fetch("https://localhost:7023/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error("Invalid credentials");

    return await res.json(); 
}