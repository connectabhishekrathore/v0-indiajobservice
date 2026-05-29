// API Route for AI-Powered PDF Extraction
// Location: app/api/extract-pdf/route.ts
// Usage: Upload PDF → Extract Text → Call AI → Get Structured Data

/*

import { NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import * as pdfjs from 'pdfjs-dist'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const VacancySchema = z.object({
  job_title: z.string().describe('Job title or position name'),
  company_name: z.string().describe('Company or organization name'),
  location: z.string().describe('Job location/city'),
  state: z.string().describe('Indian state where job is located'),
  salary_range_min: z.number().optional().describe('Minimum salary in rupees'),
  salary_range_max: z.number().optional().describe('Maximum salary in rupees'),
  application_deadline: z.string().optional().describe('Application deadline date'),
  application_link: z.string().optional().describe('URL to apply'),
  eligibility: z.object({
    qualifications: z.array(z.string()).describe('Required qualifications/degrees'),
    age_limit: z.string().optional().describe('Age limit/range'),
    experience_required: z.string().optional().describe('Years of experience required')
  }).optional(),
  selection_process: z.object({
    exam_details: z.string().optional().describe('Exam name, duration, pattern'),
    interview_details: z.string().optional().describe('Interview process details')
  }).optional(),
  description: z.string().optional().describe('Job description')
})

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdf = await pdfjs.getDocument({ data: buffer }).promise
    let text = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      text += textContent.items.map((item: any) => item.str).join(' ')
      text += '\n'
    }

    return text
  } catch (error) {
    throw new Error(`PDF extraction failed: ${(error as Error).message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Extract text from PDF
    const pdfText = await extractTextFromPDF(buffer)

    if (!pdfText.trim()) {
      return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 })
    }

    // Use Claude to structure the extracted text
    const { object } = await generateObject({
      model: anthropic('claude-opus'),
      schema: VacancySchema,
      prompt: `
        Extract and structure job vacancy information from the following PDF text.
        Be accurate and extract only information present in the document.
        For Indian states, use the official state names.
        
        PDF Content:
        ${pdfText}
        
        Please extract all relevant job posting details into the specified structure.
      `
    })

    return NextResponse.json({
      success: true,
      data: object
    })
  } catch (error) {
    console.error('PDF extraction error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

*/

// Frontend Usage in Vacancy Creation Form
// Location: app/admin/vacancies/new/page.tsx (partial example)

/*

import { useState } from 'react'
import { extractVacancyDataFromPDF } from '@/lib/pdf'

export default function NewVacancyPage() {
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractedData, setExtractedData] = useState(null)

  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsExtracting(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setExtractedData(result.data)

        // Auto-fill form with extracted data
        setFormData(prev => ({
          ...prev,
          ...result.data,
          eligibility: result.data.eligibility || prev.eligibility,
          selection_process: result.data.selection_process || prev.selection_process
        }))

        alert('PDF extracted successfully! Review and adjust the details as needed.')
      } else {
        alert(`Extraction failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Error extracting PDF:', error)
      alert('Failed to extract PDF. Please try again.')
    }

    setIsExtracting(false)
  }

  return (
    // ... form JSX
    <div>
      <label htmlFor="pdf">
        Upload Vacancy PDF (AI will extract details)
      </label>
      <input
        id="pdf"
        type="file"
        accept=".pdf"
        onChange={handlePdfFileChange}
        disabled={isExtracting}
      />
      {isExtracting && <p>Extracting PDF data...</p>}
      {extractedData && (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p>Data extracted from PDF. Review and edit below before submitting.</p>
        </div>
      )}
    </div>
  )
}

*/

// Installation Instructions
/*

1. Install required packages:
   pnpm add @ai-sdk/anthropic pdf-parse

2. Set environment variable:
   ANTHROPIC_API_KEY=your_anthropic_api_key

3. Create the API route as shown above

4. Import and use in your form component

5. Test with a sample job vacancy PDF

*/

// For Razorpay Payment Integration
// Location: app/api/razorpay/create-order/route.ts

/*

import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt, description } = await request.json()

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      description
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency
    })
  } catch (error) {
    console.error('Razorpay error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

*/

// Frontend Razorpay Integration Example
// Location: components/PaymentButton.tsx

/*

'use client'

import { useState } from 'react'

interface PaymentButtonProps {
  amount: number
  description: string
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

export default function PaymentButton({
  amount,
  description,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Create order
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          description
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) throw new Error(orderData.error)

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'India Job Service',
        description: description,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          // Verify payment on server
          const verifyResponse = await fetch('/api/razorpay/verify', {
            method: 'POST',
            body: JSON.stringify({
              orderId: orderData.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            })
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            onSuccess(response.razorpay_payment_id)
          } else {
            onError('Payment verification failed')
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com'
        },
        theme: {
          color: '#2563eb'
        }
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      onError((error as Error).message)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  )
}

*/

export const apiExamples = {
  pdfExtraction: "See commented code above for AI PDF extraction",
  razorpayPayment: "See commented code above for Razorpay integration",
  installation: "Run: pnpm add @ai-sdk/anthropic pdf-parse razorpay"
}
