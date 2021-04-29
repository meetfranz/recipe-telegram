const path = require('path');

module.exports = Franz => {
  const getMessages = function getMessages() {
    const messages = document.querySelectorAll('li.rp:not(.is-muted)');  
    let count = 0;
	  for (let i = 0; i < messages.length; i += 1) {
	    const message = messages[i].querySelector('div.unread');
	    if (!!message && message.innerHTML !== '') {
		    count += 1;
	    }
	  }
    
    Franz.setBadge(count);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
