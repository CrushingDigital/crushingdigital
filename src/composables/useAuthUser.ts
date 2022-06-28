import { Provider } from "@supabase/supabase-js";
import useSupabase from "./useSupabase";
import { ref } from "vue";
import { User } from "@supabase/supabase-js";
import { exit } from "process";

const user = ref<User|null>(null)

export default function useAuthUser() {

    const { supabase } = useSupabase();

    /**
     * Login with google, github, etc
     */
    const login = async (provider: Provider) => {
        const redirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL
        console.log(redirectUrl)
        const { user, error } = await supabase.auth.signIn({ provider }, redirectUrl ? { redirectTo: redirectUrl } : undefined);
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