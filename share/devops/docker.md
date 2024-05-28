# Docker

## 安装

```sh
brew install docker
```

## 查看

```
docker -v
```

## 查找镜像

```
docker search nginx
```

## 拉取镜像

```
docker pull nginx
```

## 查看镜像列表

```
docker image ls
```

## 删除镜像

```
docker image rm 镜像名、镜像id
```

## 容器运行

- d：后台运行
- p: 端口映射 主机:容器

```
docker run -d -p 8080:80 nginx
```

## 进入容器

exec 不中断运行，-i：可交互，t：终端

```
docker exec -it <containerId> bash
```

## 查看容器列表

```
docker container ls
```

## 删除容器

```
docker container rm <containerId>
```

## 启动、停止、重启

```
docker start|stop|restart <containerId>
```

## 修改容器配置

1. 方式 1

   - 容器内复制到容器外

   ```
   docker cp <containerId>:path <localpath>
   ```

   - 容器外复制到容器内

   ```
   docker cp <localpath> <containerId>:path
   ```

   重启容器
   `docker restart <containerid>`

2. 方式 2
   - 进入容器
     `docker exec -it <containerId> bash `
   - 下载 vim
   ```sh
    apt-get update
    apt-get install vim
   ```
   - 修改文件
     `vim etc/nginx/nginx.conf`

## 部署 [参考](https://juejin.cn/post/7245613765693702201)

### 前端部署

1. 在项目中创建 Dockerfile

```yaml
# Dockerfile
# 因为我们项目使用的是pnpm安装依赖，所以找了个支持pnpm的基础镜像，如果你们使用npm，这里可以替换成node镜像
# FROM nginx:alpine
FROM gplane/pnpm:8.4.0 as builder

# 设置工作目录
WORKDIR /data/web

# 这里有个细节，为了更好的使用node_modules缓存，我们先把这两个文件拷贝到镜像中，镜像会检测发现这两个文件没有变化，就不会去重新安装依赖了。
COPY pnpm-lock.yaml .
COPY package.json .

# 安装依赖，如果上面两个文件没有改动，就不会重现安装依赖。
RUN pnpm install

# 把当前仓库代码拷贝到镜像中
COPY . .
# 运行build命令，可以替换成 npm run build
RUN pnpm run build
# 上面我们把代码编译完成后，会在镜像里生成dist文件夹。

# 下面我们把打包出来的静态资源放到nginx中部署
# 使用nginx做基础镜像
FROM nginx:alpine as nginx
# 设置时区
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone
# 设置工作目录
WORKDIR /data/web
# 在nginx镜像中创建 /app/www文件夹
RUN mkdir -p /app/www
# 把上一步编译出来dist文件夹拷贝到刚才新建的/app/www文件夹中
COPY --from=builder /data/web/dist /app/www

# 暴露 80端口和443端口，因为我们服务监听的端口就是80，443端口是为了支持https。
EXPOSE 80
EXPOSE 443

# 如果镜像中有nginx配置，先给删了
RUN rm -rf /etc/nginx/conf.d/default.conf
# 把项目里的./nginx/config.sh shell脚本复制到ngxin镜像/root文件夹下
COPY ./nginx/config.sh /root
# 给刚复制进去的shell脚本设置权限，让镜像启动的时候可以正常运行这个shell脚本。
RUN chmod +x /root/config.sh
# 镜像启动的时候运行config.sh脚本
CMD ["/root/config.sh"]

```

2. 在项目中创建/nginx/config.sh 文件

```sh
#! /bin/sh -e

cat >> /etc/nginx/conf.d/default.conf <<EOF

  server {
    listen      80;
    server_name xuwb.vip www.xuwb.vip;
    return 301 https://\$server_name\$request_uri;
  }

  server {
    listen      443 ssl http2;
    server_name xuwb.vip www.xuwb.vip;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6].";

    ssl_certificate /ssl/xuwb.vip_bundle.crt;
    ssl_certificate_key /ssl/xuwb.vip.key;

    proxy_read_timeout 600;

    location / {
      add_header Access-Control-Allow-Origin *;
      add_header Access-Control-Allow-Methods *;
      add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
      if (\$request_filename ~* .*\.(?:htm|html)$)
		    {
			    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
		    }

      root /app/www/;
      index index.html;
      client_max_body_size  500m;
    }
 }

EOF

echo "starting web server"

nginx -g 'daemon off;'

```
