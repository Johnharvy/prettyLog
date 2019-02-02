## 控制台的垃圾清理人员 —— prettyLog.js
> 你是否曾经为混乱而冗杂的打印语句而怒过，又或者想要轻松控制打印语句的开启与关闭，又或者想要美化控制台的打印语句样式，那么prettyLog.js将解决你的烦恼。

### 怎么使用

    Log({
           unique : true,  //是否打开只显示最后一条或者最后一组的打印语句
           log : {         // 为log打印的语句设置样式
                fontSize : '18px', 
                background : '#000',
                color : '#fff'
             },
            hideLogs : false //是否在window的logPag下存储清除掉的记录信息
         })

### 只保留最后一句打印语句
>所有通过console.log打印的语句,都会有跟随的标识,默认是localeTimeString.

    Log({
           unique : true, 
    })

    console.log('something') // something 下午2:04:02
    console.log('something', 'something') // something something


### 只保留最后一组打印语句

     Log({
           unique : true, 
     })

     console.group()
     console.log( 'john')
     console.log({ name : 'john'})
     console.groupEnd()

### 为打印在控制台的字符串（强调是string类型）语句配置样式

    Log({
        unique : true,
        log : {
            fontSize : '18px',
            background : '-webkit-linear-gradient(right, rgba(59,187,189,1) 0%, rgba(59,187,189,0.25) 100%)',
            color : '#fff',
            padding : '5px 10px',
            height : '20px',    
        }
    })


效果如下 ：

<img  style = "display  : block; width : 300px; margin : 0 auto;" src = 'https://file.40017.cn/guide/extra/demo3.png'>


### 隐藏控制台所有打印信息
>隐藏控制台所有打印信息，在window对象下的LogPag里查看隐藏的打印信息,上线时避免打印语句在控制台暴露敏感信息，同时如果想要获知其他逻辑的反馈信息，可以在LogPag里查看。

     Log({
        unique : true,
        hideLogs : true , //false则隐藏log记录， true放开
     })

     console.log('hide thing.')
     console.log('John')
     console.info(window.LogPag) //{Symbol(下午2:56:31): "hide thing.", Symbol(下午2:56:31): "John"}


    
            









