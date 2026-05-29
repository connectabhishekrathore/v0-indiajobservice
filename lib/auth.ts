import { supabase } from '@/lib/supabase'

export async function signUpAdmin(email: string, password: string, name: string) {
  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (authError) throw authError

    // Create admin profile
    const { error: profileError } = await supabase
      .from('admins')
      .insert([
        {
          id: authData.user?.id,
          email,
          name
        }
      ])

    if (profileError) throw profileError

    return { success: true, user: authData.user }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return { success: true, user: data.user, session: data.session }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function signOutAdmin() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function getAdminSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session: data.session }
  } catch (error) {
    return { session: null, error: (error as Error).message }
  }
}
