### find_order

|  Tables  |           说明           | 默认值  |
| :------: | :--------------------: | :--: |
|   URL    | /api/v1/OrderDetailInt |      |
| HTTP请求方式 |          POST          |      |
|  是否需要登录  |           否            |      |
|  授权访问限制  |           暂无           |      |
|  授权范围()  |           暂无           |      |
|   支持格式   |          JSON          |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

请求参数:


| Tables | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| oid    | number | 单号ID |      |

返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_order   | object | 订单信息   | 空          |

返回结果(默认JSON):

```
{
    ev_result: number,
    ev_message: string,
    ea_order:{
      oid: number,
      delivery: {
        assign:"1511226343",
        complete:"1511228163",
        driver_cell:"6477068630",
        driver_name:"EddieDeng",
        pickup:"1511227623"
      },
      order: {
        channel: "iOS",
        comment:"",
        created:"20:01:46",
        dlexp:"5.00",
        oid:"377777",
        rid:"274",
        status:"40",
        status_txt:"已送达",
        total:"84.72"
      },
      rr: {
        addr:"5310 Yonge St, North York",
        lat:"43.772957",
        lng:"-79.416237",
        name:"大公鸡(North York)",
        postal:"M2N 5P9",
        tel:"4162217999",
        unit:" "
      },
      user: {
        addr:"9 Geranium Ct, North York, ON M2M 0A2加拿大",
        buzz:"",
        lat:"43.791073",
        lng:"-79.402664",
        name:"陆逸非",
        postal:"M2M 0A2",
        tel:"6478925920",
        unit:""
      }
    }
}
```
