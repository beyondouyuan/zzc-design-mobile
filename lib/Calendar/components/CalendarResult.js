'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../../_util/config');

var _config2 = _interopRequireDefault(_config);

var _getWeek = require('../util/getWeek');

var _getWeek2 = _interopRequireDefault(_getWeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarResult = function (_PureComponent) {
    (0, _inherits3.default)(CalendarResult, _PureComponent);

    function CalendarResult(props) {
        (0, _classCallCheck3.default)(this, CalendarResult);
        return (0, _possibleConstructorReturn3.default)(this, (CalendarResult.__proto__ || (0, _getPrototypeOf2.default)(CalendarResult)).call(this, props));
    }

    (0, _createClass3.default)(CalendarResult, [{
        key: 'createLeft',
        value: function createLeft(startTime, endTime) {
            if (startTime && endTime) {
                return _react2.default.createElement(
                    'div',
                    { className: 'left' },
                    _react2.default.createElement(
                        'p',
                        { className: 'title' },
                        this.props.i18n.left_title
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'time' },
                        startTime.M + 1,
                        '\u6708',
                        startTime.D
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'week' },
                        '\u5468',
                        (0, _getWeek2.default)(startTime.w, this.props.lang)
                    )
                );
            } else if (startTime) {
                return _react2.default.createElement(
                    'div',
                    { className: 'left' },
                    _react2.default.createElement(
                        'p',
                        { className: 'time' },
                        startTime.M + 1,
                        '\u6708',
                        startTime.D
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'left' },
                    _react2.default.createElement(
                        'p',
                        { className: 'placeholder' },
                        this.props.i18n.left_placeholder
                    )
                );
            }
        }
    }, {
        key: 'createRight',
        value: function createRight(startTime, endTime) {
            if (startTime && endTime) {
                return _react2.default.createElement(
                    'div',
                    { className: 'right' },
                    _react2.default.createElement(
                        'p',
                        { className: 'title' },
                        this.props.i18n.right_title
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'time' },
                        endTime.M + 1,
                        '\u6708',
                        endTime.D
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'week' },
                        '\u5468',
                        (0, _getWeek2.default)(endTime.w, this.props.lang)
                    )
                );
            } else if (startTime) {
                return _react2.default.createElement(
                    'div',
                    { className: 'right' },
                    _react2.default.createElement(
                        'p',
                        { className: 'placeholder' },
                        this.props.i18n.right_placeholder
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'createCenter',
        value: function createCenter(startTime, endTime) {
            if (startTime && endTime) {
                return _react2.default.createElement(
                    'div',
                    { className: 'center' },
                    _react2.default.createElement(
                        'p',
                        { className: 'day' },
                        Math.ceil((endTime.t - startTime.t) / 86400000),
                        '\u5929'
                    )
                );
            }
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                startTime = _props.startTime,
                endTime = _props.endTime;

            return _react2.default.createElement(
                'div',
                { className: prefixCls + '-result-box' },
                this.createLeft(startTime, endTime),
                this.createCenter(startTime, endTime),
                this.createRight(startTime, endTime)
            );
        }
    }]);
    return CalendarResult;
}(_react.PureComponent);

exports.default = CalendarResult;

CalendarResult.defaultProps = {
    prefixCls: _config2.default.cls + '-calendar'
};