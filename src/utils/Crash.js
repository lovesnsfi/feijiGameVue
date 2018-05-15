/**
 * @name 碰撞检测，true为碰撞，false为未发生碰撞
 * @returns Boolean
 * @param {Object} obj1 第一个游戏对象
 * @param {Object} obj2 第二个游戏对象
 */
export default function Crash(obj1, obj2) {
    if (obj1.x + obj1.width < obj2.x ||
        obj2.y + obj2.height < obj1.y ||
        obj2.x + obj2.width < obj1.x ||
        obj1.y + obj1.height < obj2.y) {
        return false; //没有发生碰撞
    } else {
        return true; //发生碰撞
    }
}