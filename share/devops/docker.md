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
