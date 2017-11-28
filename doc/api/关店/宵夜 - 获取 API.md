##00 宵夜 - 获取 API


|  Tables  |             说明             | 默认值  |
| :------: | :------------------------: | :--: |
|   URL    | /api/manage/v1/get_rr_open |      |
| HTTP请求方式 |            POST            |      |
|  是否需要登录  |             否              |      |
|  授权访问限制  |             暂无             |      |
|  授权范围()  |             暂无             |      |
|   支持格式   |            JSON            |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |


请求参数：
| Tables | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| iv_rid | number | 餐馆ID |      |
返回参数:


| Tables  | 类型及其范围 | 说明   | 默认值                                      |
| ------- | ------ | ---- | ---------------------------------------- |
| id      | number | 开店ID |                                          |
| rid     | number | 餐馆ID |                                          |
| weekday | number | 上班时间 | stime从0开始；status为0代表启用，否则是不起作用；如果每天都一样，那么只需要设置一条记录，weekdays 为9 就可以；weekeday 1-6代表周一到周六；0为周日；如果周一晚上要营业到3点，其实意味着要增加周二（2）的0-3 |
| stime   | number | 开始时间 |                                          |
| etime   | number | 结束时间 |                                          |


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |

返回结果(默认JSON):
```
{
    ev_result: number,
    ev_message: string
}
```