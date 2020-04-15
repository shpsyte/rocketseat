"use strict";
/**
 *
 * @param params name: Nome, email: Email, passqoed: Hash
 */
Object.defineProperty(exports, "__esModule", { value: true });
function CreateUser(name, email, password) {
    var user = {
        name: name, email: email, password: password
    };
    return user;
}
exports.default = CreateUser;
