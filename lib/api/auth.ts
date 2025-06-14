import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export const authApi = {
  async signUp({ email, password, firstName, lastName }: SignUpData): Promise<User> {
    try {
      // Create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Update profile with name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })

      return user
    } catch (error: any) {
      console.error('Signup error:', error)
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("An account with this email already exists")
      } else if (error.code === 'auth/invalid-email') {
        throw new Error("Invalid email address")
      } else if (error.code === 'auth/weak-password') {
        throw new Error("Password is too weak")
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error("Invalid credentials")
      } else {
        throw new Error(error.message || "Failed to create account")
      }
    }
  },

  async signIn({ email, password }: SignInData) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user }
    } catch (error: any) {
      console.error('Sign in error:', error)
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.')
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.')
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address')
      } else {
        throw new Error('Failed to sign in. Please try again.')
      }
    }
  },

  async signOut() {
    try {
      await signOut(auth)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  getCurrentUser(): User | null {
    const user = auth.currentUser
    console.log('Current user:', user ? { uid: user.uid, email: user.email } : null)
    return user
  }
}

export const adminApi = {
  async login(credentials: AdminCredentials) {
    try {
      console.log('Login attempt:', {
        username: credentials.username,
        providedPassword: credentials.password,
        expectedPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      });
      
      if (credentials.username === 'admin' && credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        const token = btoa(JSON.stringify({ username: credentials.username, timestamp: Date.now() }));
        // Set cookie instead of localStorage
        document.cookie = `adminToken=${token}; path=/; max-age=${24 * 60 * 60}`; // 24 hours
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  },

  isAdminAuthenticated() {
    try {
      const cookies = document.cookie.split(';');
      const adminToken = cookies.find(cookie => cookie.trim().startsWith('adminToken='));
      
      if (!adminToken) return false;
      
      const token = adminToken.split('=')[1];
      const decoded = JSON.parse(atob(token));
      return Date.now() - decoded.timestamp < 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },

  logout() {
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}; 