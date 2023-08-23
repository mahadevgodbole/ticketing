

// class CustomError extends Error {
//     constructor(message) {
//         super(message);
//     }

  

//     // Abstract method to define in child classes
//     serializeErrors() {
//         return [{ message: this.message }];
//     }
// }


class CustomError extends Error {
    constructor(message) {
        if (new.target === CustomError) {
            throw new TypeError("Cannot instantiate abstract class");
        }
        super(message);
    }

    serializeErrors() {
        throw new Error("Abstract method serializeErrors must be overridden");
    }
}


module.exports = {CustomError};

