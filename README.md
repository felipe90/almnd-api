## almnd-api

REST API for almundo test based on Nodejs

## Usage

run ```npm install``` to install all dependencies

next ```npm start``` to run the app

note: I used 'products' instead of 'hotels' to not be so obvious about the motivation of this repository

## API

```/products``` get all products

```/products/<id>``` get single product by id 

```/products/?stars=<number>``` get products filter by stars 

```/products/?price=<number>``` get products filter by price 

```/products/?name=<number>``` get products filter by name 

## TODO

* Support query with mulitple filters
* Add security layer to the API with something like OAuth or security tokens

