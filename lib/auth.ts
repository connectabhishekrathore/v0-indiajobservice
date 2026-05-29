'use server'

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

    // Verify user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('id, email')
      .eq('id', data.user?.id)
      .single()

    if (adminError || !adminData) {
      // User is not an admin - sign them out
      await supabase.auth.signOut()
      throw new Error('Only admins can access this panel')
    }

    return { success: true, user: data.user, session: data.session, isAdmin: true }
  } catch (error) {
    return { success: false, error: (error as Error).message, isAdmin: false }
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

    if (!data.session?.user?.id) {
      return { session: null, isAdmin: false }
    }

    // Verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('id')
      .eq('id', data.session.user.id)
      .single()

    const isAdmin = !adminError && !!adminData

    return { session: data.session, isAdmin }
  } catch (error) {
    return { session: null, isAdmin: false, error: (error as Error).message }
  }
}

export async function isAdminUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user?.id) return false

    const { data: adminData, error } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .single()

    return !error && !!adminData
  } catch (error) {
    return false
  }
}
