import { NextRequest, NextResponse } from 'next/server';
import { readCampaigns } from '@/lib/campaigns';

export async function GET(request: NextRequest) {
  try {
    const campaigns = await readCampaigns();

    // Extract unique clients
    const clientsMap = new Map<string, { name: string; campaignCount: number; lastCampaign: string }>();

    campaigns.forEach((campaign) => {
      const clientName = campaign.clientName;
      const existing = clientsMap.get(clientName);

      if (existing) {
        existing.campaignCount += 1;
        // Update last campaign if this one is more recent
        if (new Date(campaign.createdAt) > new Date(existing.lastCampaign)) {
          existing.lastCampaign = campaign.createdAt;
        }
      } else {
        clientsMap.set(clientName, {
          name: clientName,
          campaignCount: 1,
          lastCampaign: campaign.createdAt,
        });
      }
    });

    const clients = Array.from(clientsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}