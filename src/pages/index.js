import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        console.log("✅ Logged in as:", user.user_metadata?.name);

        // 🔥 Save user and update last_login timestamp
        const { error } = await supabase.from('users').upsert(
          {
            id: user.id,
            email: user.email,
            username: user.user_metadata?.name || user.email,
            avatar_url: user.user_metadata?.avatar_url,
            last_login: new Date().toISOString(), // 👈 this updates every login
          },
          { onConflict: 'id' } // Only insert if not exists; otherwise update
        );

        if (error) {
          console.error("❌ Failed to save user:", error.message);
        } else {
          console.log("✅ User data upserted, last_login updated.");
        }
      }
    };

    getUser();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Supabase Google Login</h1>

      {user ? (
        <>
          <p>Welcome, {user.user_metadata?.name}</p>
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                marginTop: 10,
              }}
            />
          )}
          <br />
          <button onClick={signOut} style={{ marginTop: 20 }}>
            Sign out
          </button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </main>
  );
}
