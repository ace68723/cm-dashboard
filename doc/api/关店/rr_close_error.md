# Restaurant Close Error Message

| Tables | 说明                                       |
| :----: | ---------------------------------------- |
|  URL   | http://test.norgta.com/public/api/v1/rr_close |
|   接口   | GET, PUT, POST                           |



报错信息:
| Error Code | Error Message                           | Description            |
| :--------: | --------------------------------------- | ---------------------- |
|   70001    | Authrorization Failed: invalid token    | Token验证不通过             |
|   70002    | Cannot find header: Authortoken         | Header找不到'Authortoken' |
|   70003    | Number of Invalid amount of arguments   | 给予参数数量不符合              |
|   70004    | Authorization Failed: Permission denied | 此用户不是管理员               |
|   70005    | Authorization Failed: unrecognized user | 没有此用户                  |
