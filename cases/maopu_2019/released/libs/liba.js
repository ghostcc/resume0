//uuid
function serviceuu() {
    if (!jsonDatas()['uuid']) {
        return service("service/index.php?action=getUUid", {})
            .then(function (json) {
                var info = jsonDatas();
                info['uuid'] = json.uuid;

                jsonDatas(info);
            })
    }
}

//提交分数
function sservice(url, data) {
    var date = Math.floor(new Date().valueOf() / 1000);
    data.d = date;
    data.s = md5('' + data.score + "" + data.d);
    return service(url, data).then(function (json) {
        if (json.code == 0) {
            var info = jsonDatas();
            info['uname'] = data.uname;
            info['mobile'] = data.mobile;
            info['score'] = json.score;
            info['rank'] = json.rank;
            info['uid'] = json.uid;

            console.log(JSON.stringify(info));
            jsonDatas(info)
        }
        return json;
    })
}

function service(url, data) {
    var info = jsonDatas();
    data = $.extend(data, {
        r: Math.random(),
        uuid: info.uuid,
    });
    return $.post(
        url,
        data
    ).then(function (j) {
        return JSON.parse(j);
    })
}


function jsonDatas(data) {
    if (data) {
        localStorage['2019maopuGame'] = JSON.stringify(data);
    }
    return localStorage['2019maopuGame'] ? JSON.parse(localStorage['2019maopuGame']) : {};
}
