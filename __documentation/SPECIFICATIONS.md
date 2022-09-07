# Document to list the loose specifications of the App
    to be used at least as a reference point



# End Points terminology


## Method GET, url: "/api/getItems"

- will get all the items from the items collection

### Filtering capabilities
    # pagination with the query parameters page and nbPerPage
    ?page=2&nbPerPage=2
    # 2 levels filtering with query parameters category and bodyLocation
    category=Medical&bodyLocation=Head

    exemple of complete query : 
    /api/getItems/?page=2&nbPerPage=2&category=Medical&bodyLocation=Head

### Default value and behavior
    query will find documents according to the number of queryparameters:
    0 = all
    1 = <1>
    2 = <1> & <2>

    pagination : 
    if nbPerPage is incorrect or ommitted -> default value of 25
    if page is incorrect or ommitted -> page = 1


format
```js
  {
    "status": "status code",
    "data" : {
      items:[{items}],
      count: number
      }
      
    "message":"message"
  },
```

  **items** is the array list of the item of the collection. It's length is set with the query parameters (or default to 25)
  
  **count**  represents the total number of items in the database according to the filters parameter (this number will mostlikely be greater than the length of the array)

## Method GET, url: "/api/getItem/:itemId"

- will get a specific item from the items collection

      Expected parameters:
      param : itemId : value

      example : /api/getItem/6543

format
```js
  {
    "status": "status code",
    "data" : {items},
    "message":"message"
  },
```
## Method GET, url: "/api/getItemsCategories"

- will get a an array of all the categories in the items collection

format
```js
  {
    "status": "status code",
    "data" : [categories],
    "message":"message"
  },
```
## Method GET, url: "/apigetItemsBodyLocations"

- will get a an array of all the categories in the items collection

format
```js
  {
    "status": "status code",
    "data" : [body_locations],
    "message":"message"
  },
```

## Method GET, url: "/api/getCompanies"

- will get all the companies from the companies collection 

format
```js
  {
    "status": "status code",
    "data" : [{companies}],
    "message":"message"
  },
```

## Method GET, url: "/api/getCompany"

- will get a specific item from the companies collection

      Expected parameters:
      Query : companyId = value

      Example : /api/getCompany/?companyId=11385

format
```js
  {
    "status": "status code",
    "data" : {items},
    "message":"message"
  },
```

## Method POST, url: "/api/updateItems"
- will update the quantity in the database for the list of items being purchased
      Expected parameters: an array og Objects

format
```js
  [
    {
      item: item,
      quantity : number(of item to be purchased)
    },
    {
      item: item,
      quantity : number(of item to be purchased)
    },
  ]
    ...


where item has the same format as an item in the collection Items from the database
```
- returns an obect with 2 arrays:

    successPurchase -> list of the purchases updated

    failPurchase -> list of the purchase that couldn't be updated (not enough left)

format of the response (for success)
```js
            {
                status: 200,
                successPurchase: arrSuccessPurchase,
                failPurchase: arrFailPurchase,
                message: {success: "db updated where possible"}
            }
```



# FRONT-END Layout

This is the general outline for the front-end. The goal is to stick to it as much as possible, although changes will inevitably occur. 

# ROUTES:

## The App component tree will look like this:

```
	<BrowserRouter>
	<GlobalStyles />
	<Header />
	<Navigation />
	<Main>
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/cart">
				<Cart />
			</Route>
			<Route exact path="/checkout">
				<Checkout />
			</Route>
			<Route exact path="/confirmation">
				<Confirmation />
			</Route>
			<Route exact path="/item/:item">
				<SingleItem />
			</Route>
			<Route path="/*">
				<NotFound />
			</Route>
		</Switch>
	</Main>
	</BrowserRouter>
```

# COMPONENTS:

## 1 folder for context:
```
	CartContext.js
```
## 1 folder for main page:
```
	Home.js
	Header.js
	Navigation.js
```
## 1 folder for pages:
```
  Cart.js
	ItemsPage.js
	SingleItem.js
	Checkout.js
	Confirmation.js
	NotFound.js
	ErrorMessage.js
```


# CLARIFICATIONS:

Header and Navigation sidebar are always rendered.

Navigation will contain links (these should be buttons, we will need their value in order to set the query parameters for the fetch function) to products filtered by Category. For example:
```
  Fitness
	Lifestyle
	Medical
```
Applying a second filter by body_part will be a stretch goal.

# Single Item page:

Needs to fetch the endpoint for a single item using the item id (use params).
` const { _id } = useParams(); `
Will need to fetch a `GET` request to the single item endpoint (see backend specifications above) using `_id` 
as a parameter. 
Component needs to render the following information:
```
  item image
  item name
  item price
  stock
  made by (company with link to company website)
```