/**
 * 
 * @param {Object} value 需要删除的元素 
 */
Array.prototype.removeByValue = function(value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === value) {
            this.splice(i, 1);
            break;
            //注意，在此处添加了break以后，只会删除第一个匹配的元素
        }
    }
}