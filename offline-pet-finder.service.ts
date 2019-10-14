import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pet, Shelter, RandomSearchOptions, PetSearchOptions, ShelterSearchOptions, ShelterPetSearchOptions, ShelterSearchByBreedOptions } from './models';
import { PetFinderFactory } from './pet-finder-factory';

@Injectable()
export class PetFinderService {
  private baseUrl = '~/offline/';

  constructor(private http: HttpClient) {
  }

  /** 
   * Returns a list of breeds for a particular animal.
   * @param animal type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry): for a safe list values use Options.animal
   */
  public breedList(animal: string): Promise<string[]> {
    throw new Error('not implemented for offline');
  }

  /**
   * Returns a record for a single pet.
   * @param id 
   */
  public getPet(id: string | number): Promise<Pet> {
    return this.callPetFinder('one-pet.json')
    .pipe(
      map(result => PetFinderFactory.petFromRaw(result.pet))
    ).toPromise();
  }

  /**
   * Returns an id for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Random Search Options, which include: animal, breed, location, sex, shelterId, size
   */
  public getRandomPetId(options: RandomSearchOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => { return 42; });
  }

  /**
   * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Search Options, which include: animal, breed, location, sex, shelterId, size
   * @param provideDescription determines whether the pet description should be provided
   */
  public getRandomPet(options: RandomSearchOptions = {}, provideDescription: boolean = true): Promise<Pet> {
    return this.callPetFinder('one-pet.json')
    .pipe(
      map(result => PetFinderFactory.petFromRaw(result.pet))
    ).toPromise();

  }

  /**
   * Searches for pets according to the criteria you provde and returns a collection of pet records matching your search.
   * The results will contain at most count records per query, and a lastOffset tag.
   * To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
   * @param location the ZIP/postal code or city and state the animal should be located (NOTE: the closest possible animal will be selected)
   * @param options a set of Search Options, which include: age, animal, breed, count, offset, output, sex, shelterId, size
   */
  public findPets(location: string, options: PetSearchOptions): Promise<Pet[]> {
    const requiredParams = { location };

    return this.callPetFinder('pets-boston.json')
    .pipe(
      map(result => {
        if (result.pets === undefined) {
          return [];
        }
        return result.pets.pet.map(pet => PetFinderFactory.petFromRaw(pet));
      })
    )
    .toPromise();
  }
  
  /**
   * Returns a list of pet records for an individual shelter.
   * @param id shelter ID (e.g. NJ94)
   * @param options a set of Search Options, which include: count, offset, output, status
   */
  public findShelterPets(id: string | number, options: ShelterPetSearchOptions = {}): Promise<Pet[]> {
    const requiredParams = { location };

    //test offline mode:
    return this.callPetFinder('pets-boston.json')
    .pipe(
      map(result => {
        if (result.pets === undefined) {
          return [];
        }
        return result.pets.pet.map(pet => PetFinderFactory.petFromRaw(pet));
      })
    ).toPromise();
  }

  /**
   * Returns a collection of shelter records matching your search criteria.
   * @param location the ZIP/postal code or city and state where the search should begin
   * @param options a set of Search Options, which include: count, name, offset
   */
  public findShelters(location: string, options: ShelterSearchOptions = {}): Promise<Shelter[]> {
    throw new Error('not implemented for offline');
  }

  /**
   * Returns a record for a single shelter.
   * @param id shelter ID (e.g. NJ94)
   */
  public getShelter(id: string | number): Promise<Shelter> {
    throw new Error('not implemented for offline');
  }

  /**
   * Returns a list of shelters, listing animals of a particular breed.
   * WARNING: Shelter name is not returned!
   * @param animal type of animal, valid values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry. For a safe list of values use Options.animal
   * @param breed breed of animal, use breedList() for a list of valid breeds
   * @param options a set of Search Options, which include: count, offset 
   */
  public findSheltersByBreed(animal:string, breed: string, options: ShelterSearchByBreedOptions = {}): Promise<Shelter[]> {
      throw new Error('not implemented for offline');
  }

  /**
   * Performs the http get from the api.petfinder.com and returns the object containing the response.
   * @param method the name of the api method to call
   * @param params an object containing the required parameters
   * @param options an object containing optional parameters
   */
  private callPetFinder(method: string, params: any = {}, options: any = {}): Observable<any> {
    return this.http.get(
      this.baseUrl + method
    ).pipe(
      map((data: any) => data.petfinder)
    );
  }
}
