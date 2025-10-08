// webScraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrape(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];
    $('article').each((i, el) => {
      const title = $(el).find('h2').text().trim();
      const link = $(el).find('a').attr('href');
      results.push({ title, link });
    });

    fs.writeFileSync('results.csv', 'Title,Link\n' + results.map(r => `"${r.title}","${r.link}"`).join('\n'));
    console.log('Scraping done, results.csv created.');
  } catch (err) {
    console.error('Error scraping:', err.message);
  }
}

// Example usage: node webScraper.js https://example.com
if (require.main === module) scrape(process.argv[2]);
