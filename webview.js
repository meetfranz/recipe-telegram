const path = require('path');

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const search = document.querySelector('.im_dialogs_search_field').value;

    let count = 0;
    if (search === '') {
      const elements = document.querySelectorAll('.im_dialog_badge:not(.ng-hide)');
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].innerHTML !== 0) {
          count += 1;
        }
      }
    }

    Franz.setBadge(count);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
