#!/bin/sh

echo "Esperando o MongoDB iniciar..."
./wait-for db-alimentos:27017 
./wait-for db-bebidas:27018 


echo "Iniciando o servidor..."
npm start 