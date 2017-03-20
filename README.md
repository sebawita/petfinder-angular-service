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
    NativeScriptHttpModule
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

To get a pet just

  /** 
   * Returns a list of breeds for a particular animal.
   * @param animal type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry): for a safe list values use Options.animal
   */
  `public breedList(animal: string): Promise<Array<string>>`

  /**
   * Returns a record for a single pet.
   * @param id 
   */
  `public getPet(id: string | number): Promise<Pet>`

  /**
   * Returns an id for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Random Search Options, which include: animal, breed, location, sex, shelterId, size
   */
  `public getRandomPetId(options: RandomSearchOptions = {}): Promise<number>`

  /**
   * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Search Options, which include: animal, breed, location, sex, shelterId, size
   * @param provideDescription determines whether the pet description should be provided
   */
  `public getRandomPet(options: RandomSearchOptions = {}, provideDescription: boolean = true): Promise<Pet>`

  /**
   * Searches for pets according to the criteria you provde and returns a collection of pet records matching your search.
   * The results will contain at most count records per query, and a lastOffset tag.
   * To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
   * @param location the ZIP/postal code or city and state the animal should be located (NOTE: the closest possible animal will be selected)
   * @param options a set of Search Options, which include: age, animal, breed, count, offset, output, sex, shelterId, size
   */
  `public findPets(location: string, options: PetSearchOptions = {}): Promise<Array<Pet>>`
  
  /**
   * Returns a list of pet records for an individual shelter.
   * @param id shelter ID (e.g. NJ94)
   * @param options a set of Search Options, which include: count, offset, output, status
   */
  `public findShelterPets(id: string | number, options: ShelterPetSearchOptions = {}): Promise<Array<Pet>>`

  /**
   * Returns a collection of shelter records matching your search criteria.
   * @param location the ZIP/postal code or city and state where the search should begin
   * @param options a set of Search Options, which include: count, name, offset
   */
  `public findShelters(location: string, options: ShelterSearchOptions = {}): Promise<Array<Shelter>>`

  /**
   * Returns a record for a single shelter.
   * @param id shelter ID (e.g. NJ94)
   */
  `public getShelter(id: string | number): Promise<Shelter>`

  /**
   * Returns a list of shelters, listing animals of a particular breed.
   * WARNING: Shelter name is not returned!
   * @param animal type of animal, valid values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry. For a safe list of values use Options.animal
   * @param breed breed of animal, use breedList() for a list of valid breeds
   * @param options a set of Search Options, which include: count, offset 
   */
  `public findSheltersByBreed(animal:string, breed: string, options: ShelterSearchByBreedOptions = {}): Promise<Array<Shelter>>`
