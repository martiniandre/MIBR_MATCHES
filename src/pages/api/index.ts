// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

interface IMatch {
  team1: string;
  score: string;
  team2: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.hltv.org/team/9455/imperial#tab-matchesBox');

    const rows = await page.$$eval('td.team-center-cell', (table) => {
      let matches: IMatch[] = [];
      const arrayOfElements = Array.from(table);
      arrayOfElements.forEach((elements) => {
        const arrayOfChild = Array.from(elements.children);
        const [team1, score, team2] = arrayOfChild.map((child) => {
          if (!child.textContent) {
            return 'Not Found';
          }
          return child.textContent;
        });
        matches.push({
          team1,
          score,
          team2,
        });
      });
      return matches;
    });

    await browser.close();

    return res.status(200).json({
      rows,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
