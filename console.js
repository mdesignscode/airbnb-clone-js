#!/usr/bin/node
// console for CRUD operations in application

const readline = require('readline');
const BaseModel = require('./models/baseModel');
const User = require('./models/user');
const City = require('./models/city');
const Review = require('./models/review');
const State = require('./models/state');
const Place = require('./models/place');
const Amenity = require('./models/amenity');
const storage = require('./models');

const validClasses = {
  BaseModel,
  User,
  City,
  State,
  Amenity,
  Place,
  Review
};

const numberValues = [
  'numberRooms', 'numberBathrooms', 'maxGuest',
  'priceByNight', 'latitude', 'longitude'
];

// commands documentation
const commands = {
  EOF: {
    description: 'Exits the program',
    usage: null
  },
  quit: {
    description: 'Exits the program',
    usage: null
  },
  create: {
    description: 'Creates a new instance of class name, saves it (to the JSON file) and prints the id',
    usage: 'create <class name>\nor you can create an instance with custom values:\ncreate <Class name> <param 1> <param 2> <param 3>...\nParam syntax: <key name>=<value>\nValue syntax:\n\tString: "<value>" => starts with a double quote\n\tany double quote inside the value must be escaped with a backslash \\\n\tall underscores _ must be replace by spaces .\n\tExample: You want to set the string My little house to the attribute name, your command line must be name="My_little_house"\n\tFloat: <unit>.<decimal> => contains a dot .\n\tInteger: <number> => default case'
  },
  show: {
    description: 'Prints the string representation of an instance based on the class name and id',
    usage: 'show <class name> <id>'
  },
  all: {
    description: 'Prints all string representation of all instances based or not on the class name',
    usage: 'all <class name>\nor\nall'
  },
  destroy: {
    description: 'Deletes an instance based on the class name and id',
    usage: 'destroy <class name> <id>'
  },
  update: {
    description: 'Updates an instance based on the class name and id by adding or updating attribute',
    usage: 'update <class name> <id> <attribute name> <value>\nor\nupdate <class name> <id> <attribute name>, "<attribute value>"'
  }
};

// show documentation for a command
const help = command => {
  if (commands[command]) {
    console.log(commands[command].description);
    console.log(commands[command].usage ? `usage:\n${commands[command].usage}` : '');
  }
};

const HBNBCommand = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

HBNBCommand.setPrompt('(hbnb) ');
HBNBCommand.prompt();

HBNBCommand.on('line', async line => {
  // global variables
  let action, className, id, attributeName, attributeValue;

  const command = line.trim();
  const [head] = command.split(' ');
  const isDot = head.includes('.');
  if (isDot) {
    [className] = head.split('.');
    action = head.split('.')[1]?.split('(')[0];
    id = head.split('(')[1]?.split(',')[0]?.replace(')', '');
    attributeName = command.split(', ')[1]?.replace(')', '');
    attributeValue = command.split(', ')[2]?.replace(')', '');
  } else {
    [action, className, id, attributeName, attributeValue] = command.split(' ');

    let valueString = ''; // for value with double quotes

    if (typeof attributeValue === 'string' && attributeValue[0] === '"') {
      for (const arg of command.split(' ').slice(4)) {
        valueString += arg;

        if (arg.endsWith('"')) break;
        valueString += ' ';
      }
      attributeValue = valueString.replace(/"/g, '');
    } else {
      attributeValue = attributeValue ? attributeValue.replace(/"/g, '') : undefined;
    }

  }

  // check if class is given
  if (['create', 'show', 'destroy', 'update'].includes(action) && !className) {
    console.log('** class name missing **');
    HBNBCommand.prompt();
    return;
  }

  // get the model class
  const modelClass = validClasses[className];
  if ((['create', 'show', 'destroy', 'update'].includes(action) || isDot) && !modelClass) {
    console.log("** class doesn't exist **");
    HBNBCommand.prompt();
    return;
  }

  // check if the command requires an instance id
  const requiresId = ['show', 'destroy', 'update'].includes(action);
  if (requiresId && !id) {
    console.log("** instance id missing **");
    HBNBCommand.prompt();
    return;
  }

  // get the model instance
  const all = await storage.all();
  const model = all[`${className}.${id}`];
  if (requiresId && !model) {
    console.log("** no instance found **");
    HBNBCommand.prompt();
    return;
  }

  // get the attribute value
  const value = numberValues.includes(attributeName) ? Number(attributeValue) : attributeValue?.replace(/"/g, '');

  // execute command
  switch (action) {
    case 'EOF':
      process.exit();

    case 'quit':
      process.exit();

    case '':
      break;

    case 'help':
      if (!className) {
        console.log('Documented commands (type help <topic>):');
        console.log('===================================================');
        console.log('all  create  destroy  EOF  help  quit  show  update');
        console.log('\n');
        console.log('Valid Classes:');
        console.log('====================================================');
        console.log('Amenity  BaseModel  City  Place  Review  State  User');
        console.log('\n');
        console.log('Extra Actions:');
        console.log('==============================================================');
        console.log('<Class Name>.all(): Displays all objects of type <Class Name>.');
        console.log('<Class Name>.count(): Counts all objects of type <Class Name>.');
        console.log('<Class Name>.show(<id>): Shows object with id >> <id>.');
        console.log('<Class Name>.destroy(<id>): Removes object with id >> <id>.');
        console.log('<Class Name>.update(<id>, <attribute name>, <attribute value>): Updates an attribute with given value.');
        console.log('<Class Name>.update(<id>, {dictionary representation}): Updates an object with the given dictionary representation.');
        console.log('Dictionary representation example: {"key": "value"}');

      } else help(className);
      break;

    case 'create':
      const dictionary = {};
      if (command.includes('=')) {
        const params = command.split(' ').slice(2);
        params.forEach(param => {
          const key = param.split('=')[0];
          let value = param.split('=')[1];
          if (value[0] === '"')
            value = value.replace(/_/g, ' ').replace(/"/g, '');
          else value = Number(value);
          dictionary[key] = value;
        });
      }
      const instance = Object.keys(dictionary).length ? new modelClass(dictionary) : new modelClass();
      console.log(instance.id);
      await instance.save();
      break;

    case 'show':
      const newModel = new modelClass(model);
      console.log(newModel);
      break;

    case 'all':
      const allObjects = await storage.all();
      const objectsList = [];

      if (!className) {
        Object.keys(allObjects).forEach(key => {
          const [cls] = key.split('.');
          const model = new validClasses[cls](allObjects[key]);
          objectsList.push(model);
        });
      } else {
        if (!modelClass) {
          console.log("** class doesn't exist **");
          HBNBCommand.prompt();
          return;
        }

        Object.keys(allObjects).forEach(key => {
          const [cls] = key.split('.');
          if (cls === className) {
            const model = new modelClass(allObjects[key]);
            objectsList.push(model);
          }
        });
      }
      console.log(objectsList);
      break;

    case 'destroy':
      const deleteModel = new validClasses[className](model);
      await storage.delete(deleteModel);
      break;

    case 'update':
      if (attributeName?.startsWith('{')) {
        const newObj = attributeName.replaceAll("'", '"');
        try {
          const updateModel = new validClasses[className](model);
          await storage.updateDict(updateModel, JSON.parse(newObj));
        } catch (error) {
          ;
        }
        return;
      }
      if (!attributeName) {
        console.log('** attribute name missing **');
        HBNBCommand.prompt();
        return;
      }

      if (!value) {
        console.log('** value missing **');
        HBNBCommand.prompt();
        return;
      }
      const updateModel = new validClasses[className](model);
      await storage.update(updateModel, attributeName, value);
      break;

    case 'count':
      let count = 0;
      const all = await storage.all();
      Object.keys(all).forEach(key => {
        if (key.split('.')[0] === className) count++;
      });
      console.log(count);
      break;

    default:
      break;
  }
  HBNBCommand.prompt();
});
