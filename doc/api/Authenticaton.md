### Login

|  Tables  |      说明      | 默认值  |
| :------: | :----------: | :--: |
|   URL    | /api/v1/Auth |      |
| HTTP请求方式 |     POST     |      |
|  是否需要登录  |      否       |      |
|  授权访问限制  |      暂无      |      |
|  授权范围()  |      暂无      |      |
|   支持格式   |     JSON     |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |

返回结果(默认JSON):

```
{
    ev_result: number,
    ev_message: string,
}
```

