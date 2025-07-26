import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

//we will write Quality Code ---> Using OOPS(classes nd Objects)

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    //we are creating a wrapper methods jisme appwrite ki jitni services hai unko wrap kar rahe hai.
    //these are our Services : Modular unit of Functionality

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // If account is created, auto-login
            if (userAccount) {
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("❌ Failed to create account:", error.message);
            
            // Handle specific error for existing user
            if (error.code === 409 || error.message.includes("already exists")) {
                throw new Error("USER_EXISTS");
            }
            
            throw new Error("Signup failed. Please try again.");
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AppwriteService :: login ❌", error.message);
            throw new Error("Login failed. Please check your credentials.");
        }
    }

    async getCurrentUser() {
        try {
            // First ask: "Do I have a login session?"
            await this.account.getSession('current');
            // If yes, then ask: "Who am I?"
            return await this.account.get();
        } catch (error) {
            // If no session exists, that's normal - just return null
            console.log("No user logged in:", error.message);
            return null;
        }
    }

    async logout() {
        try{
            await this.account.deleteSessions();
        } catch(error){
            console.error("Appwrite Service :: logout :: error",error)
        }
    }
}

const authService = new AuthService();   
                      
export default authService; //object



/*
A service is a reusable, modular unit that performs a specific job (like auth, database, storage).
Services abstract the logic so the rest of your app doesn’t need to know how it works — just call it and get results.

If you build your app using custom services like AuthService, 
then your main app logic (the code where you call AuthService.login(...)) stays the same.

🔁 What you’ll have to change?
Only the internal implementation inside the service file (e.g., AuthService.js).

📦 Benefit
You’re not locked into Appwrite or Firebase — you can swap platforms by only changing one file instead of your entire app.
That's clean architecture.
*/