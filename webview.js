const path = require('path');

//Credits: http://snipplr.com/view/36790/jscookies--my-simple-easy-pure-js-javascript-cookies-function/
var jsCookies = {
	get: function(c_name) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	set: function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString());
	}
};

var theme = {
  toggleDark: function(){
    document.querySelector('.toggleDark').classList.toggle('tg_checkbox_on');
    document.body.classList.toggle('darkTheme');

    if(document.body.classList.contains('darkTheme')){
      jsCookies.set("toggleDark","1",365);
    }else{
      jsCookies.set("toggleDark","0",365);
    }
  },
  injectToggleDark: function(){
    //Create the html fragment for toggle
    var darkFrag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = `
      <li>
        <a class="md_modal_section_toggle_wrap tg_checkbox toggleDark" style="">
            <span class="icon icon-checkbox-outer"><i class="icon-checkbox-inner"></i></span>
            <span class="tg_checkbox_label">Dark Theme</span>
        </a>
      </li>
    `;
    while (temp.firstChild) {
        darkFrag.appendChild(temp.firstChild);
    }

    //inject toggle into dropdown
    document.querySelector('.dropdown-menu').appendChild(darkFrag);

    //check dark theme cookie
    if(jsCookies.get("toggleDark") == "1" ){
      theme.toggleDark();
    }
  }
}

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

  // inject dark theme toggle
  theme.injectToggleDark();

  //onclick update toggle and set theme
  document.querySelector('.toggleDark').onclick = function(e){
    theme.toggleDark();
  };
};
