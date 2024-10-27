import filter from "../filter";
import eq from "../eq";

export function producerLogin(email, password, role, credentials) {
    if (!email || !password) {
        return { success: false, message: "Invalid credentials" };
    }

    const matchCredentials = filter(
        credentials,
        (cred) => eq(cred.email, email) && eq(cred.password, password) && eq(cred.role, role)
    );

    if (matchCredentials.length !== 0 && matchCredentials[0].length !== 0) {
        return { success: true, message: "Login success" };
    } else {
        return { success: false, message: "Invalid credentials" };
    }
}