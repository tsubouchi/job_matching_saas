"use strict";
(() => {
var exports = {};
exports.id = 170;
exports.ids = [170];
exports.modules = {

/***/ 8809:
/***/ ((module) => {

module.exports = require("@google/generative-ai");

/***/ }),

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

/***/ 8368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1574);
/* harmony import */ var _lib_gemini__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gemini__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9074);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_firebase__WEBPACK_IMPORTED_MODULE_1__);
// pages/api/chat.js


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
        const { message , chatId , userId , title  } = req.body;
        // 必須パラメータのチェック
        if (!message || !userId) {
            return res.status(400).json({
                error: "Missing required parameters"
            });
        }
        let currentChatId = chatId;
        // チャットIDがない場合は新しいチャットを作成
        if (!currentChatId) {
            const chatTitle = title || `Chat ${new Date().toLocaleString()}`;
            const result = await (0,_lib_firebase__WEBPACK_IMPORTED_MODULE_1__.createChat)(userId, chatTitle);
            currentChatId = result.key;
        }
        // ユーザーメッセージを保存
        await (0,_lib_firebase__WEBPACK_IMPORTED_MODULE_1__.saveChatMessage)(currentChatId, userId, message, "user");
        // チャット履歴を取得
        const history = await (0,_lib_firebase__WEBPACK_IMPORTED_MODULE_1__.getChatHistory)(currentChatId);
        // Gemini APIの入力形式に変換
        const formattedHistory = history.map((msg)=>({
                role: msg.role === "user" ? "user" : "model",
                content: msg.message
            }));
        // Gemini APIでレスポンスを生成
        const response = await (0,_lib_gemini__WEBPACK_IMPORTED_MODULE_0__.chatWithHistory)(formattedHistory);
        // アシスタントの応答を保存
        await (0,_lib_firebase__WEBPACK_IMPORTED_MODULE_1__.saveChatMessage)(currentChatId, "assistant", response, "assistant");
        // レスポンスを返す
        return res.status(200).json({
            chatId: currentChatId,
            message: response
        });
    } catch (error) {
        console.error("Chat API Error:", error);
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
var __webpack_exports__ = __webpack_require__.X(0, [74,574], () => (__webpack_exec__(8368)));
module.exports = __webpack_exports__;

})();