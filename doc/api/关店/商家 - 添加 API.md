##01 商家 - 添加 API


|  Tables  |              说明              | 默认值  |
| :------: | :--------------------------: | :--: |
|   URL    | /api/manage/v1/add_rr_detail |      |
| HTTP请求方式 |             POST             |      |
|  是否需要登录  |              否               |      |
|  授权访问限制  |              暂无              |      |
|  授权范围()  |              暂无              |      |
|   支持格式   |             JSON             |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

请求参数:


| Tables          | 类型及其范围 | 说明                      | 默认值                 |
| --------------- | ------ | ----------------------- | ------------------- |
| iv_name         | string | 餐馆名字                    | 必填                  |
| iv_desc         | string | 餐馆介绍                    |                     |
| iv_area         | number | 餐馆区域                    | 必填，1-6              |
| iv_logo_id      | number | 餐馆logo id               | 必填                  |
| iv_postal       | string | 邮编                      | 必填                  |
| iv_tel1         | string | 电话1                     | 必填                  |
| iv_tel2         | string | 电话2                     |                     |
| iv_province     | string | 省编号                     | 默认1                 |
| iv_prvn         | string | 省                       | 默认ON                |
| iv_addr         | string | 地址                      | 必填                  |
| iv_apt_no       | string | appartment号             |                     |
| iv_start_amount | number | start amount            | 默认0.00              |
| iv_mob_banner   | string | banner 图片ID             | 必填，找jida            |
| iv_status       | number | 状态，0位开店，添加的时候给9，激活之后改为0 | 必填                  |
| iv_rate         | number | 汇率                      | 必填                  |
| iv_fbid         | number | 就叫fbid                  | 必填，默认3              |
| iv_bname        | string | 商家注册名字                  |                     |
| iv_owner        | number | 老板UID                   |                     |
| iv_email        | string | 邮箱                      |                     |
| iv_bank_name    | string | 银行名字                    | 要有就要一起有             |
| iv_bank_instit  | string | 银行institute 号码          | 要有就要一起有             |
| iv_bank_account | string | 银行账户                    | 要有就要一起有             |
| iv_comment      | string | 备注                      |                     |
| iv_pay_method   | string | 付款方式                    | 必填，0 cheque， 1- PAD |
| iv_pay_cycle    | string | 付款周期                    | 默认0                 |



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