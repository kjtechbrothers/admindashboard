import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const API_KEY = process.env.GOOGLE_AI_API_KEY;

export async function POST(req: Request) {
  try {
    const { prompt, tenantId, role } = await req.json();

    const [employeesRes, analyticsRes] = await Promise.all([
      supabase.from('employees').select('name, role, status').eq('tenant_id', tenantId),
      supabase.from('analytics').select('*').eq('tenant_id', tenantId)
    ]);

    const employeeList = employeesRes.data || [];
    const stats = analyticsRes.data?.[0];

    const systemContext = `You are the DigitalSoft ERP AI. 
    Current Company Data: 
    - Staff Count: ${employeeList.length} 
    - Staff List: ${JSON.stringify(employeeList)}
    - Revenue: $${stats?.revenue || 0}
    - Orders: ${stats?.orders || 0}
    
    User Question: ${prompt}`;

    // 1. UPDATED URL: Changed /v1/ to /v1beta/ 
    // 2. UPDATED MODEL: Using gemini-2.5-flash as your Dart code suggested
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemContext }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Google API Error:", data.error);
      
      // FALLBACK: If 2.5-flash is not found, try the standard 1.5-flash with v1beta
      if (data.error.code === 404) {
         const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
         const fbResponse = await fetch(fallbackUrl, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ contents: [{ parts: [{ text: systemContext }] }] })
         });
         const fbData = await fbResponse.json();
         if (fbData.candidates) {
            return NextResponse.json({ response: fbData.candidates[0].content.parts[0].text });
         }
      }
      return NextResponse.json({ response: "Neural Link Error: " + data.error.message });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ response: aiResponse });

  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ response: "Intelligence stream interrupted." }, { status: 500 });
  }
}