function checkType(param) {
    let obj = typeof param
	if (obj !== 'object') {
		return obj
	}
    return Object.prototype.toString.call(param).replace(/^\[object (\S+)]$/, '$1')
}



