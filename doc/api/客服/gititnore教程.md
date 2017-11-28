# Git ignore 用法

1. 所有通用git ignore(Global)，更改` ~/.gitignore_global`文件
2. 更改本地git ignore(Local)，更改` .gitignore `文件



在文件里输入想要忽略的文件名，如：

1. example.txt
2. *.txt 【忽略所有.txt 为后缀的文件】



如，在terminal输入 `echo example.txt >> .gitignore `会在所在的Repository 上传时忽略example.txt

