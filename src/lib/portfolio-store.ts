import { db } from "@/lib/db";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-content";

const PORTFOLIO_KEY = "portfolio";

function asPortfolioContent(value: unknown): PortfolioContent {
  if (!value || typeof value !== "object") {
    return defaultPortfolioContent;
  }

  return {
    ...defaultPortfolioContent,
    ...(value as Partial<PortfolioContent>),
    personalInfo: {
      ...defaultPortfolioContent.personalInfo,
      ...((value as Partial<PortfolioContent>).personalInfo ?? {}),
      social: {
        ...defaultPortfolioContent.personalInfo.social,
        ...((value as Partial<PortfolioContent>).personalInfo?.social ?? {}),
      },
    },
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const record = await db.siteContent.findUnique({
    where: { key: PORTFOLIO_KEY },
  });

  if (!record) {
    await db.siteContent.create({
      data: { key: PORTFOLIO_KEY, data: defaultPortfolioContent },
    });
    return defaultPortfolioContent;
  }

  return asPortfolioContent(record.data);
}

export async function savePortfolioContent(content: PortfolioContent): Promise<PortfolioContent> {
  const normalized = asPortfolioContent(content);

  await db.siteContent.upsert({
    where: { key: PORTFOLIO_KEY },
    update: { data: normalized },
    create: { key: PORTFOLIO_KEY, data: normalized },
  });

  return normalized;
}
