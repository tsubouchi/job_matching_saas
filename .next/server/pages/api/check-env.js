"use strict";
(() => {
var exports = {};
exports.id = 474;
exports.ids = [474];
exports.modules = {

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 1306:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// pages/api/check-env.js
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
        // 環境変数の状態を確認
        const geminiApiKey = process.env.GEMINI_API_KEY ? true : false;
        const firebaseUrl = process.env.FIREBASE_DATABASE_URL ? true : false;
        // レスポンスを返す（実際のキー値は返さない）
        return res.status(200).json({
            geminiApiKey,
            firebaseUrl
        });
    } catch (error) {
        console.error("Check Environment Variables Error:", error);
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
var __webpack_exports__ = (__webpack_exec__(1306));
module.exports = __webpack_exports__;

})();