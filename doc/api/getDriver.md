### getDriver

|  Tables  |             说明             | 默认值  |
| :------: | :------------------------: | :--: |
|   URL    | /MobMonitor/DriverSchedule |      |
| HTTP请求方式 |            GET             |      |
|  是否需要登录  |             否              |      |
|  授权访问限制  |             暂无             |      |
|  授权范围()  |             暂无             |      |
|   支持格式   |            JSON            |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |


返回字段说明:

| Tables      | 类型及其范围 | 说明     | 默认值        |
| ----------- | ------ | ------ | ---------- |
| ev_result   | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message  | string | 报错信息   | 空          |
| ev_current  | number | 现在时间   | 空          |
| eo_schedule | array  | 司机班表信息 | 空          |

返回结果(默认JSON):

```
{
    ev_result: number,
    ev_message: string,
    ev_current: number,
    eo_schedule:[{
        "driver_id":"387",
        "name":"MikeChen",        
        "hour":"12:0022:00",
        "valid_from":"1511802000",
        "valid_to":"1511838000",
        "area":"DT",
        "cell":"4168236008"},
    ]
   
}
```

