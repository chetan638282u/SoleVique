const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const content = fs.readFileSync('./old_html/index.html', 'utf8');
const $ = cheerio.load(content);

$('*').each((i, el) => {
  const html = $.html(el);
  if (html.includes('lh3.googleusercontent.com') && el.tagName.toLowerCase() !== 'html' && el.tagName.toLowerCase() !== 'body') {
    if ($(el).attr('style') && $(el).attr('style').includes('lh3.googleusercontent.com')) {
      console.log(`STYLE TAG [${el.tagName}]:\n${$.html(el)}\n\n`);
    }
    if ($(el).attr('src') && $(el).attr('src').includes('lh3.googleusercontent.com')) {
      console.log(`SRC TAG [${el.tagName}]:\n${$.html(el)}\n\n`);
    }
  }
});
