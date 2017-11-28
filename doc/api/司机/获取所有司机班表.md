##获取司机班表API


|  Tables  |       说明        | 默认值  |
| :------: | :-------------: | :--: |
|   URL    | /api/v1/dr_work |      |
| HTTP请求方式 |       GET       |      |
|  是否需要登录  |        否        |      |
|  授权访问限制  |       暂无        |      |
|  授权范围()  |       暂无        |      |
|   支持格式   |      JSON       |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |





返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_data    | array  | 客服班表信息 |            |


| ev_data    | 类型及其范围 | 说明   |
| ---------- | ------ | ---- |
| id         | number | 班表ID |
| driver_id  | number | 司机ID |
| wid        | number | 微信ID |
| valid_from | string | 上班时间 |
| valid_to   | string | 下班时间 |
| zone       | number | 工作区域 |
| comment    | string | 备注   |


返回结果(默认JSON):
```
{
ev_result :#0: successful 1:fail
ev_message:
ea_data:[
  {
   id: number,
   driver_id: number,
   wid:number,
   valid_from: string,
   valid_to: string,
   zone: number,
   comment: string
  }
 ]
}
```