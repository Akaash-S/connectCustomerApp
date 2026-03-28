import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from './supabase';
import { api } from './api';

// Tells the browser to return to the app after the OAuth flow
WebBrowser.maybeCompleteAuthSession();

export const auth = {
  signInWithGoogle: async () => {
    try {
      const redirectUrl = Linking.createURL('/auth/callback');
      console.log("Redirecting to Supabase with return URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true, // We will handle opening the browser
        },
      });

      if (error) throw error;

      // Open the browser and wait for it to return
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

      if (result.type === 'success' && result.url) {
        // Extract the tokens from the URL
        const { queryParams } = Linking.parse(result.url);
        // Supabase returns tokens in the URL fragment (#access_token=...)
        // But Linking.parse might handle it depending on the platform.
        // We might need to manually parse the fragment if queryParams is empty.
        
        let access_token = queryParams?.access_token;
        let refresh_token = queryParams?.refresh_token;

        if (!access_token && result.url.includes('#')) {
          const fragment = result.url.split('#')[1];
          const parts = new URLSearchParams(fragment);
          access_token = parts.get('access_token');
          refresh_token = parts.get('refresh_token');
        }

        if (access_token && refresh_token) {
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (sessionError) throw sessionError;

          // Sync with backend
          await api.syncUser();

          return sessionData;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};
