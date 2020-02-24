class Status {

    message(status, message) {
        return {
            sucess: status,
            message: message
        }
    }
}

module.exports = new Status();