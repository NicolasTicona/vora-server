function _IsNull(...value){
    return value.some(v => v === null || v === "");
}

module.exports = {
    _IsNull
}