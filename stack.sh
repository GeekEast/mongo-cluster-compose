if [ $1 == "build" ]
then
    docker-compose up -d
    sleep 3
    docker exec node-x sh -c "mongo < /scripts/init-cluster.js"
elif [ $1 == "destroy" ]
then
    docker-compose down
    rm -rf data
else
    echo "mode not found, available options: build, destroy"
fi