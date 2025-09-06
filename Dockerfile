# Dockerfile
FROM nginxinc/nginx-unprivileged:alpine

COPY site/ /usr/share/nginx/html

EXPOSE 8080
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
