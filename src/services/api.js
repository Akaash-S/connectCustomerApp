import { supabase } from './supabase';

// Use 10.0.2.2 for Android Emulator, or your local WiFi IP if testing on a physical device.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000/api/v1';

const getHeaders = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    let token = 'mock-token-123';
    
    if (session && session.access_token) {
      token = session.access_token;
    }
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  } catch (error) {
    console.error("Error reading auth token:", error);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer mock-token-123`
    };
  }
};

export const api = {
  // ----- USERS ----- //
  syncUser: async (userData) => {
    let payload = userData;
    
    if (!payload) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        payload = {
          authId: user.id,
          email: user.email,
          fullName: user.user_metadata?.full_name || user.email.split('@')[0],
          avatarUrl: user.user_metadata?.avatar_url || null,
        };
      }
    }

    if (!payload || !payload.authId) {
      console.warn("No user data to sync");
      return null;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch(`${API_BASE_URL}/users/sync`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(id);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: 'Failed to sync user' }));
        throw new Error(errorData.detail || 'Failed to sync user');
      }
      return res.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  },
  getUserProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/users/me`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },
  getUserStats: async () => {
    const res = await fetch(`${API_BASE_URL}/users/me/stats`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
  getUserActivity: async () => {
    const res = await fetch(`${API_BASE_URL}/users/me/activity`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch activity');
    return res.json();
  },
  getMyRequests: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/me/requests`, { headers: await getHeaders() });
      if (!res.ok) return [];
      return res.json();
    } catch (error) {
      return [];
    }
  },
  getJoinedEvents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/me/events`, { headers: await getHeaders() });
      if (!res.ok) return [];
      return res.json();
    } catch (error) {
      return [];
    }
  },
  getSecurityStatus: async () => {
    const res = await fetch(`${API_BASE_URL}/users/me/security`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch security status');
    return res.json();
  },
  revokeSession: async (sessionId) => {
    const res = await fetch(`${API_BASE_URL}/users/me/sessions/${sessionId}/revoke`, { 
      method: 'POST',
      headers: await getHeaders() 
    });
    if (!res.ok) throw new Error('Failed to revoke session');
    return res.json();
  },
  toggleVolunteerMode: async () => {
    const res = await fetch(`${API_BASE_URL}/users/me/toggle-volunteer`, { 
      method: 'POST',
      headers: await getHeaders() 
    });
    if (!res.ok) throw new Error('Failed to toggle volunteer mode');
    return res.json();
  },

  // ----- REQUESTS ----- //
  getRequests: async (limit = 10) => {
    const res = await fetch(`${API_BASE_URL}/requests/?limit=${limit}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch requests');
    return res.json();
  },
  createRequest: async (requestData) => {
    const res = await fetch(`${API_BASE_URL}/requests/`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(requestData)
    });
    if (!res.ok) throw new Error('Failed to create request');
    return res.json();
  },
  getRequestDetails: async (id) => {
    const res = await fetch(`${API_BASE_URL}/requests/${id}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch request details');
    return res.json();
  },
  voteRequest: async (id) => {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/vote`, { 
      method: 'POST',
      headers: await getHeaders() 
    });
    if (!res.ok) throw new Error('Failed to vote for request');
    return res.json();
  },
  donateToRequest: async (id, amount) => {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/donate?amount=${amount}`, { 
      method: 'POST',
      headers: await getHeaders() 
    });
    if (!res.ok) throw new Error('Failed to donate to request');
    return res.json();
  },

  // ----- EVENTS ----- //
  getEvents: async (limit = 10) => {
    const res = await fetch(`${API_BASE_URL}/events/?limit=${limit}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  },
  getEventDetails: async (id) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch event details');
    return res.json();
  },
  joinEvent: async (id) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
      method: 'POST',
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to join event');
    return res.json();
  },

  // ----- AUTH ----- //
  logout: async () => {
    try {
      await supabase.auth.signOut();
      return true;
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  },

  // ----- NGOS ----- //
  getNGOs: async (limit = 10) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ngos/?limit=${limit}`, { headers: await getHeaders() });
      if (!res.ok) return [];
      return res.json();
    } catch (error) {
      return [];
    }
  },
  getNGODetails: async (id) => {
    const res = await fetch(`${API_BASE_URL}/ngos/${id}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch NGO details');
    return res.json();
  }
};
