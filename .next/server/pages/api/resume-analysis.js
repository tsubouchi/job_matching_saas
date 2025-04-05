"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 8809:
/***/ ((module) => {

module.exports = require("@google/generative-ai");

/***/ }),

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 11:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1574);
/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gemini__WEBPACK_IMPORTED_MODULE_0__);
// pages/api/resume-analysis.js

// .envファイルから環境変数を読み込む
(__webpack_require__(5142).config)({
    path: "./config/.env"
});
async function handler(req, res) {
    // POSTリクエストのみを許可
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    try {
        const { resume , jobDescription  } = req.body;
        // 必須パラメータのチェック
        if (!resume || !jobDescription) {
            return res.status(400).json({
                error: "Missing required parameters"
            });
        }
        // 職務経歴書と求人情報のマッチング分析を実行
        const analysisResult = await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_0__.analyzeResumeMatch)(resume, jobDescription);
        // レスポンスを返す
        return res.status(200).json(analysisResult);
    } catch (error) {
        console.error("Resume Analysis API Error:", error);
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
var __webpack_exports__ = __webpack_require__.X(0, [574], () => (__webpack_exec__(11)));
module.exports = __webpack_exports__;

})();