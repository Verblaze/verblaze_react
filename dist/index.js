function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function (t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}

var TranslationCache = /*#__PURE__*/function () {
  function TranslationCache() {}
  TranslationCache.saveTranslations = function saveTranslations(translations) {
    try {
      var _this = this;
      try {
        var serializedTranslations = JSON.stringify(Array.from(translations.entries()));
        localStorage.setItem(_this.TRANSLATIONS_KEY, serializedTranslations);
      } catch (error) {
        console.error('Translation cache save error:', error);
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  TranslationCache.getTranslations = function getTranslations() {
    try {
      var _this2 = this;
      try {
        var serializedTranslations = localStorage.getItem(_this2.TRANSLATIONS_KEY);
        if (!serializedTranslations) return Promise.resolve(null);
        var entries = JSON.parse(serializedTranslations);
        return Promise.resolve(new Map(entries));
      } catch (error) {
        console.error('Translation cache get error:', error);
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };
  TranslationCache.saveCurrentLanguage = function saveCurrentLanguage(language) {
    try {
      var _this3 = this;
      try {
        localStorage.setItem(_this3.CURRENT_LANGUAGE_KEY, JSON.stringify(language));
      } catch (error) {
        console.error('Current language save error:', error);
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  TranslationCache.getCurrentLanguage = function getCurrentLanguage() {
    try {
      var _this4 = this;
      try {
        var serializedLanguage = localStorage.getItem(_this4.CURRENT_LANGUAGE_KEY);
        if (!serializedLanguage) return Promise.resolve(null);
        return Promise.resolve(JSON.parse(serializedLanguage));
      } catch (error) {
        console.error('Current language get error:', error);
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };
  TranslationCache.clearCache = function clearCache() {
    try {
      var _this5 = this;
      try {
        localStorage.removeItem(_this5.TRANSLATIONS_KEY);
      } catch (error) {
        console.error('Cache clear error:', error);
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return TranslationCache;
}();
TranslationCache.TRANSLATIONS_KEY = 'verblaze_translations';
TranslationCache.CURRENT_LANGUAGE_KEY = 'verblaze_current_language';

var VerblazeException = /*#__PURE__*/function (_Error) {
  function VerblazeException(message) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.name = 'VerblazeException';
    return _this;
  }
  _inheritsLoose(VerblazeException, _Error);
  return VerblazeException;
}(/*#__PURE__*/_wrapNativeSuper(Error));

var TranslationManager = /*#__PURE__*/function () {
  function TranslationManager() {
    this.translations = new Map();
    this.currentLanguage = null;
    this.supportedLanguages = [];
    this.baseLanguage = null;
    this.apiKey = null;
    this.baseUrl = 'https://api.verblaze.com/v1';
  }
  TranslationManager.getInstance = function getInstance() {
    if (!this.instance) {
      this.instance = new TranslationManager();
    }
    return this.instance;
  };
  var _proto = TranslationManager.prototype;
  _proto.configure = function configure(apiKey) {
    try {
      var _this = this;
      _this.apiKey = apiKey;
      return Promise.resolve(_this.checkVersion()).then(function () {
        return Promise.resolve(_this.fetchSupportedLanguages()).then(function () {
          return Promise.resolve(TranslationCache.getCurrentLanguage()).then(function (savedLanguage) {
            if (savedLanguage) {
              _this.currentLanguage = savedLanguage;
            }
            return Promise.resolve(_this.fetchTranslations()).then(function () {});
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.checkVersion = function checkVersion() {
    try {
      var _this2 = this;
      return Promise.resolve(_catch(function () {
        var currentVersion = localStorage.getItem('verblaze_translation_version') || '1';
        return Promise.resolve(fetch(_this2.baseUrl + "/version-check", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': _this2.apiKey
          },
          body: JSON.stringify({
            currentVersion: parseInt(currentVersion),
            platform: 'react'
          })
        })).then(function (response) {
          var _temp2 = function () {
            if (response.ok) {
              return Promise.resolve(response.json()).then(function (data) {
                var _temp = function () {
                  if (data.data.needsUpdate) {
                    localStorage.setItem('verblaze_translation_version', data.data.latestVersion);
                    return Promise.resolve(_this2.fetchTranslations()).then(function () {
                      return Promise.resolve(TranslationCache.clearCache()).then(function () {});
                    });
                  }
                }();
                if (_temp && _temp.then) return _temp.then(function () {});
              });
            }
          }();
          if (_temp2 && _temp2.then) return _temp2.then(function () {});
        });
      }, function (error) {
        throw new VerblazeException("Version check failed: " + error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.fetchSupportedLanguages = function fetchSupportedLanguages() {
    try {
      var _this3 = this;
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetch(_this3.baseUrl + "/supported-languages", {
          headers: {
            'x-api-key': _this3.apiKey
          }
        })).then(function (response) {
          var _temp3 = function () {
            if (response.ok) {
              return Promise.resolve(response.json()).then(function (data) {
                _this3.supportedLanguages = data.data.supportedLanguages;
                _this3.baseLanguage = data.data.baseLanguage;
              });
            }
          }();
          if (_temp3 && _temp3.then) return _temp3.then(function () {});
        });
      }, function (error) {
        throw new VerblazeException("Failed to fetch supported languages: " + error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.fetchTranslations = function fetchTranslations() {
    try {
      var _this4 = this;
      return Promise.resolve(_catch(function () {
        return Promise.resolve(TranslationCache.getTranslations()).then(function (cachedTranslations) {
          if (cachedTranslations) {
            console.log('Using cached translations:', cachedTranslations);
            _this4.translations = cachedTranslations;
            return;
          }
          console.log('Fetching translations for languages:', _this4.supportedLanguages);
          return Promise.resolve(fetch(_this4.baseUrl + "/translations/multiple", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': _this4.apiKey
            },
            body: JSON.stringify({
              languages: _this4.supportedLanguages.map(function (lang) {
                return lang.code;
              })
            })
          })).then(function (response) {
            console.log('Translation API Response Status:', response.status);
            var _temp4 = function () {
              if (response.ok) {
                return Promise.resolve(response.json()).then(function (data) {
                  console.log('Raw API Response:', data);
                  var translations = new Map();
                  var translationsData = data.data.translations;
                  console.log('Parsed translations data:', translationsData);
                  for (var _i = 0, _Object$entries = Object.entries(translationsData); _i < _Object$entries.length; _i++) {
                    var _Object$entries$_i = _Object$entries[_i],
                      langCode = _Object$entries$_i[0],
                      translationList = _Object$entries$_i[1];
                    console.log("Processing language: " + langCode, translationList);
                    if (Array.isArray(translationList)) {
                      for (var _iterator = _createForOfIteratorHelperLoose(translationList), _step; !(_step = _iterator()).done;) {
                        var file = _step.value;
                        var key = file.file_key + "_" + langCode;
                        console.log("Adding translation file: " + key, file);
                        translations.set(key, {
                          fileTitle: file.file_title,
                          fileKey: file.file_key,
                          values: file.values
                        });
                      }
                    } else {
                      console.warn("Invalid translation list for language " + langCode + ":", translationList);
                    }
                  }
                  console.log('Final translations map:', translations);
                  _this4.translations = translations;
                  return Promise.resolve(TranslationCache.saveTranslations(translations)).then(function () {});
                });
              } else {
                return Promise.resolve(response.text()).then(function (_response$text) {
                  console.error('Translation API Error:', _response$text);
                });
              }
            }();
            if (_temp4 && _temp4.then) return _temp4.then(function () {});
          });
        });
      }, function (error) {
        console.error('Translation fetch error:', error);
        throw new VerblazeException("Failed to fetch translations: " + error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getTranslation = function getTranslation(key, language) {
    var _this$currentLanguage, _this$baseLanguage, _this$currentLanguage2, _this$baseLanguage2;
    var langCode = language || ((_this$currentLanguage = this.currentLanguage) === null || _this$currentLanguage === void 0 ? void 0 : _this$currentLanguage.code) || ((_this$baseLanguage = this.baseLanguage) === null || _this$baseLanguage === void 0 ? void 0 : _this$baseLanguage.code);
    console.log('Getting translation:', {
      key: key,
      requestedLanguage: language,
      currentLanguage: (_this$currentLanguage2 = this.currentLanguage) === null || _this$currentLanguage2 === void 0 ? void 0 : _this$currentLanguage2.code,
      baseLanguage: (_this$baseLanguage2 = this.baseLanguage) === null || _this$baseLanguage2 === void 0 ? void 0 : _this$baseLanguage2.code,
      resolvedLanguage: langCode
    });
    if (!langCode) throw new VerblazeException('No language selected');
    var _key$split = key.split('.'),
      fileKey = _key$split[0],
      translationKey = _key$split[1];
    var translationFileKey = fileKey + "_" + langCode;
    console.log('Looking up translation:', {
      fileKey: fileKey,
      translationKey: translationKey,
      translationFileKey: translationFileKey,
      availableTranslations: Array.from(this.translations.keys())
    });
    var translationFile = this.translations.get(translationFileKey);
    if (!translationFile) {
      console.warn('Translation file not found:', {
        fileKey: fileKey,
        langCode: langCode,
        availableFiles: Array.from(this.translations.keys())
      });
      throw new VerblazeException("Translation file not found for key: " + fileKey + " in language: " + langCode);
    }
    var translation = translationFile.values[translationKey];
    if (!translation) {
      console.warn('Translation key not found:', {
        translationKey: translationKey,
        fileKey: fileKey,
        availableKeys: Object.keys(translationFile.values)
      });
      throw new VerblazeException("Translation key not found: " + translationKey + " in file: " + fileKey);
    }
    return translation;
  };
  _proto.setLanguage = function setLanguage(languageCode) {
    try {
      var _this5 = this;
      var language = _this5.supportedLanguages.find(function (lang) {
        return lang.code === languageCode;
      });
      if (!language) {
        throw new VerblazeException("Language not supported: " + languageCode);
      }
      _this5.currentLanguage = language;
      return Promise.resolve(TranslationCache.saveCurrentLanguage(language)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getSupportedLanguages = function getSupportedLanguages() {
    return this.supportedLanguages;
  };
  _proto.getCurrentLanguage = function getCurrentLanguage() {
    return this.currentLanguage;
  };
  return TranslationManager;
}();

var VerblazeContext = React.createContext(undefined);
var VerblazeProvider = function VerblazeProvider(_ref) {
  var children = _ref.children,
    apiKey = _ref.apiKey;
  var _useState = React.useState(false),
    isConfigured = _useState[0],
    setIsConfigured = _useState[1];
  var _useState2 = React.useState(null),
    currentLanguage = _useState2[0],
    setCurrentLanguage = _useState2[1];
  var _useState3 = React.useState([]),
    supportedLanguages = _useState3[0],
    setSupportedLanguages = _useState3[1];
  var manager = TranslationManager.getInstance();
  React.useEffect(function () {
    var initialize = function initialize() {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(manager.configure(apiKey)).then(function () {
            setIsConfigured(true);
            setCurrentLanguage(manager.getCurrentLanguage());
            setSupportedLanguages(manager.getSupportedLanguages());
          });
        }, function (error) {
          console.error('Verblaze initialization error:', error);
        });
        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    initialize();
  }, [apiKey]);
  var setLanguage = function setLanguage(languageCode) {
    try {
      return Promise.resolve(manager.setLanguage(languageCode)).then(function () {
        setCurrentLanguage(manager.getCurrentLanguage());
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var translate = function translate(key, language) {
    try {
      return manager.getTranslation(key, language);
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };
  return React__default.createElement(VerblazeContext.Provider, {
    value: {
      isConfigured: isConfigured,
      currentLanguage: currentLanguage,
      supportedLanguages: supportedLanguages,
      setLanguage: setLanguage,
      translate: translate
    }
  }, children);
};
var useVerblaze = function useVerblaze() {
  var context = React.useContext(VerblazeContext);
  if (context === undefined) {
    throw new Error('useVerblaze must be used within a VerblazeProvider');
  }
  return context;
};
var vbt = function vbt(key, language) {
  var context = useVerblaze();
  return context.translate(key, language);
};

exports.VerblazeProvider = VerblazeProvider;
exports.useVerblaze = useVerblaze;
exports.vbt = vbt;
//# sourceMappingURL=index.js.map
