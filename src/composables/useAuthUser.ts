import { Provider } from "@supabase/supabase-js";
import useSupabase from "./useSupabase";
import { ref } from "vue";
import { User } from "@supabase/supabase-js";

export default function useAuthUser() {

    const { supabase } = useSupabase();
    const currUser = ref<User|null>(null)

    supabase.auth.onAuthStateChange((event, session) => {
        // if the user exists in the session we're logged in
        // and we can set our user reactive ref
      currUser.value = session?.user || null;
    });
    
    /**
     * Login with google, github, etc
     */
    const login = async (provider: Provider) => {
        const { user, session, error } = await supabase.auth.signIn({ provider });
        if (error) throw error;
    };

    /**
     * Logout
     */
    const logout = async () => {    
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        currUser.value = null
    };

    const currentUser = async () => {
        currUser.value = supabase.auth.user()
    }

    return {
        user: currUser,
        login,
        logout,
    };
}