'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Regular client for auth operations
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client for admin operations (can bypass RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function signUpAdmin(email: string, password: string, name: string) {
  try {
    console.log("[v0] Starting signup for:", email)
    
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, is_admin: true }
      }
    })

    console.log("[v0] Auth signup result:", { error: authError, userId: authData.user?.id })

    if (authError) throw authError
    if (!authData.user?.id) throw new Error('Failed to create user')

    // Create admin profile in admins table using service role (bypasses RLS)
    const { data: insertData, error: profileError } = await supabaseAdmin
      .from('admins')
      .insert([
        {
          id: authData.user.id,
          email,
          name
        }
      ])
      .select()

    console.log("[v0] Admin profile insert result:", { error: profileError, data: insertData })

    if (profileError) {
      // If admin profile fails, delete the user
      console.error("[v0] Profile creation failed, cleaning up")
      throw profileError
    }

    return { success: true, user: authData.user, message: 'Admin account created successfully!' }
  } catch (error) {
    const errorMessage = (error as Error).message
    console.error("[v0] Signup error:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    if (!data.user?.id) throw new Error('No user returned')

    // Verify user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('id, email, name')
      .eq('id', data.user.id)
      .single()

    if (adminError || !adminData) {
      // User is not an admin - sign them out
      await supabase.auth.signOut()
      throw new Error('Only admins can access this panel')
    }

    return { 
      success: true, 
      user: data.user, 
      session: data.session, 
      isAdmin: true,
      adminName: adminData.name
    }
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
      .select('id, name, email')
      .eq('id', data.session.user.id)
      .single()

    const isAdmin = !adminError && !!adminData

    return { session: data.session, isAdmin, admin: adminData }
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
