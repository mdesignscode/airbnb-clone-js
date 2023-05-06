#!/usr/bin/node
// Create dummy objects in storage

const User = require('./models/user');
const City = require('./models/city');
const Place = require('./models/place');
const State = require('./models/state');
const Amenity = require('./models/amenity');
const Review = require('./models/review');

async function main () {
  try {
    // create Users
    const TommyMedina = new User({
      firstName: 'Tommy',
      lastName: 'Medina',
      email: 'tommymedina@console.js',
      password: 'tommymedina'
    });
    await TommyMedina.save();
    const DominicDunn = new User({
      firstName: 'Dominic',
      lastName: 'Dunn',
      email: 'dominicdunn@console.js',
      password: 'dominicdunn'
    });
    await DominicDunn.save();
    const RodneyRobbins = new User({
      firstName: 'Rodney',
      lastName: 'Robbins',
      email: 'rodneyrobbins@console.js',
      password: 'rodneyrobbins'
    });
    await RodneyRobbins.save();
    const AntonioBlake = new User({
      firstName: 'Antonio',
      lastName: 'Blake',
      email: 'antonioblake@console.js',
      password: 'antonioblake'
    });
    await AntonioBlake.save();
    const ConnorWillis = new User({
      firstName: 'Connor',
      lastName: 'Willis',
      email: 'connorwillis@console.js',
      password: 'connorwillis'
    });
    await ConnorWillis.save();
    const SamuelNewman = new User({
      firstName: 'Samuel',
      lastName: 'Newman',
      email: 'samuelnewman@console.js',
      password: 'samuelnewman'
    });
    await SamuelNewman.save();
    const LuellaMiller = new User({
      firstName: 'Luella',
      lastName: 'Miller',
      email: 'luellamiller@console.js',
      password: 'luellamiller'
    });
    await LuellaMiller.save();
    const JacksonCarpenter = new User({
      firstName: 'Jackson',
      lastName: 'Carpenter',
      email: 'jacksoncarpenter@console.js',
      password: 'jacksoncarpenter'
    });
    await JacksonCarpenter.save();
    const LeahHale = new User({
      firstName: 'Leah',
      lastName: 'Hale',
      email: 'leahhale@console.js',
      password: 'leahhale'
    });
    await LeahHale.save();
    const ElnoraGrant = new User({
      firstName: 'Elnora',
      lastName: 'Grant',
      email: 'elnoragrant@console.js',
      password: 'elnoragrant'
    });
    await ElnoraGrant.save();
    const EleanorMason = new User({
      firstName: 'Eleanor',
      lastName: 'Mason',
      email: 'eleanormason@console.js',
      password: 'eleanormason'
    });
    await EleanorMason.save();
    const ChadReynolds = new User({
      firstName: 'Chad',
      lastName: 'Reynolds',
      email: 'chadreynolds@console.js',
      password: 'chadreynolds'
    });
    await ChadReynolds.save();
    const AbbieArnold = new User({
      firstName: 'Abbie',
      lastName: 'Arnold',
      email: 'abbiearnold@console.js',
      password: 'abbiearnold'
    });
    await AbbieArnold.save();
    const EugeneKnight = new User({
      firstName: 'Eugene',
      lastName: 'Knight',
      email: 'eugeneknight@console.js',
      password: 'eugeneknight'
    });
    await EugeneKnight.save();
    const DylanQuinn = new User({
      firstName: 'Dylan',
      lastName: 'Quinn',
      email: 'dylanquinn@console.js',
      password: 'dylanquinn'
    });
    await DylanQuinn.save();
    const ShawnGuerrero = new User({
      firstName: 'Shawn',
      lastName: 'Guerrero',
      email: 'shawnguerrero@console.js',
      password: 'shawnguerrero'
    });
    await ShawnGuerrero.save();

    // create States
    const Florida = new State({
      name: 'Florida'
    });
    await Florida.save();
    const California = new State({
      name: 'California'
    });
    await California.save();
    const Brazil = new State({
      name: 'Brazil'
    });
    await Brazil.save();
    const Italy = new State({
      name: 'Italy'
    });
    await Italy.save();
    const Thailand = new State({
      name: 'Thailand'
    });
    await Thailand.save();

    // create Cities
    const Miami = new City({
      name: 'Miami',
      stateId: Florida.id
    });
    await Miami.save();
    const Orlando = new City({
      name: 'Orlando',
      stateId: Florida.id
    });
    await Orlando.save();
    const FortMyers = new City({
      name: 'Fort Myers',
      stateId: Florida.id
    });
    await FortMyers.save();
    const Jacksonville = new City({
      name: 'Jacksonville',
      stateId: Florida.id
    });
    await Jacksonville.save();
    const Tampa = new City({
      name: 'Tampa',
      stateId: Florida.id
    });
    await Tampa.save();
    const LosAngeles = new City({
      name: 'Los Angeles',
      stateId: California.id
    });
    await LosAngeles.save();
    const SanDiego = new City({
      name: 'San Diego',
      stateId: California.id
    });
    await SanDiego.save();
    const LasVegas = new City({
      name: 'Las Vegas',
      stateId: California.id
    });
    await LasVegas.save();
    const Fresno = new City({
      name: 'Fresno',
      stateId: California.id
    });
    await Fresno.save();
    const SanFrancisco = new City({
      name: 'San Francisco',
      stateId: California.id
    });
    await SanFrancisco.save();
    const RioDeJaneiro = new City({
      name: 'Rio De Janeiro',
      stateId: Brazil.id
    });
    await RioDeJaneiro.save();
    const SaoPaulo = new City({
      name: 'Sao Paulo',
      stateId: Brazil.id
    });
    await SaoPaulo.save();
    const Salvador = new City({
      name: 'Salvador',
      stateId: Brazil.id
    });
    await Salvador.save();
    const Fortaleza = new City({
      name: 'Fortaleza',
      stateId: Brazil.id
    });
    await Fortaleza.save();
    const Aracaju = new City({
      name: 'Aracaju',
      stateId: Brazil.id
    });
    await Aracaju.save();
    const Milan = new City({
      name: 'Milan',
      stateId: Italy.id
    });
    await Milan.save();
    const Rome = new City({
      name: 'Rome',
      stateId: Italy.id
    });
    await Rome.save();
    const Naples = new City({
      name: 'Naples',
      stateId: Italy.id
    });
    await Naples.save();
    const Messina = new City({
      name: 'Messina',
      stateId: Italy.id
    });
    await Messina.save();
    const Bologna = new City({
      name: 'Bologna',
      stateId: Italy.id
    });
    await Bologna.save();
    const Bangkok = new City({
      name: 'Bangkok',
      stateId: Thailand.id
    });
    await Bangkok.save();
    const PattayaCity = new City({
      name: 'Pattaya City',
      stateId: Thailand.id
    });
    await PattayaCity.save();
    const ChiangMai = new City({
      name: 'Chiang Mai',
      stateId: Thailand.id
    });
    await ChiangMai.save();
    const MaeSot = new City({
      name: 'Mae Sot',
      stateId: Thailand.id
    });
    await MaeSot.save();
    const Vientiane = new City({
      name: 'Vientiane',
      stateId: Thailand.id
    });
    await Vientiane.save();

    // create Amenities
    const WiFi = new Amenity({
      name: 'WiFi'
    });
    await WiFi.save();
    const AC = new Amenity({
      name: 'Air Conditioning'
    });
    await AC.save();
    const Breakfast = new Amenity({
      name: 'Breakfast'
    });
    await Breakfast.save();
    const Pool = new Amenity({
      name: 'Pool',
    });
    await Pool.save();
    const Parking = new Amenity({
      name: 'Free Parking',
    });
    await Parking.save();
    const Restaurant = new Amenity({
      name: 'Restaurant',
    });
    await Restaurant.save();
    const PetsAllowed = new Amenity({
      name: 'Pets Allowed',
    });
    await PetsAllowed.save();
    const BeachAccess = new Amenity({
      name: 'Beach Access',
    });
    await BeachAccess.save();
    const Bar = new Amenity({
      name: 'Bar',
    });
    await Bar.save();
    const Spa = new Amenity({
      name: 'Spa',
    });
    await Spa.save();
    const Casino = new Amenity({
      name: 'Casino',
    });
    await Casino.save();
    const FitnessCenter = new Amenity({
      name: 'Fitness Center',
    });
    await FitnessCenter.save();
    const Jacuzzi = new Amenity({
      name: 'Jacuzzi',
    });
    await Jacuzzi.save();
    const PetAmbassador = new Amenity({
      name: 'Pet Ambassador',
    });
    await PetAmbassador.save();
    const Robots = new Amenity({
      name: 'AI Robots',
    });
    await Robots.save();
    const TV = new Amenity({
      name: 'TV',
    });
    await TV.save();
    const RoomService = new Amenity({
      name: 'Room Service',
    });
    await RoomService.save();

    // create Places
    const SleepMai = new Place({
      name: 'Sleep Mai Lifestyle Hotel',
      cityId: ChiangMai.id,
      userId: TommyMedina.id,
      description: 'Quidem suscipit asperiores nisi laudantium praesentium vitae animi in. Quisquam error rerum eligendi perferendis voluptatem corporis. Ducimus et sed at mollitia provident sed. Doloremque neque est quibusdam quam debitis.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 21,
      longitude: 173.4979,
      latitude: -359.4311
    });
    await SleepMai.save();
    SleepMai.amenities = [Spa, Casino, Jacuzzi, RoomService];
    const BaronBeach = new Place({
      name: 'Baron Beach',
      cityId: PattayaCity.id,
      userId: TommyMedina.id,
      description: 'Eius voluptas error quam molestiae nihil qui numquam aut inventore. Et numquam vero. Qui excepturi deserunt error consequatur est recusandae nobis.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 25,
      longitude: 38.9164,
      latitude: 59.4311
    });
    await BaronBeach.save();
    BaronBeach.amenities = [Restaurant, Jacuzzi, BeachAccess, Parking];
    const Varinda = new Place({
      name: 'Varinda Hostel',
      userId: DominicDunn.id,
      cityId: Bangkok.id,
      description: 'Et vitae quia soluta aspernatur quis consequatur et minima. Modi totam iste libero veniam qui quas. Error aliquam quae. Praesentium fugiat autem distinctio voluptas doloremque dolor quaerat exercitationem. Facere delectus minima dolores eveniet adipisci. Velit qui suscipit quas.',
      numberRooms: 2,
      numberBathrooms: 2,
      maxGuest: 4,
      priceByNight: 42,
      longitude: 13.4979,
      latitude: 59.4311
    });
    await Varinda.save();
    Varinda.amenities = [AC, WiFi, TV];
    const Aurelia = new Place({
      name: 'Hotel Occidental Aurelia',
      userId: RodneyRobbins.id,
      cityId: Rome.id,
      description: 'Eveniet veritatis architecto ut in id. Natus quam ipsam deleniti. Neque doloremque animi corrupti nobis minima modi voluptatem molestiae aut. Iure explicabo adipisci id. Officiis perferendis facere.',
      numberRooms: 2,
      numberBathrooms: 2,
      maxGuest: 4,
      priceByNight: 186,
      longitude: 75.9937,
      latitude: -5.41
    });
    await Aurelia.save();
    Aurelia.amenities = [Pool, Breakfast, Spa, FitnessCenter];
    const Torino = new Place({
      name: 'Hotel Torino',
      userId: RodneyRobbins.id,
      cityId: Rome.id,
      description: 'Eveniet veritatis architecto ut in id. Natus quam ipsam deleniti. Neque doloremque animi corrupti nobis minima modi voluptatem molestiae aut. Iure explicabo adipisci id. Officiis perferendis facere.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 126,
      longitude: 59.0446,
      latitude: -27.9636
    });
    await Torino.save();
    Torino.amenities = [Pool, AC, Spa, Parking, TV, WiFi];
    const Novotel = new Place({
      name: 'Novotel',
      userId: AntonioBlake.id,
      cityId: SaoPaulo.id,
      description: 'Minus sunt aut amet impedit. Sed perferendis occaecati dolorem deserunt in quia. Qui consequatur et ex et officiis reprehenderit. Rerum tempore error consequatur libero commodi vel sit esse veniam. Animi beatae voluptas consequatur ducimus. Aut nam aliquid pariatur mollitia ea quam.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 105,
      longitude: -81.3918,
      latitude: 2.9376
    });
    await Novotel.save();
    Novotel.amenities = [Pool, Breakfast, TV, RoomService];
    const Cinelandia = new Place({
      name: 'Hotel Cinelandia',
      userId: ConnorWillis.id,
      cityId: SaoPaulo.id,
      description: 'Dolorem eum harum aut velit qui. Corporis eos ut dolores deserunt. Quia qui quo adipisci animi vero enim voluptas sit. Qui dolorem et id qui ullam qui quasi magnam. Fugiat quam dolorem.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 27,
      longitude: 256.3526,
      latitude: 87.6366
    });
    await Cinelandia.save();
    Cinelandia.amenities = [Restaurant, Casino, Spa, RoomService, Jacuzzi];
    const EZ = new Place({
      name: 'EZ Hotels',
      userId: SamuelNewman.id,
      cityId: SaoPaulo.id,
      description: 'Soluta voluptatem necessitatibus. Reiciendis eveniet id minima est accusantium ut incidunt. Recusandae ducimus ut optio qui magnam nihil quia ipsum. Rerum vel labore autem natus necessitatibus. Nisi et cupiditate odio et accusantium quibusdam voluptas.',
      numberRooms: 3,
      numberBathrooms: 2,
      maxGuest: 6,
      priceByNight: 200,
      longitude: 211.3445,
      latitude: 362.7414
    });
    await EZ.save();
    EZ.amenities = [Jacuzzi, Spa, FitnessCenter, RoomService];
    const Travelodge = new Place({
      name: 'Travelodge',
      userId: JacksonCarpenter.id,
      cityId: RioDeJaneiro.id,
      description: 'Earum animi qui explicabo repudiandae qui consequatur quis. Et qui facilis ut architecto et ut in dolor modi. Quis quia occaecati minus amet itaque nihil mollitia vel dolor. Mollitia dolorem dolor a qui officiis recusandae et et.',
      numberRooms: 2,
      numberBathrooms: 2,
      maxGuest: 4,
      priceByNight: 146,
      longitude: 232.2377,
      latitude: 49.6053
    });
    await Travelodge.save();
    Travelodge.amenities = [Casino, Bar, Restaurant, BeachAccess];
    const HolidayInn = new Place({
      name: 'Holiday Inn Express',
      userId: LuellaMiller.id,
      cityId: RioDeJaneiro.id,
      description: 'Architecto et doloribus eaque sed consequatur nostrum ut reprehenderit. Tenetur repellat magni. Modi eos voluptas et eos.',
      numberRooms: 3,
      numberBathrooms: 2,
      maxGuest: 6,
      priceByNight: 244,
      longitude: -38.1158,
      latitude: -263.1418
    });
    await HolidayInn.save();
    HolidayInn.amenities = [Bar, PetAmbassador, PetsAllowed, Pool, WiFi, Casino, Robots, TV];
    const HollywoodInn = new Place({
      name: 'Hollywood Inn Express',
      userId: LeahHale.id,
      cityId: LosAngeles.id,
      description: 'Consectetur sit quo. Optio totam adipisci repellendus quas assumenda. Sed aperiam iusto magnam.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 80,
      longitude: -148.2323,
      latitude: 153.6659
    });
    await HollywoodInn.save();
    HollywoodInn.amenities = [Pool, Breakfast, WiFi, PetAmbassador];
    const Freehand = new Place({
      name: 'Freehand',
      userId: ShawnGuerrero.id,
      cityId: LosAngeles.id,
      description: 'Autem eveniet itaque sint numquam blanditiis non recusandae laborum. Eveniet quibusdam distinctio rerum est odit laborum occaecati. Itaque quia reprehenderit.',
      numberRooms: 3,
      numberBathrooms: 2,
      maxGuest: 6,
      priceByNight: 236,
      longitude: 98.3884,
      latitude: 8.6443
    });
    await Freehand.save();
    Freehand.amenities = [Bar, Spa, WiFi, BeachAccess, Restaurant];
    const Hampton = new Place({
      name: 'Hampton Inn',
      userId: AntonioBlake.id,
      cityId: FortMyers.id,
      description: 'Et molestias beatae sit voluptatum expedita aut labore. Magnam officiis aut voluptate magni id quia. Et vero qui eligendi et perspiciatis omnis culpa omnis delectus. Perferendis et inventore quidem ut ducimus consequuntur. Accusamus atque natus aut.',
      numberRooms: 2,
      numberBathrooms: 2,
      maxGuest: 4,
      priceByNight: 276,
      longitude: 68.0783,
      latitude: -208.4873
    });
    await Hampton.save();
    Hampton.amenities = [Pool, PetsAllowed, FitnessCenter, Casino, Breakfast, WiFi, Parking];
    const Econo = new Place({
      name: 'Econo Lodge North',
      userId: LuellaMiller.id,
      cityId: FortMyers.id,
      description: 'Qui dolorem aut praesentium magnam ea porro. Omnis rem corrupti nesciunt. Cum omnis ad facere. Qui odio quis modi vel quo. Non labore harum omnis aliquid eum sed natus.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 199,
      longitude: 316.8819,
      latitude: 218.7425
    });
    await Econo.save();
    Econo.amenities = [Spa, Casino, Pool, Restaurant, RoomService];
    const HowardJohnson = new Place({
      name: 'Howard Johnson',
      userId: ShawnGuerrero.id,
      cityId: FortMyers.id,
      description: 'Porro nulla suscipit at assumenda quia. Est nostrum molestiae ad. Ea facilis dolor architecto minima blanditiis.',
      numberRooms: 3,
      numberBathrooms: 2,
      maxGuest: 6,
      priceByNight: 298,
      longitude: 40.713,
      latitude: 228.9864
    });
    await HowardJohnson.save();
    HowardJohnson.amenities = [FitnessCenter, Restaurant, Casino, Jacuzzi, Robots, WiFi, BeachAccess, Bar];
    const Chesterfield = new Place({
      name: 'Chesterfield Hotel & Suites',
      userId: DominicDunn.id,
      cityId: Miami.id,
      description: 'Porro nulla suscipit at assumenda quia. Est nostrum molestiae ad. Ea facilis dolor architecto minima blanditiis.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 75,
      longitude: 40.8632,
      latitude: 2.1739
    });
    await Chesterfield.save();
    Chesterfield.amenities = [AC, Breakfast, Pool, Parking, Spa];
    const DaysInn = new Place({
      name: 'Days Inn',
      userId: ShawnGuerrero.id,
      cityId: Miami.id,
      description: 'Ut delectus in et distinctio illum reiciendis nemo repellat. Quam quia numquam quia nesciunt quis non architecto sit quia. Quod at quia dolores. Cum perferendis voluptas recusandae. Quis voluptatem quibusdam.',
      numberRooms: 1,
      numberBathrooms: 1,
      maxGuest: 2,
      priceByNight: 84,
      longitude: 308.491,
      latitude: 140.543
    });
    await DaysInn.save();
    DaysInn.amenities = [AC, BeachAccess, WiFi, PetsAllowed, Bar];

    // create Reviews
    const Review1 = new Review({
      userId: ShawnGuerrero.id,
      placeId: DaysInn.id,
      text: 'Magni eaque occaecati delectus ut tenetur dolor ut excepturi. Blanditiis placeat voluptas nam. Maxime minima saepe sequi aut quidem eveniet sunt recusandae. Consequuntur doloremque molestiae earum magni culpa. Et libero asperiores.'
    });
    await Review1.save();
    const Review2 = new Review({
      userId: LeahHale.id,
      placeId: DaysInn.id,
      text: 'Aut aperiam voluptatem. Et laboriosam ex voluptates perspiciatis voluptas aut illum. Ut et quia esse eius minus aut in saepe.'
    });
    await Review2.save();
    const Review3 = new Review({
      userId: JacksonCarpenter.id,
      placeId: Chesterfield.id,
      text: 'Possimus aliquam quod voluptas quaerat fugiat aut nostrum quia. Vel architecto quasi. Accusantium mollitia tenetur ut quisquam rem.'
    });
    await Review3.save();
    const Review4 = new Review({
      userId: JacksonCarpenter.id,
      placeId: HowardJohnson.id,
      text: 'Magnam impedit quisquam error qui sunt. Hic enim corporis illum dolorem iure quod laboriosam numquam quia. Odit beatae qui. Eius dolor qui et et qui in delectus illum et. Quasi aut esse ut repellendus.'
    });
    await Review4.save();
    const Review5 = new Review({
      userId: LuellaMiller.id,
      placeId: Econo.id,
      text: 'Nihil reiciendis omnis illum labore. Beatae reprehenderit eveniet pariatur vero rerum ut consectetur perferendis. At blanditiis necessitatibus iste expedita ducimus ea et saepe. Beatae aut exercitationem repellat.'
    });
    await Review5.save();
    const Review6 = new Review({
      userId: SamuelNewman.id,
      placeId: Hampton.id,
      text: 'Voluptatem doloremque assumenda aut et aliquid voluptatem vitae ea. Consequuntur molestias enim aut illo dolor aut in alias fuga. Necessitatibus dolorem aut nostrum odio dignissimos cupiditate et. Sapiente aut dicta qui facere totam quas et voluptate. Voluptatem natus rerum eius eum dolorum neque sed. Porro expedita laborum iure voluptates aut.'
    });
    await Review6.save();
    const Review7 = new Review({
      userId: ConnorWillis.id,
      placeId: Freehand.id,
      text: 'Odit facere nulla eum. Id exercitationem quo consequatur magni nihil ut aspernatur est. Et expedita rerum itaque eaque. Possimus nam rerum et consequuntur facere consequatur nisi numquam quidem. Alias magnam esse voluptatem vitae laboriosam architecto.'
    });
    await Review7.save();
    const Review8 = new Review({
      userId: AntonioBlake.id,
      placeId: HollywoodInn.id,
      text: 'Quia unde dolor ut. Repellendus vel omnis saepe odio possimus. Dolore quibusdam et et ipsum.'
    });
    await Review8.save();
    const Review9 = new Review({
      userId: RodneyRobbins.id,
      placeId: Travelodge.id,
      text: 'Delectus ab sunt nobis sit enim non velit. Voluptas explicabo rerum dolor aut nulla voluptatibus ut voluptatem aut. Vel eos ut aut. Laudantium vel expedita sunt. Facilis culpa error delectus nisi distinctio est.'
    });
    await Review9.save();
    const Review10 = new Review({
      userId: DominicDunn.id,
      placeId: HollywoodInn.id,
      text: 'Quia eligendi magnam aliquam ut. Vel id enim ullam. Qui tenetur sit rem architecto. Et dolorem qui sed quis provident. Beatae dignissimos sed aspernatur in dignissimos harum eum repellendus consequatur. Voluptatibus qui corrupti nihil.'
    });
    await Review10.save();
    const Review11 = new Review({
      userId: TommyMedina.id,
      placeId: EZ.id,
      text: 'Commodi ut perferendis. Mollitia quidem ab cumque qui. Quia deleniti accusamus omnis impedit. Hic aut illum impedit enim commodi qui ut iure. Alias voluptatem sed impedit sed sint cumque non. Libero accusamus quo.'
    });
    await Review11.save();
    const Review12 = new Review({
      userId: AntonioBlake.id,
      placeId: Chesterfield.id,
      text: 'Et velit ipsa iure consequatur porro. Dicta sit mollitia sed quo iste quis. Voluptas velit illo quos dolorem enim. Est vel non corporis reiciendis rerum neque. Inventore dignissimos ipsa perferendis qui sed id. Consectetur eum vero.'
    });
    await Review12.save();
    const Review13 = new Review({
      userId: SamuelNewman.id,
      placeId: Cinelandia.id,
      text: 'Consequatur quibusdam sit quisquam quod ut. Consequatur vitae consequatur mollitia laudantium omnis eum natus. Dicta asperiores nostrum sunt sit reprehenderit quo sint.'
    });
    await Review13.save();
    const Review14 = new Review({
      userId: SamuelNewman.id,
      placeId: Torino.id,
      text: 'Incidunt molestias fugiat delectus voluptates soluta sed. Eum nesciunt illo ut est. Nulla molestiae rerum voluptatem veritatis quisquam quis ipsum nihil nulla. Placeat ea aut earum.'
    });
    await Review14.save();
    const Review15 = new Review({
      userId: EugeneKnight.id,
      placeId: Varinda.id,
      text: 'Est aut illo enim enim quam. Mollitia adipisci vero ullam doloribus. Et voluptatem voluptates aut ut quia omnis. Voluptatem et dolorem ut reprehenderit ut est. Nesciunt corrupti molestiae eum repudiandae aspernatur eos.'
    });
    await Review15.save();
    const Review16 = new Review({
      userId: DylanQuinn.id,
      placeId: Aurelia.id,
      text: 'Magni aliquid qui eos velit voluptatem eos error illum corrupti. Fugiat dolores sed explicabo optio sint sed necessitatibus eveniet totam. Labore doloribus ipsam provident et optio suscipit ea. Aut cum neque eaque laudantium. Ab quis et animi dicta velit quas iusto esse veniam.'
    });
    await Review16.save();
    const Review17 = new Review({
      userId: AbbieArnold.id,
      placeId: BaronBeach.id,
      text: 'Odio et qui architecto labore quia aut optio. Minima rerum voluptatem qui vel dolor explicabo dolor magnam. Autem perspiciatis repellat asperiores expedita et voluptatum qui.'
    });
    await Review17.save();
    const Review18 = new Review({
      userId: ChadReynolds.id,
      placeId: SleepMai.id,
      text: 'Voluptates non itaque eum a ea et aperiam qui doloremque. Sit officia voluptatem quia blanditiis reiciendis explicabo. Libero dolores ducimus voluptate illum. Quae quos est quia dicta dolores quis rerum qui architecto. Culpa sed omnis quae voluptatem possimus praesentium. Eos necessitatibus aliquam nisi.'
    });
    await Review18.save();
    const Review19 = new Review({
      userId: EleanorMason.id,
      placeId: HollywoodInn.id,
      text: 'Blanditiis accusamus accusantium expedita deleniti quo qui et. Sunt libero dolor velit. Dolorem dolore dolor molestiae illum nostrum dolore. Rerum qui adipisci ratione aut. Earum nihil dolores totam et.'
    });
    await Review19.save();
    const Review20 = new Review({
      userId: EleanorMason.id,
      placeId: Torino.id,
      text: 'Ut ut similique et eaque et. Blanditiis consequatur fuga maxime. Enim error voluptatibus sit eos. Est repudiandae tempora eaque maxime aliquid. Alias tenetur quaerat sequi cumque.'
    });
    await Review20.save();
    const Review21 = new Review({
      userId: LuellaMiller.id,
      placeId: Novotel.id,
      text: 'Quis perspiciatis adipisci. Voluptatum incidunt doloremque non commodi. Quidem accusamus deleniti ut quo vel sit qui quasi id. Et ab ut consectetur aut.'
    });
    await Review21.save();
    const Review22 = new Review({
      userId: ChadReynolds.id,
      placeId: HolidayInn.id,
      text: 'Id quod quis nulla et veritatis voluptate enim. Itaque consequatur eveniet voluptatem voluptatem cumque sed voluptate suscipit. Eligendi qui ratione qui magni corporis.'
    });
    await Review22.save();
    const Review23 = new Review({
      userId: DylanQuinn.id,
      placeId: HolidayInn.id,
      text: 'Omnis facere velit aut consequatur dolorum. Qui vero laudantium voluptates aut veritatis illo et. Ipsam id et. Officia consequatur molestiae aspernatur ipsa neque atque animi. Doloremque asperiores quia nihil minima nihil corrupti. Iusto neque ipsam omnis veniam.'
    });
    await Review23.save();

    console.log('Storage filled with dummy objects');
  } catch (error) {
    console.log(error);
  }
}
main();
