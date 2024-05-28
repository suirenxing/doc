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
