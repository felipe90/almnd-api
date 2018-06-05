## almnd-api

REST API for almundo test based on Nodejs

## Usage

run ```npm install``` to install all dependencies

next ```npm start``` to run the app

NOTE: I used 'products' instead of 'hotels' to not be so obvious about the motivation of this repository

## API

```/products``` get all products

```/products/<id>``` get single product by id 

```/products/?stars=<number>``` get products by stars 

```/products/?price=<number>``` get products by price 

```/products/?name=<number>``` get products by name 


NOTE: If you want the dummy data pls use ```dummy=true``` as a URL param

Example: 

```/products/?dummy=true&name=Casa``` 


## TODO

* Support query with mulitple filters
* Add security layer to the API with something like OAuth or security tokens

