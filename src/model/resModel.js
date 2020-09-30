class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            //data是一个对象 message是一个字符串 如果第一个就是一个字符串的话 就把data赋值给message
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}
module.exports={
    SuccessModel,
    ErrorModel
}
