const fs = require('fs');
const path = require('path');

const loadMessages = (lang = 'fr') => {
  const filePath = path.join(__dirname, `../locales/${lang}.json`);
  if (fs.existsSync(filePath)) {
    const messages = fs.readFileSync(filePath);
    return JSON.parse(messages);
  }
  return {};
};

module.exports = loadMessages;
