"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var breakpoints = {
    xxl: 1919,
    xl: 1439,
    lg: 1279,
    md: 991,
    sm: 575
  };
  var events = {}; // кастомные события

  window.app.config = {
    events: events,
    breakpoints: breakpoints
    // ...
  };
})(window);
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var checkResponse = function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status));
  };
  var checkResponseSuccess = function checkResponseSuccess(res) {
    if (res && res.success) {
      return res;
    }
    return Promise.reject("\u041E\u0442\u0432\u0435\u0442 \u043D\u0435 success: ".concat(res));
  };
  var buildHttpClient = function buildHttpClient(baseUrl) {
    return function (endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch("".concat(baseUrl).concat(endpoint), options).then(checkResponse).then(checkResponseSuccess);
    };
  };
  var setObserver = function setObserver(element, handleObserve) {
    var manualConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = _objectSpread({
      childList: true
    }, manualConfig);
    var observer = new MutationObserver(function () {
      return handleObserve(element);
    });
    observer.observe(element, config);
  };
  var findAncestorsByClassName = function findAncestorsByClassName(el, className) {
    var stopElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var ancestorEls = [];
    var currentParent = el.parentElement;
    if (!currentParent) {
      return ancestorEls;
    }
    while (currentParent !== null && currentParent !== stopElement) {
      if (currentParent.classList.contains(className)) {
        ancestorEls = [].concat(_toConsumableArray(ancestorEls), [currentParent]);
      }
      currentParent = currentParent.parentElement;
    }
    return ancestorEls;
  };
  var findAncestorByClassName = function findAncestorByClassName(el, className) {
    var ancestorEl = el.parentElement;
    while (!ancestorEl.classList.contains(className)) {
      ancestorEl = ancestorEl.parentElement;
      if (!ancestorEl) {
        return null;
      }
    }
    return ancestorEl;
  };
  var buildComponentLogger = function buildComponentLogger(componentName) {
    return function (text) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var msg = context ? "".concat(componentName, ":").concat(context, ":").concat(text) : "".concat(componentName, ":").concat(text);
      console.debug(msg);
      if (data) {
        console.dir(data);
      }
    };
  };
  var debounce = function debounce(callee, timeoutMs) {
    return function perform() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(function () {
        return callee.apply(void 0, args);
      }, timeoutMs);
    };
  };
  var throttle = function throttle(callee, timeout) {
    var timer = null;
    return function perform() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (timer) return;
      timer = setTimeout(function () {
        callee.apply(void 0, args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  };
  window.app.lib = {
    setObserver: setObserver,
    findAncestorsByClassName: findAncestorsByClassName,
    findAncestorByClassName: findAncestorByClassName,
    buildComponentLogger: buildComponentLogger,
    debounce: debounce,
    throttle: throttle,
    checkResponse: checkResponse,
    checkResponseSuccess: checkResponseSuccess,
    buildHttpClient: buildHttpClient
  };
})(window);


document.addEventListener('DOMContentLoaded', function () {
  let formatForSlider = {
    from: function (formattedValue) {
      return Number(formattedValue.replace(' $', ''));
    },
    to: function (numericValue) {
      return Math.round(numericValue);
    }
  };

  let formatSlider = document.getElementById('formatting-slider');

  noUiSlider.create(formatSlider, {
    start: ['0', '6500'],
    range: {
      'min': 0,
      'max': 9999
    },
    connect: true,
    format: formatForSlider,
    tooltips: [false, {
      to: function (numericValue) {
        return numericValue.toFixed(0) + ' $';
      }
    }]
  });

  let inputFormat1 = document.getElementById('price-input-1');
  let inputFormat2 = document.getElementById('price-input-2');

  function adjustInputWidth(input) {
    input.style.width = (input.value.length + 1) + 'ch';
  }

  formatSlider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
      inputFormat1.value = values[0] + ' $';
      adjustInputWidth(inputFormat1);
    } else {
      inputFormat2.value = values[1] + ' $';
      adjustInputWidth(inputFormat2);
    }
  });

  inputFormat1.addEventListener('change', function () {
    let value = Number(this.value.replace(' $', ''));
    formatSlider.noUiSlider.set([value, null]);
    adjustInputWidth(this);
  });

  inputFormat2.addEventListener('change', function () {
    let value = Number(this.value.replace(' $', ''));
    formatSlider.noUiSlider.set([null, value]);
    adjustInputWidth(this);
  });

  document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.responsive-input');
    inputs.forEach(input => {
      adjustInputWidth(input);
      input.addEventListener('input', function () {
        adjustInputWidth(this);
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let formatForSlider = {
    from: function (formattedValue) {
      return Number(formattedValue.replace(' %', ''));
    },
    to: function (numericValue) {
      return Math.round(numericValue);
    }
  };

  let formatSlider = document.getElementById('formatting-slider2');

  noUiSlider.create(formatSlider, {
    start: [65],
    range: {
      'min': 0,
      'max': 100
    },
    connect: [true, false],
    format: formatForSlider,
    tooltips: {
      to: function (numericValue) {
        return numericValue.toFixed(0) + ' %';
      }
    }
  });

  let inputFormat1 = document.getElementById('THC-input-1');

  function adjustInputWidth(input) {
    input.style.width = (input.value.length + 1) + 'ch';
  }

  formatSlider.noUiSlider.on('update', function (values, handle) {
    inputFormat1.value = values[0] + ' %';
    adjustInputWidth(inputFormat1);
  });

  inputFormat1.addEventListener('change', function () {
    let value = Number(this.value.replace(' %', ''));
    formatSlider.noUiSlider.set([value]);
    adjustInputWidth(this);
  });

  const inputs = document.querySelectorAll('.responsive-input');
  inputs.forEach(input => {
    adjustInputWidth(input);
    input.addEventListener('input', function () {
      adjustInputWidth(this);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let formatForSlider = {
    from: function (formattedValue) {
      return Number(formattedValue.replace(' %', ''));
    },
    to: function (numericValue) {
      return Math.round(numericValue);
    }
  };

  let formatSlider = document.getElementById('formatting-slider3');

  noUiSlider.create(formatSlider, {
    start: [65],
    range: {
      'min': 0,
      'max': 100
    },
    connect: [true, false],
    format: formatForSlider,
    tooltips: {
      to: function (numericValue) {
        return numericValue.toFixed(0) + ' %';
      }
    }
  });

  let inputFormat1 = document.getElementById('CBD-input-1');

  function adjustInputWidth(input) {
    input.style.width = (input.value.length + 1) + 'ch';
  }

  formatSlider.noUiSlider.on('update', function (values, handle) {
    inputFormat1.value = values[0] + ' %';
    adjustInputWidth(inputFormat1);
  });

  inputFormat1.addEventListener('change', function () {
    let value = Number(this.value.replace(' %', ''));
    formatSlider.noUiSlider.set([value]);
    adjustInputWidth(this);
  });

  const inputs = document.querySelectorAll('.responsive-input');
  inputs.forEach(input => {
    adjustInputWidth(input);
    input.addEventListener('input', function () {
      adjustInputWidth(this);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const checkboxItems = document.querySelectorAll('.checkboxes__item');

  checkboxItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checkboxes__item--active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const radioButtons = document.querySelectorAll('.radio__button');

  const setActiveButton = (button) => {
    const bar = button.nextElementSibling.querySelector('.bar');
    bar.style.width = '4px';
    bar.style.height = '26px';
  };
  
  const initialActiveButtons = [5, 10];
  initialActiveButtons.forEach(value => {
    const button = document.querySelector(`.radio__button[value="${value}"]`);
    if (button) {
      button.checked = true;
      setActiveButton(button);
    }
  });

  radioButtons.forEach(button => {
    button.addEventListener('change', function () {
      const value = this.value;
      const group = value <= 5 ? 'group1' : 'group2';

      radioButtons.forEach(btn => {
        if ((group === 'group1' && btn.value <= 5) || (group === 'group2' && btn.value > 5)) {
          btn.nextElementSibling.querySelector('.bar').style.width = '4px';
          btn.nextElementSibling.querySelector('.bar').style.height = '20px';
        }
      });

      setActiveButton(this);
    });
  });
});


document.querySelector('.drop-down__button').addEventListener('click', function () {
  const menu = document.querySelector('.drop-down__menu');
  if (menu.style.opacity === '0') {
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
  } else {
    menu.style.opacity = '0';
    menu.style.pointerEvents = 'none';
  }
});

document.querySelectorAll('.filters__item--toggle').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const wrapper = this.nextElementSibling;
    const icon = this.querySelector('.filters__item__icon');

    if (wrapper.style.display === 'flex' || wrapper.style.display === '') {
      wrapper.style.display = 'none';
      icon.classList.add('rotated');
    } else {
      wrapper.style.display = 'flex';
      icon.classList.remove('rotated');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector('.filters__container');
  const activeFiltersContainer = document.querySelector('.filters--on__flex');

  const checkboxes = filtersContainer.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const labelElement = document.querySelector(`label[for="${checkbox.id}"]`);
      const label = labelElement ? labelElement.textContent : '';
      addActiveFilter(label, checkbox.id);
    }
  });

  filtersContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('checkbox')) {
      const checkbox = e.target;
      const labelElement = document.querySelector(`label[for="${checkbox.id}"]`);
      const label = labelElement ? labelElement.textContent : '';

      if (checkbox.checked) {
        addActiveFilter(label, checkbox.id);
      } else {
        removeActiveFilter(checkbox.id);
      }
    }
  });

  activeFiltersContainer.addEventListener('click', (e) => {
    if (e.target.closest('.filter--close')) {
      const filterBlock = e.target.closest('.filters--on');
      const checkboxId = filterBlock.dataset.checkboxId;

      removeActiveFilter(checkboxId);
      document.getElementById(checkboxId).checked = false;
    }
  });

  function addActiveFilter(label, checkboxId) {
    const filterBlock = document.createElement('div');
    filterBlock.className = 'filters--on';
    filterBlock.dataset.checkboxId = checkboxId;

    const filterText = document.createElement('p');
    filterText.textContent = label;

    const closeButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeButton.setAttribute('class', 'filters--close');
    closeButton.setAttribute('width', '18');
    closeButton.setAttribute('height', '18');
    closeButton.setAttribute('viewBox', '0 0 18 18');
    closeButton.setAttribute('fill', 'none');
    closeButton.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    closeButton.innerHTML = `
                <path d="M9.075 16.7095C12.8443 16.7095 15.9 13.6538 15.9 9.88448C15.9 6.11514 12.8443 3.05948 9.075 3.05948C5.30566 3.05948 2.25 6.11514 2.25 9.88448C2.25 13.6538 5.30566 16.7095 9.075 16.7095Z" fill="#58AA46" fill-opacity="0.9"/>
                <path d="M11.25 7.55948L9 9.80948M9 9.80948L6.75 12.0595M9 9.80948L6.75 7.55948M9 9.80948L11.25 12.0595M15.9 9.88448C15.9 13.6538 12.8443 16.7095 9.075 16.7095C5.30566 16.7095 2.25 13.6538 2.25 9.88448C2.25 6.11514 5.30566 3.05948 9.075 3.05948C12.8443 3.05948 15.9 6.11514 15.9 9.88448Z" stroke="white" stroke-linecap="round"/>
            `;

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removeActiveFilter(checkboxId);
      document.getElementById(checkboxId).checked = false;
    });

    filterBlock.appendChild(filterText);
    filterBlock.appendChild(closeButton);
    activeFiltersContainer.appendChild(filterBlock);
  }

  function removeActiveFilter(checkboxId) {
    const filterBlocks = activeFiltersContainer.querySelectorAll('.filters--on');
    filterBlocks.forEach(block => {
      if (block.dataset.checkboxId === checkboxId) {
        block.remove();
      }
    });
  }
});
