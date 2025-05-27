/* eslint-disable no-unused-vars */
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, updateProfile } from "@/lib/firebase";
import {
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // for initial load

    const signupWithEmailPassword = async (email, password, name) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            setUser({
                ...userCredential.user,
                displayName: name // Explicitly set displayName
            });
            return userCredential;
        } catch (error) {
            throw error; // let the UI handle this
        }
    };

    const loginWithEmailPassword = async (email, password) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error; // let the UI handle this
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });



        return () => unsubscribe(); // cleanup
    }, []);

    const logout = () => signOut(auth);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google sign-in error:", error.message);
            // Optional: show toast or popup error here

        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                loginWithGoogle,
                signupWithEmailPassword,
                loginWithEmailPassword,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
