#!/bin/sh
cd E:\前端代码学习\node_blog\myblog_1\logs> 
cp access.log $(date +%Y-%m-%d-%H).access.log
echo ""> access.log