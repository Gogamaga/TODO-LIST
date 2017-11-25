var timestamp = require('time-stamp');
var rn = require('random-number').generator({
    min : 10000,
    max : 1000000,
    integer : true
})
module.exports = {
    cookieValue : () => {
        return rn() + timestamp('ms');
    }
}