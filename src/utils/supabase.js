import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://akmujtwxisqsthixmnww.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbXVqdHd4aXNxc3RoaXhtbnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMjk2NDEsImV4cCI6MjAwNTYwNTY0MX0.IZ4k-axrTiDz8ni5Ilj-zch74-d4BPWYjhge-H2B118";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
