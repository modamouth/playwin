import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CAMPAIGNS_FILE = path.join(process.cwd(), 'data', 'campaigns.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read campaigns from file
async function readCampaigns() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CAMPAIGNS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write campaigns to file
async function writeCampaigns(campaigns: any[]) {
  await ensureDataDir();
  await fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const campaigns = await readCampaigns();
    // Transform to match expected format
    const transformedCampaigns = campaigns.map((c: any) => ({
      id: c.id,
      name: c.campaignName,
      client: c.clientName,
      type: c.gameType,
      status: c.status,
      slug: c.campaignToken
    }));

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

    // Check if campaign token already exists
    if (campaigns.some((c: any) => c.campaignToken === campaignToken)) {
      return NextResponse.json({ error: 'Campaign token already exists' }, { status: 400 });
    }

    const newCampaign = {
      id: Date.now().toString(), // Simple ID generation
      clientName,
      campaignName,
      gameType,
      status: status || 'draft',
      primaryColour: primaryColour || '#d5293f',
      campaignToken,
      prizeMessage: prizeMessage || '',
      createdAt: new Date().toISOString()
    };

    campaigns.push(newCampaign);
    await writeCampaigns(campaigns);

    return NextResponse.json({ campaign: newCampaign }, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}