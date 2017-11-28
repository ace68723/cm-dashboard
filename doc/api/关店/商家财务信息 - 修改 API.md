##03 商家财务信息 - 修改 API


|  Tables  |                  说明                   | 默认值  |
| :------: | :-----------------------------------: | :--: |
|   URL    | /api/manage/v1/edit_rr_detail_finance |      |
| HTTP请求方式 |                  PUT                  |      |
|  是否需要登录  |                   否                   |      |
|  授权访问限制  |                  暂无                   |      |
|  授权范围()  |                  暂无                   |      |
|   支持格式   |                 JSON                  |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

请求参数:


| Tables          | 类型及其范围 | 说明             | 默认值                 |
| --------------- | ------ | -------------- | ------------------- |
| iv_rid          | number | 餐馆id           | 必填                  |
| iv_rate         | number | 汇率             | 必填                  |
| iv_bname        | string | 商家注册名字         |                     |
| iv_owner        | number | 老板UID          |                     |
| iv_email        | string | 邮箱             |                     |
| iv_bank_name    | string | 银行名字           | 要有就要一起有             |
| iv_bank_instit  | string | 银行institute 号码 | 要有就要一起有             |
| iv_bank_account | string | 银行账户           | 要有就要一起有             |
| iv_comment      | string | 备注             |                     |
| iv_pay_method   | string | 付款方式           | 必填，0 cheque， 1- PAD |
| iv_pay_cycle    | string | 付款周期           | 默认0                 |



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