;(function (root, factory) {
    //如果存在commohJs方式引入
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) { //如果存在异步加载defined
        define([], factory)
    } else root.Log = factory() //全局环境下
})(window, function () {
    if (!window || !window.console) {
        console.warn('暂不支持非浏览器环境！');
        return;
    }
    const that = window
    /**
     * 
     *  这里应该返回Log的原型，同时当Log实例化时传进参数
     */
    let options = {
        name: 'Log',
        hideLogs: false, //是否显示打印信息
        unique: false, //是否只展示最后一组或者一条记录
        log: null, //配置log的展示选项，例如 {color : 'blue', background : #000, fontSize : '20px'}
        warn: '',
        error: '',
    }
    window.LogPag = {}
    window.group_start = false //group开始状态标记
    window.group_end = false //group终止状态结束

    /**
     * the Main Funtion
     * @param {Object} extendsOptions 
     */
    function Log(extendsOptions) {
        Object.assign(options, extendsOptions)
        /* unique开启，则调用log方法只能显示一条， group可以显示一组 */
        if (options.unique) logEndGroup();
        /* showLogs关闭时，将不再window下LogPag下保存打印的记录信息 */
        if (options.hideLogs) reLog();
       
    }

    /**
     *  重写window的console.log
     *  写入的log被记录，但是不在控制台显示
     */
    function reLog() {
        console.log = function (any, mark) {
            that.LogPag[Symbol(typeof mark === 'string' ? mark : new Date().toLocaleTimeString())] = any
        }
    }

    /**
     *  展示唯一记录
     *  捕捉window加载完成时所有记录，取最后一组展示
     */
    function logEndGroup(callback) {
        const that = window
        //log方法调用
        console.log = function (any, mark = new Date().toLocaleTimeString()) {
            //group状态开启
            if (that.group_start) {
                if (options['log'] && typeof any === 'string' && typeof mark === 'string') {
                    let terOut = addStyleToType(any, mark, options['log'])
                    console.info(terOut[0], terOut[1])
                } else {
                    console.info(any, mark)
                }
                return;
            }
            if (console.clear) {
                console.clear();
                if (options['log']) {
                    let terOut = addStyleToType(any, mark, options['log'])
                    console.info(terOut[0], terOut[1])
                } else {
                    console.info(any, mark)
                }
            } else {
                console.warn('the current environment does not support.')
            }

            callback && callback(any, mark)
        }

        //group方法调用
        console.group = function () {
            if (console.clear) {
                console.clear();
                that.group_start = true
            } else {
                console.warn('the current environment does not support.')
            }
        }

        //group方法结束闭合
        console.groupEnd = function () {
            that.group_start = false
        }
    }

    /**
     * 给相应console的type添加展示样式
     */
    function addStyleToType(any, mark, options) {
        if (mark && mark.color) {
            options = mark;
            mark = '';
        }
        let _optionStr = ''
        for (let pro in options) {
            let _pro = pro
            let _match = pro.match(/[A-Z]/) ? pro.match(/[A-Z]/)[0] : {}
            if (_match.length) {
                pro = pro.replace(_match, `-${_match.toLowerCase()}`)
            }
            _optionStr += `${pro} : ${options[_pro]};`
        }
        return [`%c ${any} ${mark || ''}`, `${_optionStr}`]
    }
    return Log
})