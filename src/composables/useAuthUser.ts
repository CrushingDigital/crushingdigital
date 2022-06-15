import { Provider } from "@supabase/supabase-js";
import useSupabase from "./useSupabase";
import { ref } from "vue";
import { User } from "@supabase/supabase-js";

const user = ref<User|null>(null)

export default function useAuthUser() {

    const { supabase } = useSupabase();
    
    /**
     * Login with google, github, etc
     */
    const login = async (provider: Provider) => {
        const { user, error } = await supabase.auth.signIn({ provider });
        if (error) throw error;
    };

    /**
     * Logout
     */
    const logout = async () => {    
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const isLoggedIn = async () => {
        return !!user.value;
    }

    return {
        user,
        login,
        logout,
        isLoggedIn
    };
}