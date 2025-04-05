"use strict";
(() => {
var exports = {};
exports.id = 281;
exports.ids = [281];
exports.modules = {

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 4324:
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ 6666:
/***/ ((module) => {

module.exports = require("firebase/database");

/***/ }),

/***/ 5674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9074);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_firebase__WEBPACK_IMPORTED_MODULE_0__);
// pages/api/chat-history.js

// .envファイルから環境変数を読み込む
(__webpack_require__(5142).config)({
    path: "./config/.env"
});
async function handler(req, res) {
    // GETリクエストのみを許可
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    try {
        const { chatId  } = req.query;
        // 必須パラメータのチェック
        if (!chatId) {
            return res.status(400).json({
                error: "Missing required parameter: chatId"
            });
        }
        // チャット履歴を取得
        const history = await (0,_lib_firebase__WEBPACK_IMPORTED_MODULE_0__.getChatHistory)(chatId);
        // レスポンスを返す
        return res.status(200).json(history);
    } catch (error) {
        console.error("Chat History API Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [74], () => (__webpack_exec__(5674)));
module.exports = __webpack_exports__;

})();