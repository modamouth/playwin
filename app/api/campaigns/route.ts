import { NextRequest, NextResponse } from 'next/server';
import { formatCampaignForList, readCampaigns, writeCampaigns } from '@/lib/campaigns';

export async function GET(request: NextRequest) {
  try {
    const campaigns = await readCampaigns();
    const transformedCampaigns = campaigns.map(formatCampaignForList);
    return NextResponse.json({ campaigns: transformedCampaigns });
  } catch (error) {
    console.error('Error reading campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, campaignName, gameType, status, primaryColour, campaignToken, prizeMessage } = await request.json();

    if (!clientName || !campaignName || !gameType || !campaignToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const campaigns = await readCampaigns();

    if (campaigns.some((c) => c.campaignToken === campaignToken)) {
      return NextResponse.json({ error: 'Campaign token already exists' }, { status: 400 });
    }

    const newCampaign = {
      id: Date.now().toString(),
      clientName,
      campaignName,
      gameType,
      status: status || 'draft',
      primaryColour: primaryColour || '#d5293f',
      campaignToken,
      prizeMessage: prizeMessage || '',
      createdAt: new Date().toISOString(),
    };

    campaigns.push(newCampaign);
    await writeCampaigns(campaigns);

    return NextResponse.json({ campaign: newCampaign }, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
