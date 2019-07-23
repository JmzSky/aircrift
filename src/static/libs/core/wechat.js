// import service from '../service/index'

/**
 * @class
 * 微信操作类
 */
class Wechat {
    /**
     *通过config接口注入权限验证配置
     *debug 开启调试模式
     *appId 公众号的唯一标识
     *timestamp 生成签名的时间戳
     *nonceStr  生成签名的随机串
     *signature 签名
     *jsApiList 需要使用的JS接口列表
     * @param {*} config
     * @memberof Wechat
     */
    init(config) {
        wx.config(config);
    }
    /**
     *分享接口
     *title 分享标题
     *desc  分享描述
     *link  分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     *imgUrl分享图标
     * @param {*} data
     * @memberof Wechat
     */
    share(data, callback) {
        wx.ready(function () {
            //自定义分享给朋友
            wx.updateAppMessageShareData({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: function () {
                    // 设置成功
                    callback && callback()
                }
            })
            //自定义分享到朋友圈
            wx.updateTimelineShareData({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: function () {
                    // 设置成功
                    callback && callback()
                }
            })
        });
    }
    /**
     *获取地理位置
     *latitude 纬度，浮点数，范围为90 ~ -90
     *longitude 经度，浮点数，范围为180 ~ -180。
     *speed 速度，以米/每秒计
     *accuracy 位置精度
     * @memberof Wechat
     * @memberof Wechat
     */
    getLocation(callback) {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                callback && callback(res)
            }
        });
    }
    /**
     *使用微信内置地图查看位置
     *latitude 纬度，浮点数，范围为90 ~ -90
     *longitude 经度，浮点数，范围为180 ~ -180
     *name 位置名
     *address 地址详情说明
     *scale 地图缩放级别,整形值,范围从1~28。默认为最大
     *infoUrl 在查看位置界面底部显示的超链接,可点击跳转
    * @param {*} data
     * @memberof Wechat
     */
    openLocation(data) {
        wx.openLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            name: data.name,
            address: data.address,
            scale: 18,
            infoUrl: data.infoUrl
        });
    }
    /**
     *拍照或从手机相册中选图上传图片
     *count {number} 上传图片个数
     * @param {*} count
     * @param {*} callback
     * @memberof Wechat
     */
    chooseImage(count, callback) {
        wx.chooseImage({
            count: count, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var uploadCount = 0;
                var localIdLength = localIds.length;
                var uploadpic = [];
                var data = [];
                data['localIds'] = localIds;
                var upload = function () {
                    //串行上传
                    wx.uploadImage({
                        localId: localIds[uploadCount],
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            //上传图片接口
                            service.uploadImage({ "mediaId": res.serverId }).then(json => {
                                let img = json.result.img_url
                                //图片ID对应图片路径
                                uploadpic.push(img);
                                uploadCount++;
                                //如果还有照片，继续上传
                                if (uploadCount < localIdLength) {
                                    upload();
                                } else {
                                    callback && callback(uploadpic)
                                }
                            });
                        }
                    });
                };
                upload();
            }
        });
    }
    /**
     *current {string} 当前显示图片的http链接
     *urls {array} 需要预览的图片http链接列表
     * @param {*} data
     * @memberof Wechat
     */
    previewImage(data) {
        wx.previewImage({
            current: data.current,
            urls: data.urls
        });
    }
    /**
     *微信扫一扫
     * @param {*} callback
     * @memberof Wechat
     */
    scanQRCode(callback) {
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr;
                // 当needResult 为 1 时，扫码返回的结果
                callback && callback(result)
            }
        });
    }
    /**
     *vue 非history模式,请在url链接#前加入?号
     *微信内H5调起支付
     *appId 公众号id
     *timeStamp 时间戳
     *nonceStr 随机字符串
     *package 订单详情扩展字符串
     *signType 签名方式
     *paySign 签名
     *返回值说明
     *get_brand_wcpay_request:ok	支付成功
     *get_brand_wcpay_request:cancel	支付过程中用户取消
     *get_brand_wcpay_request:fail	支付失败
     * @param {*} config
     * @memberof Wechat
     */
    pay(config,callback) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', config, function (res) {
            //WeixinJSBridge.log(res.err_msg);
            callback && callback(res.err_msg)
        });
    }
    /**
     *微信支付
     *timestamp 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
     *nonceStr 支付签名随机串，不长于 32 位
     *package 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
     *signType 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
     *paySign 支付签名
     * @param {*} config
     * @memberof Wechat
     */
    chooseWXPay(config,callback) {
        wx.chooseWXPay({
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            package: config.package,
            signType: config.signType,
            paySign: config.paySign,
            success: function (res) {
                // 支付成功后的回调函数
                callback && callback(res.err_msg)
            }
        });
    }
}

export default new Wechat();