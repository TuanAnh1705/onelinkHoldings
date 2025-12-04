import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
// ✅ Thay đổi URL từ create endpoint sang batch upsert endpoint
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstname, email, phone, company, website, message } = body;

        // Validate required fields
        if (!email || !firstname) {
            return NextResponse.json(
                { success: false, error: 'Email và tên là bắt buộc' },
                { status: 400 }
            );
        }

        
        const hubspotData = {
            inputs: [{
                idProperty: "email",    
                id: email,              
                properties: {
                    email: email,
                    firstname: firstname,
                    ...(phone && { phone: phone }),
                    ...(company && { company: company }),
                    ...(website && { website: website }),
                    ...(message && { message: message }),
                }
            }]
        };

        console.log('Sending to HubSpot Upsert:', JSON.stringify(hubspotData, null, 2));

        // Send to HubSpot
        const hubspotResponse = await fetch(HUBSPOT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            },
            body: JSON.stringify(hubspotData),
        });

        const hubspotResult = await hubspotResponse.json();
        console.log('HubSpot Response:', hubspotResult);

        if (hubspotResponse.ok) {
            // ✅ Upsert endpoint trả về array results
            const contact = hubspotResult.results?.[0];
            const isNewContact = contact?.new || false;
            const action = isNewContact ? 'created' : 'updated';
            
            return NextResponse.json({ 
                success: true, 
                data: contact,
                message: `Contact ${action} successfully`,
                isNew: isNewContact
            });
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
