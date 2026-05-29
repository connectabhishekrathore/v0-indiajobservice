'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function AdminSignupDebugPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<Array<{ type: string; message: string; data?: any }>>([])

  const addLog = (type: string, message: string, data?: any) => {
    console.log(`[DEBUG] ${type}: ${message}`, data)
    setLogs(prev => [...prev, { type, message, data }])
  }

  const handleDebugSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogs([])
    setLoading(true)

    try {
      addLog('INFO', 'Starting signup debug for email: ' + email)

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      addLog('CONFIG', 'Supabase configuration', {
        url: supabaseUrl,
        keyLength: supabaseAnonKey?.length || 0
      })

      if (!supabaseUrl || !supabaseAnonKey) {
        addLog('ERROR', 'Missing Supabase environment variables')
        return
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      addLog('INFO', 'Supabase client created')

      // Step 1: Sign up
      addLog('STEP', 'Step 1: Calling supabase.auth.signUp')
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, is_admin: true }
        }
      })

      addLog('RESULT', 'Auth signup response', {
        error: authError,
        userId: authData.user?.id,
        email: authData.user?.email,
        confirmed: authData.user?.email_confirmed_at
      })

      if (authError) {
        addLog('ERROR', 'Auth signup failed: ' + authError.message, authError)
        return
      }

      if (!authData.user?.id) {
        addLog('ERROR', 'No user ID returned from signup')
        return
      }

      addLog('SUCCESS', 'User created in auth.users', { userId: authData.user.id })

      // Step 2: Wait for trigger
      addLog('STEP', 'Step 2: Waiting 2 seconds for database trigger to execute')
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Step 3: Verify admin record exists
      addLog('STEP', 'Step 3: Checking if admin record was created')
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      addLog('RESULT', 'Admin table query response', {
        error: adminError,
        data: adminData
      })

      if (adminError) {
        addLog('WARNING', 'Admin record not found or query error: ' + adminError.message, adminError)
      } else if (adminData) {
        addLog('SUCCESS', 'Admin record exists in database', adminData)
      } else {
        addLog('WARNING', 'No admin record found')
      }

      // Step 4: Try manual insert as fallback
      addLog('STEP', 'Step 4: Attempting manual admin record insert as verification')
      const { data: insertData, error: insertError } = await supabase
        .from('admins')
        .insert([{ id: authData.user.id, email, name }])
        .select()

      addLog('RESULT', 'Manual insert response', {
        error: insertError?.message,
        data: insertData
      })

      if (insertError) {
        addLog('INFO', 'Manual insert error (may be expected if trigger worked): ' + insertError.message)
      } else {
        addLog('INFO', 'Manual insert succeeded', insertData)
      }

      addLog('COMPLETE', 'Signup debug complete', {
        authUserId: authData.user.id,
        adminExists: !!adminData
      })
    } catch (err) {
      addLog('ERROR', 'Unexpected error: ' + (err as Error).message, err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Signup Debug</h1>
        <p className="text-foreground/60 mb-8">Detailed signup flow with all responses shown</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Signup Form</h2>
              <form onSubmit={handleDebugSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Start Debug Signup'}
                </button>
              </form>
            </div>
          </div>

          {/* Logs */}
          <div className="lg:col-span-2">
            <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6 max-h-[600px] overflow-y-auto">
              <h2 className="text-lg font-semibold text-foreground mb-4 sticky top-0 bg-foreground/5">
                Debug Output ({logs.length})
              </h2>

              {logs.length === 0 ? (
                <p className="text-foreground/60">Fill out the form and click "Start Debug Signup" to see detailed logs here</p>
              ) : (
                <div className="space-y-3">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-sm font-mono ${
                        log.type === 'ERROR'
                          ? 'bg-destructive/10 border-destructive/20 text-destructive'
                          : log.type === 'SUCCESS'
                          ? 'bg-secondary/10 border-secondary/20 text-secondary'
                          : log.type === 'WARNING'
                          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-500'
                          : log.type === 'STEP'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-500'
                          : 'bg-foreground/5 border-foreground/10 text-foreground'
                      }`}
                    >
                      <div className="font-bold">[{log.type}] {log.message}</div>
                      {log.data && (
                        <pre className="mt-2 text-xs overflow-x-auto opacity-75">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-700 dark:text-blue-500">
          <p className="text-sm">
            <strong>Debug Instructions:</strong> This page shows exactly what happens during signup. Each step is logged with full responses. Use this to identify where the signup flow is failing.
          </p>
        </div>
      </div>
    </main>
  )
}
