'use strict';

var privateClassElements = require('acorn-private-class-elements');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var privateClassElements__default = /*#__PURE__*/_interopDefaultLegacy(privateClassElements);

// eslint-disable-next-line node/no-unsupported-features/es-syntax

// eslint-disable-next-line node/no-unsupported-features/es-syntax
function privateMethods(Parser) {
  const ExtendedParser = privateClassElements__default['default'](Parser);

  return class extends ExtendedParser {
    // Parse private methods
    parseClassElement(_constructorAllowsSuper) {
      const oldInClassMemberName = this._inClassMemberName;
      this._inClassMemberName = true;
      const result = super.parseClassElement.apply(this, arguments);
      this._inClassMemberName = oldInClassMemberName;
      return result
    }

    parsePropertyName(prop) {
      const isPrivate = this.options.ecmaVersion >= 8 && this._inClassMemberName && this.type == this.privateIdentifierToken && !prop.static;
      this._inClassMemberName = false;
      if (!isPrivate) return super.parsePropertyName(prop)
      return this.parsePrivateClassElementName(prop)
    }
  }
}

module.exports = privateMethods;
//# sourceMappingURL=acorn-private-methods.js.map
