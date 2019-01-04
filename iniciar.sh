#!/bin/bash

if [ "$MONGO_ROOT_USER" != "" ]  ; then

    if [  "$MONGO_ROOT_PWD" != ""  ]  ;  then 
        
        echo "Iniciando o servidor.."

        npm start
            
        exit 0;

    else

            echo  "############################################"
            echo  "#    Environment variables not defined     #"
            echo  "#    MONGO_ROOT_USER and MONGO_ROOT_PWD    #" 
            echo  "############################################"
    fi
 
 else

            echo  "############################################"
            echo  "#    Environment variables not defined     #"
            echo  "#    MONGO_ROOT_USER and MONGO_ROOT_PWD    #" 
            echo  "############################################"
fi
exit 1
done