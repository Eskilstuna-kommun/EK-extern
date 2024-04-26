import { dom } from './ui';

function render(target) {
  const pop = `<div id="o-popup">
      <div class="o-popup o-card">
        <div class="flex row justify-end">
          <div id="o-card-title" class="justify-start margin-y-smaller margin-left text-weight-bold" style="width:100%;"></div>
          <button id="o-minimize-button" class="small round margin-top-smaller margin-bottom-auto margin-left-small margin-right-small icon-smallest grey-lightest no-shrink" aria-label="Minimera">
            <span class="icon ">_</span>
          </button>
          <button id="o-close-button" class="small round margin-top-smaller margin-bottom-auto margin-right-small icon-smallest grey-lightest no-shrink" aria-label="Stäng">
            <span class="icon ">
              <svg>
                <use xlink:href="#ic_close_24px"></use>
              </svg>
            </span>
          </button>
        </div>
        <div class="o-card-content"></div>
      </div>
    </div>`;
  document.getElementById(target.substring(1)).appendChild(dom.html(pop));
}

function getEl() {
  return document.getElementById('o-popup');
}

function setVisibility(visible) {
  const popel = document.getElementById('o-popup');
  const { style } = popel;
  if (visible) {
    style.display = 'block';
  } else {
    style.display = 'none';
  }
}

function setTitle(title) {
  const popel = document.getElementById('o-card-title');
  popel.innerHTML = title;
}

function insertContent(content) {
  const popel = document.getElementById('o-popup').getElementsByClassName('o-card-content')[0];
  popel.innerHTML = content;
}

function setContent(config) {
  const { title, content } = config;
  if (title) {
    setTitle(title);
  } else {
    setTitle('');
  }
  if (content) {
    insertContent(content);
  } else {
    insertContent('');
  }
}

function setPopupStyle(SUWThemeTitle) {
  const cardTitle = document.getElementById('o-card-title');
  const card = document.getElementsByClassName('o-popup o-card')[0];

  switch (SUWThemeTitle) {
    case 'Utemiljö':
      card.style.setProperty('background-color', 'rgba(65,143,53,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Flera kategorier':
      card.style.setProperty('background-color', 'rgba(95,95,95,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Vård och omsorg':
      card.style.setProperty('background-color', 'rgba(228,40,28,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Trafik och infrastruktur':
      card.style.setProperty('background-color', 'rgba(0,154,203,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Kultur och fritid':
      card.style.setProperty('background-color', 'rgba(46,77,156,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Handel, kontor, industri m.m.':
      card.style.setProperty('background-color', 'rgba(255,213,0,1)', 'important');
      cardTitle.style.setProperty('color', '#191919', 'important');
      break;
    case 'Förskola och skola':
      card.style.setProperty('background-color', 'rgba(236,116,35,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Bostäder':
      card.style.setProperty('background-color', 'rgba(231,66,135,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    case 'Geografiska områden':
      card.style.setProperty('background-color', 'rgba(130,54,136,1)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
      break;
    default:
      card.style.setProperty('background-color', 'rgba(55,26,179,0.5)', 'important');
      cardTitle.style.setProperty('color', 'whitesmoke', 'important');
  }
}

function minimizePopup() {
  const oidentify = document.getElementById('o-identify');
  const opopup = document.getElementById('o-popup');
  const ocardtitle = document.getElementById('o-card-title');
  oidentify.style.display = oidentify.style.display === 'none' ? 'block' : 'none';
  opopup.style.width = oidentify.style.display === 'none' ? 'auto' : null;
  opopup.style.height = oidentify.style.display === 'none' ? '58px' : '78px';
  opopup.children[0].style.position = oidentify.style.display === 'none' ? 'sticky' : null;
  opopup.children[0].style.width = oidentify.style.display === 'none' ? 'auto' : null;
  ocardtitle.style.display = oidentify.style.display === 'none' ? 'none' : null;
}

/**
 * Closes the window and optionally calls a callback set at init
 * @param {any} cb
 */
function closePopupInternal(cb) {
  setVisibility(false);
  if (cb) {
    cb();
  }
}

/**
 * Creates a new popup and adds it to the dom.
 * @param {any} target id of parent DOM object
 * @param {Object} opts options.
 * @param {function} opts.closeCb Function without parameters to be called when popup is closed from close button.
 */
export default function popup(target, opts = {}) {
  const {
    closeCb
  } = opts;

  function bindUIActions() {
    const closeel = document.querySelector('#o-popup .o-popup #o-close-button');
    closeel.addEventListener('click', (evt) => {
      closePopupInternal(closeCb);
      evt.preventDefault();
    });
    const minel = document.querySelector('#o-popup .o-popup #o-minimize-button');
    minel.addEventListener('click', (evt) => {
      minimizePopup();
      evt.preventDefault();
    });
  }

  render(target);
  bindUIActions();

  return {
    getEl,
    setVisibility,
    setTitle,
    setContent,
    setPopupStyle,
    closePopup: () => {
      closePopupInternal(closeCb);
    }
  };
}
