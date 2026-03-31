import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_PORTAL_ID = '46681098';
const HUBSPOT_FORM_ID = 'bc68d211-1b15-44fc-9f71-088c75809742';
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstname, email, phone, company, website, message } = body;

        if (!email || !firstname) {
            return NextResponse.json(
                { success: false, error: 'Email và tên là bắt buộc' },
                { status: 400 }
            );
        }

        const hubspotData = {
            fields: [
                { name: 'firstname', value: firstname },
                { name: 'email', value: email },
                ...(phone ? [{ name: 'phone', value: phone }] : []),
                ...(company ? [{ name: 'company', value: company }] : []),
                ...(website ? [{ name: 'website', value: website }] : []),
                ...(message ? [{ name: 'message', value: message }] : []),
            ],
            context: {
                pageUri: request.headers.get('referer') || '',
                pageName: 'Contact Form',
            },
        };

        const hubspotResponse = await fetch(HUBSPOT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hubspotData),
        });

        const hubspotResult = await hubspotResponse.json();

        if (hubspotResponse.ok) {
            return NextResponse.json({ success: true, data: hubspotResult });
        } else {
            console.error('HubSpot API Error:', hubspotResult);
            return NextResponse.json(
                { success: false, error: hubspotResult.message || 'Lỗi từ HubSpot API' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi server internal' },
            { status: 500 }
        );
    }
}
