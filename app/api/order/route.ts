/**
 * Order API Route
 * 
 * Handles POST requests for order form submissions.
 * Validates request body, sends confirmation and notification emails.
 * 
 * Requirements: 5.2, 5.3, 5.5, 6.1, 6.4
 */

import { NextRequest, NextResponse } from 'next/server';
import { orderFormSchema } from '@/lib/validation/formSchemas';
import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email/emailService';
import { OrderFormData } from '@/types/forms';
import { ZodError } from 'zod';

// Force dynamic rendering - no caching for form submissions
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * POST /api/order
 * 
 * Handles order form submissions:
 * 1. Validates request body with Zod schema
 * 2. Sends confirmation email to user
 * 3. Sends notification email to admin
 * 4. Returns success/error response
 * 
 * @param {NextRequest} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with success status
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request body with Zod schema
    const validatedData = orderFormSchema.parse(body);
    
    // Create order form data with timestamp
    const orderData: OrderFormData = {
      ...validatedData,
      timestamp: new Date(),
    };
    
    // Send emails in parallel for better performance
    try {
      await Promise.all([
        sendOrderConfirmation(orderData),
        sendOrderNotification(orderData),
      ]);
    } catch (emailError) {
      // Log email error
      console.error('Email sending failed:', emailError);
      
      // Return 500 error with user-friendly message
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email notifications. Please try again later.',
          error: 'Email delivery failed',
        },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully. You will receive a confirmation email shortly.',
      },
      { status: 200 }
    );
    
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      const zodError = error as ZodError<any>;
      console.error('Validation error:', zodError.issues);
      
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed. Please check your input.',
          errors: zodError.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      console.error('JSON parsing error:', error);
      
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format.',
          error: 'Invalid JSON',
        },
        { status: 400 }
      );
    }
    
    // Handle unexpected errors
    console.error('Unexpected error in order API:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
