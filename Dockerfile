#Using pre-defined node base image
FROM node:14.16.0


#creating the log directory
RUN mkdir -p /var/log/app/hatchways-evaluation

RUN mkdir /var/www

WORKDIR /var/www


# Copy package.json. To take advantage of cached Docker layer
ADD package.json /var/www/

# Install node dependencies
RUN npm install


ADD . /var/www/

# Expose web service
EXPOSE 3000

CMD [ "npm", "start" ]
 