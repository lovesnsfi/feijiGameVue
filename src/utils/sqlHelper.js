let db;
export function initDataBase() {
    db = openDatabase("HuYuxiGame", "1.0", "HuYuxiGame", 2 * 1024 * 1024);
    //创建数据表
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS rank (nickName unique,score)");
    });
}

export function insertScore(nickName, score) {
    findByNickName(nickName).then(results => {
        if (results.rows.length == 1) {
            //说明记录存在，说明这个昵称已经存在了
            //存在以后要判断当前的分数与数据库的分数谁大一些
            if (score > results.rows[0].score) {
                db.transaction(function(tx) {
                    //更新分数
                    tx.executeSql("update rank set score=? where nickName=?", [score, nickName], function(tx, results) {
                        if (results.rowsAffected > 0) {
                            console.log("插入成功");
                        }
                    });
                });
            }
        } else {
            //说明当前的昵称不存在，不存在，我就直接插入就可以了
            db.transaction(function(tx) {
                tx.executeSql("insert into rank values (?,?)", [nickName, score], function(tx, results) {
                    if (results.rowsAffected > 0) {
                        console.log("插入成功");
                    }
                });
            });
        }
    })
}

/**
 * 获取排行榜数据列表
 */
export function getScoreList() {
    return new Promise((resolve, reject) => {
        db.transaction(function(tx) {
            tx.executeSql("select * from rank order by score desc limit 0,10", [], function(tx, results) {
                resolve(results);
            });
        });
    })
}


/**
 * @name 根据昵称在数据库查信息
 * @param {String} nickName 昵称 
 */
export function findByNickName(nickName) {
    return new Promise((resolve, reject) => {
        db.transaction(function(tx) {
            tx.executeSql("select * from rank where nickName=?", [nickName], function(tx, results) {
                resolve(results);
            });
        });
    });
}