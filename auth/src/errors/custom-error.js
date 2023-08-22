

class CustomError extends Error {
    constructor(message) {
        super(message);
    }

  

    // Abstract method to define in child classes
    serializeErrors() {
        return [{ message: this.message }];
    }
}

module.exports = {CustomError};

