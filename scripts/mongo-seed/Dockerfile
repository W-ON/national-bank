FROM mongo

COPY initial-data.json test-data.json ./

CMD mongoimport --host mongodb --db test --collection accounts --type json --file /test-data.json --jsonArray && mongoimport --host mongodb --db bank --collection accounts --type json --file /initial-data.json --jsonArray 