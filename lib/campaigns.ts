import { promises as fs } from 'fs';
import path from 'path';

export interface StoredCampaign {
  id: string;
  clientName: string;
  campaignName: string;
  gameType: string;
  status: string;
  primaryColour: string;
  campaignToken: string;
  prizeMessage: string;
  createdAt: string;
}

const CAMPAIGNS_FILE = path.join(process.cwd(), 'data', 'campaigns.json');

export async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function readCampaigns(): Promise<StoredCampaign[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CAMPAIGNS_FILE, 'utf8');
    return JSON.parse(data) as StoredCampaign[];
  } catch {
    return [];
  }
}

export async function writeCampaigns(campaigns: StoredCampaign[]) {
  await ensureDataDir();
  await fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2));
}

export async function getCampaignById(id: string) {
  const campaigns = await readCampaigns();
  return campaigns.find((campaign) => campaign.id === id);
}

export function formatCampaignForList(campaign: StoredCampaign) {
  return {
    id: campaign.id,
    name: campaign.campaignName,
    client: campaign.clientName,
    type: campaign.gameType,
    status: campaign.status,
    slug: campaign.campaignToken,
  };
}

export function serializeCampaign(campaign: StoredCampaign) {
  return {
    id: campaign.id,
    name: campaign.campaignName,
    client: campaign.clientName,
    type: campaign.gameType,
    status: campaign.status,
    slug: campaign.campaignToken,
    createdAt: campaign.createdAt,
  };
}
