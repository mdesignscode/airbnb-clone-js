<!-- # AirBnB Clone -->

# Table of Contents
- [Table of Contents](#table-of-contents)
  - [Description of the project](#description-of-the-project)
  - [Installation](#installation)
  - [Description of the command interpreter](#description-of-the-command-interpreter)
    - [How to start it](#how-to-start-it)
    - [How to use it](#how-to-use-it)
    - [List of commands](#list-of-commands)
    - [Examples](#examples)
  - [Dummy Data](#dummy-data)
  - [Classes](#classes)


## Description of the project

First step: Write a command interpreter to manage your AirBnB objects.

This is the first step towards building your first full web application: the AirBnB clone. This first step is very important because you will use what you build during this project with all other following projects: HTML/CSS templating, database storage, API, front-end integration…

Each task is linked and will help you to:

- put in place a parent class (called BaseModel) to take care of the initialization, serialization and deserialization of your future instances
- create a simple flow of serialization/deserialization: Instance <-> Dictionary <-> JSON string <-> file
- create all classes used for AirBnB (User, State, City, Place…) that inherit from BaseModel
- create the first abstracted storage engine of the project: File storage.
- create all unittests to validate all our classes and storage engine

<hr/>

## Installation

Clone the repository

```shell
$ git clone https://github.com/mdesignscode/airbnb-clone-js
```
Install the dependencies

```node
$ npm install
```
Create a .env file and set the HBNB_TYPE_STORAGE variable to either db or file:

```bash
HBNB_TYPE_STORAGE=file
```
If you set HBNB_TYPE_STORAGE to db, provide the credentials for the MySQL database by setting the DATABASE_URL environment variable in the .env file:

```bash
DATABASE_URL=mysql://user:password@host:port/database
```

<hr/>

## Description of the command interpreter:

The command interpreter is used to perform the following:

- Create a new object (ex: a new User or a new Place)
- Retrieve an object from a file, a database etc…
- Do operations on objects (count, compute stats, etc…)
- Update attributes of an object
- Destroy an object

<hr/>

### How to start it

To start the command interpreter:
```bash
npm run console
```
You should see a prompt that looks like this:

```bash
(hbnb)
```

<hr/>

### How to use it

In interactive shell:
```bash
(hbnb) <command>
```

In non interactive shell:
```bash
echo "<command>" | ./console.py
```

<hr/>

### List of commands

- help
- EOF
- quit
- create
- all
- destroy
- update
- show
- count

<hr/>

### Examples

Create an object

```bash
(hbnb) create Amenity name="Wifi"
```

Show an object

```bash
(hbnb) show Amenity 1d3ee3b5-53e5-4de9-b4a4-4eb71c6156f4
```

Update an object

```bash
(hbnb) update Amenity 1d3ee3b5-53e5-4de9-b4a4-4eb71c6156f4 name="Wireless Internet"
```

Delete an object

```bash
(hbnb) destroy Amenity 1d3ee3b5-53e5-4de9-b4a4-4eb71c6156f4
```

Count objects

```bash
(hbnb) count Amenity
```

<hr/>

## Dummy Data

To populate the storage with dummy data, run the following command:

```node
$ npm run pre-fill
```

This command creates several objects for each of the available classes (e.g. Amenity, City, State, User, etc.) and adds them to the storage.

Note that the file storage is pre-filled with this data.

<hr/>

## Classes

<h3>BaseModel</h3>

The BaseModel class defines all common attributes and methods that are inherited by other classes in the project. This includes properties such as id, createdAt, and updatedAt, as well as methods for saving and deleting objects from storage.

<h3>Amenity</h3>

The Amenity class represents a single amenity that can be associated with a place. It inherits from BaseModel and adds a name property.

<h3>City</h3>

The City class represents a single city where a place can be located. It inherits from BaseModel and adds name and stateId properties. It also has a places getter method that returns a list of places located in the city.

<h3>Place</h3>

The Place class represents a single accommodation that can be listed on the platform. It inherits from BaseModel and adds properties such as name, description, priceByNight, and latitude and longitude coordinates. It also has a reviews getter method that returns a list of reviews associated with the place, as well as an amenities getter method that returns a list of amenities associated with the place.

<h3>Review</h3>

The Review class represents a single review that has been left by a user for a particular place. It inherits from BaseModel and adds properties such as title, text, and rating.

<h3>State</h3>

The State class represents a single state where a city is located in. It inherits from BaseModel and adds a name property.A city is linked to a state.

<h3>User</h3>

The User class represents a single user that can own places, visit places and leave reviews. It inherits from BaseModel and adds properties such as password, first name, last name and email.
