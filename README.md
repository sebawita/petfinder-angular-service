# petfinder-angular-service

## Setup

In order to make the service work you need to add an `HttpModule` to your `@NgModule` imports.

For <b>NativeScript</b> use `NativeScriptHttpModule`

``` javascript
import { NativeScriptHttpModule } from "nativescript-angular/http";
```

``` javascript
@NgModule({
  ...
  imports: [
    ...
    NativeScriptHttpModule
  ],
```

For <b>Web</b> use `HttpModule`

``` javascript
import { HttpModule } from '@angular/http';
```

``` javascript
@NgModule({
  ...
  imports: [
    ...
    HttpModule
  ],
```

### API KEY

You will also need to get a `petfinder api key` from [here](https://www.petfinder.com/developers/api-key).

When you get your key, you need to provide it to the `@NgModule providers` using the `API_KEY_TOKEN` InjectionToken from `petfinder-angular-service`.

``` javascript
import { PetFinderService, API_KEY_TOKEN } from 'petfinder-angular-service';

@NgModule({
  ...
  providers: [
    ...
    { provide: API_KEY_TOKEN, useValue: 'your-key-here' },
    PetFinderService
  ],
```

## Examples of usage

To use the service, just import what you need:

``` javascript
import { PetFinderService, Pet } from "petfinder-angular-service";
```

Then inject the service in the constructor:

``` javascript
constructor(private petFinderService: PetFinderService) { }
```

Then to get a list of pets call:

``` javascript
this.petFinderService.findPets('Boston, MA')
.then((pets: Pet[]) => {
  // Deal with the pets here
  console.log(JSON.stringify(pets));
})
```

or with search options:

``` javascript
this.petFinderService.findPets(
  'Boston, MA', 
  { age: 'Baby', size: 'M' })
.then((pets: Pet[]) => {
  // Deal with the pets here
  console.log(JSON.stringify(pets));
})
```

## API

### `breedList(animal: string): Promise<string[]>`

   * Returns a list of breeds for a particular animal.
   * @param animal type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry): for a safe list values use Options.animal


### `getPet(id: string | number): Promise<Pet>`

   * Returns a record for a single pet.
   * @param id 


### `getRandomPetId(options: RandomSearchOptions = {}): Promise<number>`

   * Returns an id for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Random Search Options, which include: animal, breed, location, sex, shelterId, size


### `getRandomPet(options: RandomSearchOptions = {}, provideDescription: boolean = true): Promise<Pet>`

   * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Search Options, which include: animal, breed, location, sex, shelterId, size
   * @param provideDescription determines whether the pet description should be provided


### `findPets(location: string, options: PetSearchOptions = {}): Promise<Pet[]>`

   * Searches for pets according to the criteria you provde and returns a collection of pet records matching your search.
   * The results will contain at most count records per query, and a lastOffset tag.
   * To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
   * @param location the ZIP/postal code or city and state the animal should be located (NOTE: the closest possible animal will be selected)
   * @param options a set of Search Options, which include: age, animal, breed, count, offset, output, sex, shelterId, size

  
### `findShelterPets(id: string | number, options: ShelterPetSearchOptions = {}): Promise<Pet[]>`

   * Returns a list of pet records for an individual shelter.
   * @param id shelter ID (e.g. NJ94)
   * @param options a set of Search Options, which include: count, offset, output, status


### `findShelters(location: string, options: ShelterSearchOptions = {}): Promise<Shelter[]>`

   * Returns a collection of shelter records matching your search criteria.
   * @param location the ZIP/postal code or city and state where the search should begin
   * @param options a set of Search Options, which include: count, name, offset


### `getShelter(id: string | number): Promise<Shelter>`

   * Returns a record for a single shelter.
   * @param id shelter ID (e.g. NJ94)


### `findSheltersByBreed(animal:string, breed: string, options: ShelterSearchByBreedOptions = {}): Promise<Shelter[]>`

   * Returns a list of shelters, listing animals of a particular breed.
   * WARNING: Shelter name is not returned!
   * @param animal type of animal, valid values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry. For a safe list of values use Options.animal
   * @param breed breed of animal, use breedList() for a list of valid breeds
   * @param options a set of Search Options, which include: count, offset 
