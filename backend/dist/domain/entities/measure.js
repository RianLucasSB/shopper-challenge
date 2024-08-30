"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = exports.MeasureType = void 0;
var MeasureType;
(function (MeasureType) {
    MeasureType["WATER"] = "WATER";
    MeasureType["GAS"] = "GAS";
})(MeasureType || (exports.MeasureType = MeasureType = {}));
class Measure {
    props;
    get uuid() {
        return this.props.uuid;
    }
    get customerCode() {
        return this.props.customerCode;
    }
    get date() {
        return this.props.date;
    }
    get type() {
        return this.props.type;
    }
    get value() {
        return this.props.value;
    }
    set value(value) {
        this.props.value = value;
    }
    get isConfirmed() {
        return this.props.isConfirmed;
    }
    set isConfirmed(state) {
        this.props.isConfirmed = state;
    }
    constructor(props) {
        this.props = props;
    }
}
exports.Measure = Measure;
