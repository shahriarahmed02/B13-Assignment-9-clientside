'use client';
import { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/firebase.config';

// Create Auth Context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Create User (Register)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Sign In with Email/Password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. Update User Profile (Name & Photo)
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    // 5. Log Out
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Monitor Auth State Change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log('Current User State:', currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Context Value Data Pass
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        updateUserProfile,
        logOutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;