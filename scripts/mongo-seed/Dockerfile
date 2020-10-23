FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db bank --collection accounts --type json --file /init.json --jsonArray