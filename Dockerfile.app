
# production stage
FROM nginx:1.19.5-alpine as production-stage
WORKDIR /app
COPY ./packages/web-static-page-for-app/dist ./dist
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY ./nginx/gzip.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]