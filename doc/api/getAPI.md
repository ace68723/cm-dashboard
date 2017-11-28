### getAPI

|  Tables  |          说明           | 默认值  |
| :------: | :-------------------: | :--: |
|   URL    | /MobMonitor/OrderList |      |
| HTTP请求方式 |          GET          |      |
|  是否需要登录  |           否           |      |
|  授权访问限制  |          暂无           |      |
|  授权范围()  |          暂无           |      |
|   支持格式   |         JSON          |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_stats   | object | 现在时间   | 空          |
| ea_orders  | array  | 司机班表信息 | 空          |

返回结果(默认JSON):

```
{
    ev_result: number,
    ev_message: string,
    ea_stats: {
          alert:1
          all:52
          normal:52
          warning:0
              },
    ea_orders:[{
        accepted:"0"
        active:1
        alert:0
        c_addr:"17 Boarhill Dr, Scarborough, ON M1S 2L9加拿大, Toronto"
        c_lat:"43.799915"
        c_lng:"-79.282745"
        c_postal:"M1S 2L9"
        cell:"6478902193"
        channel:"iOS"
        comment:"糖正常 去冰 谢谢"
        completed:"0"
        created:"2017-11-27 16:20:21"
        deliver:""
        dlexp:3.39
        dltype:"送餐"
        driver_id:"0"
        normal:1
        oid:"383658"
        picked:"0"
        pretax:"10.00"
        r_addr:"3300 Midland Ave, Scarborough"
        r_call:""
        r_cell:"4165462996"
        r_lat:"43.809124"
        r_lng:"-79.293015"
        r_postal:"M1V 4A1"
        rrname:"CoCo都可(Scarborough)"
        status:"0"
        status_txt:"等待餐馆接单"
        total:"14.69"
        warning:0
        },
      ]
   
}
```

