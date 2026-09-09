const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const srcDir = './old_html';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const $ = cheerio.load(content);
  
  $('*').each((i, el) => {
    const html = $.html(el);
    if (html.includes('lh3.googleusercontent.com')) {
      if ($(el).attr('style') && $(el).attr('style').includes('lh3.googleusercontent.com')) {
        console.log(`[${file}] <${el.tagName}> has it in style! class: ${$(el).attr('class')}`);
      }
      if ($(el).attr('src') && $(el).attr('src').includes('lh3.googleusercontent.com')) {
        console.log(`[${file}] <${el.tagName}> has it in src! class: ${$(el).attr('class')}`);
      }
    }
  });
}
