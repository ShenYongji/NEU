/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RecipesList.js":
/*!****************************!*\
  !*** ./src/RecipesList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPageWithoutLogin": () => (/* binding */ getPageWithoutLogin),
/* harmony export */   "addNewRecipe": () => (/* binding */ addNewRecipe),
/* harmony export */   "readRecipe": () => (/* binding */ readRecipe)
/* harmony export */ });
var getPageWithoutLogin = function getPageWithoutLogin() {
  return fetch('/initPage', {
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
var addNewRecipe = function addNewRecipe(_ref) {
  var recipeTitle = _ref.recipeTitle,
      recipeIngredients = _ref.recipeIngredients,
      recipeInstructions = _ref.recipeInstructions;
  return fetch('/Recipes', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      recipeTitle: recipeTitle,
      recipeIngredients: recipeIngredients,
      recipeInstructions: recipeInstructions
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
var readRecipe = function readRecipe(recipeId) {
  return fetch("/Recipes/".concat(recipeId), {
    method: "GET"
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

/***/ }),

/***/ "./src/user.js":
/*!*********************!*\
  !*** ./src/user.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userLogin": () => (/* binding */ userLogin),
/* harmony export */   "userLogout": () => (/* binding */ userLogout)
/* harmony export */ });
var userLogin = function userLogin(username) {
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
var userLogout = function userLogout() {
  return fetch('/logout', {
    method: 'POST',
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
  !*** ./src/recipes.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RecipesList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecipesList */ "./src/RecipesList.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/user.js");


var display_list = document.querySelector(".recipe-list"); //let local_recipes 
//let local_username

var errMsgs = {
  // translate error codes to human-friendly messages
  'network-error': 'There was a problem connecting to the network, try again',
  'invalid-input': 'There was a proble with your input, only allow English characters',
  'login-required': 'Please Log in',
  'missing-id': "Unkown recipe id",
  'missing-name': 'Please do not have whitespaces or use empty name',
  'no-dog': 'Not use `dog` as your username',
  'invalid-name': 'Please try other name (upper and lower case A-Z, numbers, and underscore)',
  'missing-information': 'All textareas are required'
};

function updateloginStatus(message) {
  var login_status = document.querySelector('.login-status');
  login_status.innerText = message;
}

function updateNewRecipeStatus(message) {
  var newrecipe_status = document.querySelector('.newrecipestatus');
  newrecipe_status.innerText = message;
}

function updatedisplayStatus(message) {
  var details_status = document.querySelector('.details-status');
  details_status.innerText = message;
}

function updateStatus(message) {
  var status = document.querySelector(".list-status");
  status.innerText = message;
}

(0,_RecipesList__WEBPACK_IMPORTED_MODULE_0__.getPageWithoutLogin)().then(function (_ref) {
  var username = _ref.username,
      recipes_list = _ref.recipes_list;

  //console.log({username,recipes_list})
  if (!username) {
    showLoginButton();
    showLoginDialog();
    UserLoginCancel();
    rendRecipePage(recipes_list);
  } else {
    ableAdd();
    newRecipeDialog();
    closeRecipeDialog();
    rendUserPanel(username);
    rendRecipePage(recipes_list);
    UserLogout();
  }

  updateStatus(' ');
})["catch"](function (err) {
  console.log(err);
  updateStatus(errMsgs[err.error] || err.error);
});

function showLoginButton() {
  var user_panel = document.querySelector(".user");
  var login_button = document.createElement("BUTTON");
  login_button.innerHTML = "Login";
  login_button.classList.add("Login");
  user_panel.appendChild(login_button);
}

function showLoginDialog() {
  var login_page = document.querySelector(".Login");
  login_page.addEventListener('click', function (e) {
    var login_dialog = document.querySelector('.loginpage');
    login_dialog.showModal();
  });
}

function UserLoginCancel() {
  var login_cancel_button = document.querySelector('.login-cancel');
  login_cancel_button.addEventListener('click', function (e) {
    var login_dialog = document.querySelector('.loginpage');
    login_dialog.close();
    document.querySelector(".username").value = '';
    updateloginStatus(' ');
  });
}

function closeLoginPage() {
  var login_dialog = document.querySelector('.loginpage');
  login_dialog.close();
} //submitNewRecipe(local_username)


submitNewRecipe();
UserLogin();

function UserLogin() {
  var login_button = document.querySelector('.login');
  login_button.addEventListener('click', function (e) {
    var username = document.querySelector(".username").value;
    (0,_user__WEBPACK_IMPORTED_MODULE_1__.userLogin)(username).then(function (_ref2) {
      var username = _ref2.username,
          recipes_list = _ref2.recipes_list;
      document.querySelector(".username").value = '';
      closeLoginPage();
      rendUserPanel(username);
      rendRecipePage(recipes_list);
      ableAdd();
      newRecipeDialog();
      closeRecipeDialog();
      UserLogout();
      updateloginStatus(' ');
    })["catch"](function (err) {
      console.log(err);
      updateloginStatus(errMsgs[err.error] || err.error);
    });
  });
}

function UserLogout() {
  var logout_button = document.querySelector('.Logout');
  logout_button.addEventListener('click', function (e) {
    (0,_user__WEBPACK_IMPORTED_MODULE_1__.userLogout)().then(function (_ref3) {
      var recipes_list = _ref3.recipes_list;
      var user_panel = document.querySelector(".user");
      user_panel.innerHTML = '';
      showLoginButton();
      showLoginDialog();
      UserLoginCancel();
      disableAdd();
      rendRecipePage(recipes_list);
      updateStatus(' ');
    })["catch"](function (err) {
      console.log(err);
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function newRecipeDialog() {
  var add = document.querySelector(".addRecipe");
  add.addEventListener("click", function (e) {
    var input_dialog = document.querySelector(".input_dialog");
    input_dialog.showModal();
  });
}

function closeRecipeDialog() {
  var add_cancel = document.querySelector('.addNew_cancel');
  add_cancel.addEventListener('click', function (e) {
    var input_dialog = document.querySelector(".input_dialog");
    input_dialog.close();
    document.querySelector('.input_title').value = '';
    document.querySelector('.input_ingredients').value = '';
    document.querySelector('.input_instructions').value = '';
    updateNewRecipeStatus(' ');
  });
}

function submitNewRecipe() {
  //console.log("calling submitNewRecipe(recipeAuthor)")
  var submit_button = document.querySelector(".addNew_submit");
  submit_button.addEventListener('click', function (e) {
    var recipeTitle = document.querySelector('.input_title').value;
    var recipeIngredients = document.querySelector('.input_ingredients').value;
    var recipeInstructions = document.querySelector('.input_instructions').value; //console.log({recipeTitle,recipeIngredients,recipeInstructions})

    (0,_RecipesList__WEBPACK_IMPORTED_MODULE_0__.addNewRecipe)({
      recipeTitle: recipeTitle,
      recipeIngredients: recipeIngredients,
      recipeInstructions: recipeInstructions
    }).then(function (_ref4) {
      var new_item = _ref4.new_item,
          recipes_list = _ref4.recipes_list;
      rendRecipePage(recipes_list);
      updateNewRecipeStatus(' ');
      var input_dialog = document.querySelector(".input_dialog");
      input_dialog.close();
      document.querySelector('.input_title').value = '';
      document.querySelector('.input_ingredients').value = '';
      document.querySelector('.input_instructions').value = '';
      var demo = document.querySelector(".dialog-demo");
      var demo_details = document.querySelector(".dialog-details");
      demo_details.innerHTML += "\n                <p>Title: </p>\n                <p>".concat(new_item.recipeTitle, "</p>\n                <p>Author: </p>\n                <p>").concat(new_item.recipeAuthor, "</p>\n                <p>Ingredients: </p>\n                <p>").concat(new_item.recipeIngredients, "</p>\n                <p>Instructions: </p>\n                <p>").concat(new_item.recipeInstructions, "</p>");
      demo.showModal();
    })["catch"](function (err) {
      console.log(err);
      updateNewRecipeStatus(errMsgs[err.error] || err.error);
    });
  });
}

readDetails();
backtoHome();

function readDetails() {
  var list = document.querySelector(".recipe-list");
  list.addEventListener('click', function (e) {
    e.preventDefault();

    if (!e.target.classList.contains("ref-link")) {
      return;
    }

    var recipeId = e.target.dataset.index; //console.log(recipeId)

    (0,_RecipesList__WEBPACK_IMPORTED_MODULE_0__.readRecipe)(recipeId).then(function (_ref5) {
      var recipeTitle = _ref5.recipeTitle,
          recipeAuthor = _ref5.recipeAuthor,
          recipeIngredients = _ref5.recipeIngredients,
          recipeInstructions = _ref5.recipeInstructions;
      var demo = document.querySelector(".dialog-demo");
      var demo_details = document.querySelector(".dialog-details");
      updatedisplayStatus(' ');
      updateStatus(' ');
      demo_details.innerHTML += "\n                <p>Title: </p>\n                <p>".concat(recipeTitle, "</p>\n                <p>Author: </p>\n                <p>").concat(recipeAuthor, "</p>\n                <p>Ingredients: </p>\n                <p>").concat(recipeIngredients, "</p>\n                <p>Instructions: </p>\n                <p>").concat(recipeInstructions, "</p>");
      demo.showModal();
    })["catch"](function (err) {
      console.log(err);
      updatedisplayStatus(errMsgs[err.error] || err.error);
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function backtoHome() {
  var bth = document.querySelector(".bth-button");
  bth.addEventListener('click', function (e) {
    e.preventDefault();
    var demo = document.querySelector(".dialog-demo");
    demo.close();
    var demo_details = document.querySelector(".dialog-details");
    demo_details.innerHTML = '';
  });
}

function ableAdd() {
  var input_panel = document.querySelector(".input_panel");
  input_panel.innerHTML = '';
  var input_button = document.createElement("BUTTON");
  input_button.innerHTML = "New Recipe";
  input_button.classList.add("addRecipe");
  input_panel.appendChild(input_button);
}

function disableAdd() {
  var input_panel = document.querySelector(".input_panel");
  input_panel.innerHTML = '';
}

function rendUserPanel(username) {
  var user_panel = document.querySelector(".user");
  user_panel.innerHTML = '';
  var logout_button = document.createElement("BUTTON");
  logout_button.innerHTML = "Logout";
  logout_button.classList.add("Logout");
  var Hello_msg = document.createElement("p");
  Hello_msg.innerHTML = "Hello, ".concat(username);
  user_panel.appendChild(Hello_msg);
  user_panel.appendChild(logout_button);
}

function rendRecipePage(list) {
  //console.log(list)
  var html_data = '';

  for (var item_index in list) {
    var recipeAuthor = list[item_index].recipeAuthor;
    var recipeId = list[item_index].recipeId; // const recipeIngredients = list[item_index].recipeIngredients
    // const recipeInstructions = list[item_index].recipeInstructions

    var recipeTitle = list[item_index].recipeTitle;
    html_data += "\n        <li>\n            <div class=\"item\">\n                <span class=\"recipe-title\" data-index=\"".concat(recipeId, "\"><a class=\"ref-link\" data-index=\"").concat(recipeId, "\" href = /Recipes?recipeId=").concat(recipeId, ">").concat(recipeTitle, "</a></span>\n                <br>\n                <span class=\"recipe-author\" data-index=\"").concat(recipeAuthor, "\">Author: ").concat(recipeAuthor, "</span>\n            </div>\n        </li>\n        ");
  }

  display_list.innerHTML = html_data;
}
})();

/******/ })()
;
//# sourceMappingURL=recipes.js.map