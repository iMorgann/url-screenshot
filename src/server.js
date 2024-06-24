const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const MAX_RETRIES = 3;

async function navigateWithRetries(page, url, retries = 0) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(`Retrying navigation to ${url} (attempt ${retries + 1})`);
      await navigateWithRetries(page, url, retries + 1);
    } else {
      throw error;
    }
  }
}

app.get('/screenshot', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const userAgent = req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent);

  try {
    const browser = await puppeteer.launch({ 
        headless: 'new',  // Use the new headless mode
        args: ['--no-sandbox'] });
    const page = await browser.newPage();

    if (isMobile) {
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.setUserAgent(userAgent);
    } else {
      await page.setViewport({ width: 1920, height: 1080 });
    }

    // Set default navigation timeout to 60 seconds
    await page.setDefaultNavigationTimeout(60000);

    await navigateWithRetries(page, url);

    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });
    await browser.close();
    res.status(200).send(screenshot);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    res.status(500).send('Error taking screenshot');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
