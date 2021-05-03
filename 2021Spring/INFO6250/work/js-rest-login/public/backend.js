/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/list.js":
/*!*********************!*\
  !*** ./src/list.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addintolist": () => (/* binding */ addintolist),
/* harmony export */   "updateRate": () => (/* binding */ updateRate),
/* harmony export */   "deletefromlist": () => (/* binding */ deletefromlist),
/* harmony export */   "readfromlist": () => (/* binding */ readfromlist)
/* harmony export */ });
var addintolist = function addintolist(item) {
  return fetch('/user', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      item: item
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var updateRate = function updateRate(_ref) {
  var method = _ref.method,
      itemId = _ref.itemId;

  if (itemId) {
    return fetch('/user', {
      method: "PATCH",
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        method: method,
        itemId: itemId
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    });
  }
};
var deletefromlist = function deletefromlist(itemId) {
  if (itemId) {
    return fetch('/user', {
      method: "DELETE",
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        itemId: itemId
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    });
  }
};
var readfromlist = function readfromlist() {
  return fetch('/list', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  }).then(setTimeout(readfromlist, 1000));
}; // export const buttondisable = function(items){
//     for (let i of document.querySelectorAll(".decrease")){
//         const index = i.dataset.index
//         const rate = items[index].rate
//         console.log(index,rate)
//         if (rate <= 0 ){
//             i.disabled = true
//         }
//     }
//     for (let i of document.querySelectorAll(".increase")){
//         const index = i.dataset.index
//         const rate = items[index].rate
//         if (rate >= 5 ){
//             i.disabled = true
//         }
//     }
// }

/***/ }),

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "performLogin": () => (/* binding */ performLogin),
/* harmony export */   "performLogout": () => (/* binding */ performLogout),
/* harmony export */   "showLogin": () => (/* binding */ showLogin),
/* harmony export */   "closeLogin": () => (/* binding */ closeLogin)
/* harmony export */ });
function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
}

var checkLoginStatus = function checkLoginStatus() {
  return fetch('/user', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/login', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var showLogin = function showLogin() {
  var login_status = document.querySelector('.login-status');
  login_status.innerHTML = 'Please Log in';
  var login_page = document.querySelector('.loginpage');
  login_page.showModal();
};
var closeLogin = function closeLogin() {
  var login_status = document.querySelector('.login-status');
  login_status.innerHTML = '';
  var login_page = document.querySelector('.loginpage');
  login_page.close();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/backend.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./src/login.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list */ "./src/list.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var application = [];
(0,_login__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (user) {
  application = user;
  rendPage(); //rendPage(application)

  (0,_login__WEBPACK_IMPORTED_MODULE_0__.closeLogin)();
})["catch"](function (err) {
  console.log(err);
  updateloginStatus(errMsgs[err.error] || err.error);
  (0,_login__WEBPACK_IMPORTED_MODULE_0__.showLogin)();
});
var t;

var autoUpdate = function autoUpdate() {
  return fetch('/auto-update', {
    method: 'GET'
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  }).then(function (user) {
    application = user;

    if (order == 1) {
      application = ascending();
    }

    if (order == -1) {
      application = descending();
    }

    rendPage();
  })["catch"](function (err) {
    console.log(err);
    updateStatus(errMsgs[err.error] || err.error);
  }).then(t = setTimeout(autoUpdate, 5000));
}; //readfromlist()


login();
logout();
addItem();
adjustRate();
deleteitem();
orderRate();

function updateloginStatus(message) {
  var login_status = document.querySelector('.login-status');
  login_status.innerText = message;
}

var status = document.querySelector(".list_status");

function updateStatus(message) {
  if (message) {
    status.innerText = message;
  }
}

var errMsgs = {
  // translate error codes to human-friendly messages
  'duplicate': 'This item had already existed',
  'network-error': 'There was a problem connecting to the network, try again',
  'invalid-input': 'There was a proble with your input, only allow English characters',
  'login-required': 'Please Log in',
  'missing-value': "value is missing, server error",
  'empty-name': 'Please do not have whitespaces or use empty name',
  'login-invalid': 'Please try other name (PS: only English letters)',
  'username-invalid': 'Please try other name (PS: only English letters)',
  'item name is empty': 'item name is empty'
}; //let update = setTimeout( autoUpdate, 5000) 

function login() {
  var login_button = document.querySelector(".login");
  login_button.addEventListener('click', function () {
    var username = document.querySelector('.username').value;
    (0,_login__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (user) {
      document.querySelector('.username').value = '';
      application = user; //rendPage()

      autoUpdate();
      (0,_login__WEBPACK_IMPORTED_MODULE_0__.closeLogin)();
    })["catch"](function (err) {
      // fixme - show errors
      console.log(err);
      updateloginStatus(errMsgs[err.error] || err.error);
    });
  });
} //let update = setTimeout( autoUpdate, 5000) 


function logout() {
  var logout_button = document.querySelector(".logout");
  logout_button.addEventListener('click', function () {
    (0,_login__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function (user) {
      var list = document.querySelector(".inventory-app .display-panel .item-list");
      list.innerHTML = '';
      clearTimeout(t);
      hideUserPanel();
      (0,_login__WEBPACK_IMPORTED_MODULE_0__.showLogin)();
    })["catch"](function (err) {
      // fixme - show errors
      console.log(err);
      updateloginStatus(errMsgs[err.error] || err.error);
    });
  });
}

function addItem() {
  var add_button = document.querySelector(".inventory-app .input-panel button");
  add_button.addEventListener("click", function () {
    var input = document.querySelector(".inventory-app .input-panel input");
    var item = input.value;
    (0,_list__WEBPACK_IMPORTED_MODULE_1__.addintolist)(item).then(function (_ref) {
      var itemId = _ref.itemId,
          name = _ref.name,
          rate = _ref.rate;
      status.innerHTML = '';
      input.value = '';
      application.items.push({
        itemId: itemId,
        name: name,
        rate: rate
      });

      if (order == 1) {
        application = ascending();
      }

      if (order == -1) {
        application = descending();
      }

      rendPage();
    })["catch"](function (err) {
      console.log(err);
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function adjustRate() {
  var list = document.querySelector(".inventory-app .display-panel .item-list");
  list.addEventListener('click', function (e) {
    if (!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")) {
      return;
    }

    var itemId = e.target.dataset.index;
    var method;

    if (e.target.classList.contains("increase")) {
      method = '+';
    }

    if (e.target.classList.contains("decrease")) {
      method = '-';
    }

    (0,_list__WEBPACK_IMPORTED_MODULE_1__.updateRate)({
      method: method,
      itemId: itemId
    }).then(function (_ref2) {
      var itemId = _ref2.itemId,
          item = _ref2.item;
      var curr_index = returnPos(itemId);
      application.items[curr_index] = item;

      if (order == 1) {
        application = ascending();
      }

      if (order == -1) {
        application = descending();
      }

      rendPage();
    })["catch"](function (err) {
      console.log(err);
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function deleteitem() {
  var list = document.querySelector(".inventory-app .display-panel .item-list");
  list.addEventListener('click', function (e) {
    if (!e.target.classList.contains("delete")) {
      return;
    }

    var itemId = e.target.dataset.index; //console.log(itemId)
    //console.log(e.target)

    (0,_list__WEBPACK_IMPORTED_MODULE_1__.deletefromlist)(itemId).then(function (_ref3) {
      var itemId = _ref3.itemId;
      //console.log(index)
      //delete application.items[index]
      var curr_index = returnPos(itemId);
      application.items.splice(curr_index, 1);

      if (order == 1) {
        application = ascending();
      }

      if (order == -1) {
        application = descending();
      }

      rendPage();
    })["catch"](function (err) {
      console.log(err);
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function rendPage() {
  console.log(order);
  var user_panel = document.querySelector('.user');
  user_panel.hidden = false;
  var name = document.querySelector('.name');
  name.innerHTML = application.username;
  var list = document.querySelector(".inventory-app .display-panel .item-list");
  console.log(application);
  var html_data = '';

  for (var i in application.items) {
    var itemId = application.items[i].itemId;
    var index = i;
    var _name = application.items[i].name;
    var rate = application.items[i].rate;

    if (rate <= 0) {
      html_data += "\n                <li>\n                    <span class=\"delete\" data-index=\"".concat(itemId, "\">X</span>\n                    <span class=\"item-name\" data-index=\"").concat(itemId, "\">Name: ").concat(_name, "</span>\n                    <br>\n                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>\n                    <button class=\"decrease\" data-index=\"").concat(itemId, "\" disabled> - </button>\n                    <span class=\"item-quantity\" data-index=\"").concat(itemId, "\">").concat(rate, "</span>\n                    <button class=\"increase\" data-index=\"").concat(itemId, "\"> + </button>\n                </li>\n                ");
    } else if (rate >= 5) {
      html_data += "\n                <li>\n                    <span class=\"delete\" data-index=\"".concat(itemId, "\">X</span>\n                    <span class=\"item-name\" data-index=\"").concat(itemId, "\">Name: ").concat(_name, "</span>\n                    <br>\n                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>\n                    <button class=\"decrease\" data-index=\"").concat(itemId, "\"> - </button>\n                    <span class=\"item-quantity\" data-index=\"").concat(itemId, "\">").concat(rate, "</span>\n                    <button class=\"increase\" data-index=\"").concat(itemId, "\" disabled> + </button>\n                </li>\n                ");
    } else {
      html_data += "\n                <li>\n                    <span class=\"delete\" data-index=\"".concat(itemId, "\">X</span>\n                    <span class=\"item-name\" data-index=\"").concat(itemId, "\">Name: ").concat(_name, "</span>\n                    <br>\n                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>\n                    <button class=\"decrease\" data-index=\"").concat(itemId, "\"> - </button>\n                    <span class=\"item-quantity\" data-index=\"").concat(itemId, "\">").concat(rate, "</span>\n                    <button class=\"increase\" data-index=\"").concat(itemId, "\"> + </button>\n                </li>\n                ");
    }
  }

  list.innerHTML = html_data; //buttondisable(user.items)
}

var order = 0;

function ascending() {
  console.log("ascending");
  var ascending_app = [];
  console.log(application.items);
  ascending_app.username = application.username; //ascending_app.curr_index = application.curr_index

  ascending_app.items = [];
  var ascending_list = [];

  var _iterator = _createForOfIteratorHelper(application.items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      var _itemId = i.itemId;
      var _rate = i.rate;
      ascending_list.push([_itemId, _rate]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  console.log(ascending_list);
  ascending_list.sort(function compare(a, b) {
    return a[1] - b[1];
  });
  console.log(ascending_list);
  console.log(application.items);

  for (var index in ascending_list) {
    var itemId = ascending_list[index][0];
    var rate = ascending_list[index][1];
    var curr_index = returnPos(itemId);
    console.log(itemId, application.items[curr_index].name, rate);
    ascending_app.items.push({
      itemId: parseInt(itemId),
      name: application.items[curr_index].name,
      rate: rate
    });
  }

  console.log(ascending_app);
  console.log("__________________________________");
  return ascending_app;
}

function descending() {
  //console.log("descending")
  var descending_app = []; //console.log(application.items)

  descending_app.username = application.username; //descending_app.curr_index = application.curr_index

  descending_app.items = [];
  var descending_list = [];

  var _iterator2 = _createForOfIteratorHelper(application.items),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var i = _step2.value;
      var _itemId2 = i.itemId;
      var _rate2 = i.rate;
      descending_list.push([_itemId2, _rate2]);
    } //console.log(descending_list)

  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  descending_list.sort(function compare(a, b) {
    return b[1] - a[1];
  }); //console.log(descending_list)
  //console.log(application.items)

  for (var index in descending_list) {
    var itemId = descending_list[index][0];
    var rate = descending_list[index][1];
    var curr_index = returnPos(itemId); //console.log(itemId,application.items[curr_index].name,rate)

    descending_app.items.push({
      itemId: parseInt(itemId),
      name: application.items[curr_index].name,
      rate: rate
    });
  } //console.log(descending_app)
  //console.log("__________________________________")


  return descending_app;
}

function orderRate() {
  var ascending = document.querySelector('.ascending');
  var descending = document.querySelector('.descending'); //const reset = document.querySelector('.reset')

  ascending.addEventListener('click', function () {
    order = 1; //console.log("ascending")

    var ascending_app = []; //console.log(application.items)

    ascending_app.username = application.username; //ascending_app.curr_index = application.curr_index

    ascending_app.items = [];
    var ascending_list = [];

    var _iterator3 = _createForOfIteratorHelper(application.items),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var i = _step3.value;
        var _itemId3 = i.itemId;
        var _rate3 = i.rate;
        ascending_list.push([_itemId3, _rate3]);
      } //console.log(ascending_list)

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    ascending_list.sort(function compare(a, b) {
      return a[1] - b[1];
    }); //console.log(ascending_list)
    //console.log(application.items)

    for (var index in ascending_list) {
      var itemId = ascending_list[index][0];
      var rate = ascending_list[index][1];
      var curr_index = returnPos(itemId); //console.log(itemId,application.items[curr_index].name,rate)

      ascending_app.items.push({
        itemId: parseInt(itemId),
        name: application.items[curr_index].name,
        rate: rate
      });
    } //console.log(ascending_app)


    application = ascending_app; //console.log("__________________________________")

    rendPage();
  });
  descending.addEventListener('click', function () {
    order = -1; //console.log("descending")

    var descending_app = []; //console.log(application.items)

    descending_app.username = application.username; //descending_app.curr_index = application.curr_index

    descending_app.items = [];
    var descending_list = [];

    var _iterator4 = _createForOfIteratorHelper(application.items),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var i = _step4.value;
        var _itemId4 = i.itemId;
        var _rate4 = i.rate;
        descending_list.push([_itemId4, _rate4]);
      } //console.log(descending_list)

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    descending_list.sort(function compare(a, b) {
      return b[1] - a[1];
    }); //console.log(descending_list)
    //console.log(application.items)

    for (var index in descending_list) {
      var itemId = descending_list[index][0];
      var rate = descending_list[index][1];
      var curr_index = returnPos(itemId); //console.log(itemId,application.items[curr_index].name,rate)

      descending_app.items.push({
        itemId: parseInt(itemId),
        name: application.items[curr_index].name,
        rate: rate
      });
    } //console.log(descending_app)


    application = descending_app; //console.log("__________________________________")

    rendPage();
  }); // reset.addEventListener('click',()=>{
  //     // console.log("reset")
  //     //console.log(application.items)
  //     rendPage()
  // })
  // <button class="ascending">Ascending</button>
  // <button class="descending"> Descending</button>
  // <button class="reset">Reset</button>
}

function returnPos(itemId) {
  var curr_index;

  for (var i in application.items) {
    if (itemId == application.items[i].itemId) {
      curr_index = i;
      break;
    }
  }

  return curr_index;
}

function hideUserPanel() {
  var user_panel = document.querySelector('.user');
  user_panel.hidden = true;
}
})();

/******/ })()
;
//# sourceMappingURL=backend.js.map