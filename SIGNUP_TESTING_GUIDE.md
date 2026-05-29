# Admin Signup Testing Guide

## Issue Fixed
The admin signup page was redirecting immediately back to login instead of allowing account creation. This was caused by:
1. RLS policies on the admins table that didn't allow unauthenticated users to insert their profile
2. Missing error handling to show what went wrong

## What Was Fixed

### 1. Updated RLS Policies
Changed the admins table policies from requiring admin access to allowing any authenticated user to:
- INSERT their own profile during signup
- SELECT their own profile
- UPDATE their own profile

### 2. Enhanced Error Handling
- Added console logging for debugging (`console.log("[v0] ...")`)
- Form now validates all fields before submission
- Clear error messages for each validation failure
- Success message before redirect

### 3. Improved Form Validation
- Name required
- Email required (email format validation)
- Password minimum 6 characters
- Passwords must match
- Disable form while loading

## How to Test

### Step 1: Visit Signup Page
```
https://v0-indiajobservice-rust.vercel.app/admin/signup
```

### Step 2: Create Admin Account
Fill in the form with:
- **Name**: Your Name
- **Email**: unique-email@example.com (must be unique)
- **Password**: SecurePassword123 (min 6 chars)
- **Confirm Password**: SecurePassword123 (must match)

Click "Sign Up" button.

### Step 3: Verify Signup Works
You should see:
1. "Creating account..." while loading
2. Green success message: "Account created successfully! Redirecting to login..."
3. Auto-redirect to login page after ~1.5 seconds

### Step 4: Login with New Account
1. You'll be on the login page
2. Enter your email and password
3. Click "Sign In"
4. You should now see the Admin Dashboard

### Step 5: Verify Admin Access
On dashboard you should see:
- Admin name and email in header
- Logout button
- Vacancy statistics (0 total, 0 published, 0 drafts)
- Buttons to "Add Vacancy" and "Upload PDF"
- Message: "No vacancies yet. Create one to get started!"

## Testing Different Scenarios

### Scenario 1: Form Validation
Try submitting with empty fields:
- Empty name → "Name is required"
- Empty email → "Email is required"
- Password too short → "Password must be at least 6 characters"
- Passwords don't match → "Passwords do not match"

### Scenario 2: Duplicate Email
Try signing up with an email you already used:
- You'll get an error like "User already registered"
- Error will display on the form
- Form stays open so you can try again

### Scenario 3: Invalid Email Format
Try an invalid email:
- Form will validate on submission
- Should get error about invalid email format

### Scenario 4: Successful Flow
1. Use a new unique email
2. Fill all fields correctly
3. Click Sign Up
4. See success message
5. Auto-redirect to login
6. Login successfully
7. See admin dashboard

## Browser Console Debugging

Open DevTools (F12) and go to Console tab. You'll see logs like:
```
[v0] Signup result: { success: true, user: {...}, message: '...' }
```

Or if error:
```
[v0] Signup error: User already registered
```

These logs help diagnose issues.

## If Signup Still Doesn't Work

### Check 1: RLS Policies
The database policies should allow users to create their own admin profile. If signup fails, the policies might not have applied correctly.

### Check 2: Supabase Connection
- Ensure Supabase environment variables are set
- Check Supabase project is connected
- Verify database is accessible

### Check 3: Email Validation
Supabase requires valid emails by default. Make sure:
- Email format is valid (example@domain.com)
- Email is unique (not used before)
- No typos in email

### Check 4: Password Requirements
- Minimum 6 characters
- No special requirements (but good practice to use varied chars)

## Production URL
```
https://v0-indiajobservice-rust.vercel.app/admin/signup
```

## Next Steps After Signup Works

1. Create multiple admin accounts for testing
2. Create test vacancies
3. Upload test PDFs
4. Publish vacancies
5. Test public job listing view
6. Test login with different accounts

---

**If you encounter any issues during signup testing, check the browser console for detailed error messages.**
