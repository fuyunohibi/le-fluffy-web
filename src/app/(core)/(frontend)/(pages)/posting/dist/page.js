"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var notification_1 = require("../../components/shared/notification/notification");
var check_icon_1 = require("../../components/shared/icon/check-icon");
var failed_notification_1 = require("../../components/shared/notification/failed-notification");
var x_mark_icon_1 = require("../../components/shared/icon/x-mark-icon");
var background_gradient_1 = require("../../components/shared/card/background-gradient");
var navigation_1 = require("next/navigation");
var defaultFormData = {
    image: "",
    name: "",
    description: "",
    sex: "",
    age: "0",
    species: "",
    reward: "0"
};
var PostingPage = function () {
    var _a = react_1.useState(defaultFormData), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(false), notification = _b[0], setNotification = _b[1];
    var _c = react_1.useState(false), failedNotification = _c[0], setFailedNotification = _c[1];
    var router = navigation_1.useRouter();
    var handleChange = function (e) {
        var _a, _b;
        var _c = e.target, name = _c.name, value = _c.value;
        if (name === "age" || name === "reward") {
            setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
        }
        else {
            setFormData(__assign(__assign({}, formData), (_b = {}, _b[name] = value, _b)));
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formDataToSubmit, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    formDataToSubmit = __assign(__assign({}, formData), { age: parseFloat(formData.age) || 0, reward: parseFloat(formData.reward) || 0 });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/posts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: formDataToSubmit.name,
                                species: formDataToSubmit.species,
                                sex: formDataToSubmit.sex,
                                age: formDataToSubmit.age,
                                description: formDataToSubmit.description,
                                reward: formDataToSubmit.reward,
                                photo: formDataToSubmit.image,
                                status: "MISSING"
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        setNotification(true);
                        setFormData(defaultFormData);
                        setTimeout(function () {
                            setNotification(false);
                        }, 3000);
                        router.push("/");
                    }
                    else {
                        setFailedNotification(true);
                        setTimeout(function () {
                            setFailedNotification(false);
                        }, 3000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setFailedNotification(true);
                    setTimeout(function () {
                        setFailedNotification(false);
                    }, 3000);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("section", { className: "min-h-screen flex justify-center items-center pt-12" },
        react_1["default"].createElement(background_gradient_1.BackgroundGradient, { className: "bg-white p-10 rounded-3xl shadow-lg w-[60rem] mx-auto" },
            react_1["default"].createElement("div", { className: "mb-6 text-center" },
                react_1["default"].createElement("h1", { className: "text-4xl font-extrabold text-gray-800" }, "Post your missing pet \uD83D\uDC08"),
                react_1["default"].createElement("p", { className: "text-gray-600 mt-3" }, "Help us find your missing pet by posting their details here.")),
            react_1["default"].createElement("form", { className: "space-y-6 flex flex-col justify-center", onSubmit: handleSubmit },
                react_1["default"].createElement("div", { className: "flex justify-between items-start space-x-10" },
                    react_1["default"].createElement("div", { className: "w-full" },
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "image", className: "block text-sm font-bold text-gray-700 mb-2" }, "Image URL"),
                            react_1["default"].createElement("input", { type: "url", name: "image", id: "image", value: formData.image, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", placeholder: "https://example.com/image.jpg", required: true })),
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "name", className: "block text-sm font-bold text-gray-700 mb-2" }, "Name"),
                            react_1["default"].createElement("input", { type: "text", name: "name", id: "name", value: formData.name, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", placeholder: "Milo", required: true })),
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "description", className: "block text-sm font-bold text-gray-700 mb-2" }, "Description"),
                            react_1["default"].createElement("textarea", { name: "description", id: "description", value: formData.description, onChange: handleChange, className: "w-full px-4 py-2 rounded-2xl shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", rows: 4, placeholder: "A happy-go-lucky Labrador Retriever with a love for water.", required: true })),
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "sex", className: "block text-sm font-bold text-gray-700 mb-2" }, "Sex"),
                            react_1["default"].createElement("select", { name: "sex", id: "sex", value: formData.sex, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", required: true },
                                react_1["default"].createElement("option", { value: "" }, "Select sex"),
                                react_1["default"].createElement("option", { value: "Male" }, "Male"),
                                react_1["default"].createElement("option", { value: "Female" }, "Female")))),
                    react_1["default"].createElement("div", { className: "w-full" },
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "age", className: "block text-sm font-bold text-gray-700 mb-2" }, "Age"),
                            react_1["default"].createElement("input", { type: "number", step: "any", name: "age", id: "age", value: formData.age, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", placeholder: "2.5", required: true })),
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "species", className: "block text-sm font-bold text-gray-700 mb-2" }, "Species"),
                            react_1["default"].createElement("input", { type: "text", name: "species", id: "species", value: formData.species, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", placeholder: "Dog", required: true })),
                        react_1["default"].createElement("div", { className: "relative mb-4" },
                            react_1["default"].createElement("label", { htmlFor: "reward", className: "block text-sm font-bold text-gray-700 mb-2" }, "Reward"),
                            react_1["default"].createElement("input", { type: "number", step: "any", name: "reward", id: "reward", min: "0", value: formData.reward, onChange: handleChange, className: "w-full px-4 py-2 rounded-full shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-100", placeholder: "5000 bath" })))),
                react_1["default"].createElement("button", { type: "submit", className: "w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105" }, "Post"))),
        react_1["default"].createElement(notification_1["default"], { visible: notification, icon: react_1["default"].createElement(check_icon_1["default"], null) }),
        react_1["default"].createElement(failed_notification_1["default"], { visible: failedNotification, icon: react_1["default"].createElement(x_mark_icon_1["default"], null) })));
};
exports["default"] = PostingPage;
