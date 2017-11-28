##00 商家 - 获取 API


|  Tables  |              说明              | 默认值  |
| :------: | :--------------------------: | :--: |
|   URL    | /api/manage/v1/get_rr_detail |      |
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


| Tables | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| iv_rid | number | 餐馆ID |      |

返回参数:


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| eo_data    | string | data   | 空          |


| eo_data      | 类型及其范围 | 说明                      | 默认值  |
| ------------ | ------ | ----------------------- | ---- |
| rid          | number | 餐馆ID                    |      |
| name         | string | 餐馆名字                    |      |
| desc         | string | 餐馆介绍                    |      |
| area         | number | 餐馆区域                    |      |
| logo_id      | number | 餐馆logo id               |      |
| postal       | string | 邮编                      |      |
| tel1         | string | 电话1                     |      |
| tel2         | string | 电话2                     |      |
| province     | string | 省编号                     |      |
| prvn         | string | 省                       |      |
| addr         | string | 地址                      |      |
| apt_no       | string | appartment号             |      |
| start_amount | number | start amount            |      |
| mob_banner   | string | banner 图片ID             |      |
| status       | number | 状态，0位开店，添加的时候给9，激活之后改为0 |      |



返回结果(默认JSON):
```
{
    ev_result: number,
    ev_message: string,
    ev_data:{
      
    }
}
```