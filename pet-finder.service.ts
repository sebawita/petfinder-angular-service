import { Injectable, forwardRef, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pet, Shelter } from './models';
import { RandomSearchOptions, PetSearchOptions, ShelterSearchOptions, ShelterPetSearchOptions, ShelterSearchByBreedOptions, Options } from './models';
import { PetFinderFactory } from './pet-finder-factory';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const API_KEY_TOKEN = new InjectionToken<string>('api_key');

@Injectable()
export class PetFinderService {
  private baseUrl = 'https://api.petfinder.com/';

  constructor(@Inject(forwardRef(() => HttpClient)) private http: HttpClient, @Inject(API_KEY_TOKEN) private apiKey: string) {
}

  /**
   * Returns a list of breeds for a particular animal.
   * @param animal type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry): for a safe list values use Options.animal
   */
  public breedList(animal: string): Promise<string[]> {
    const requiredParams = { animal };

    return this.callPetFinder('breed.list', requiredParams)
    .pipe(map(petfinder => {
      if (petfinder.breeds.breed) {
        return petfinder.breeds.breed
        .map(breed => breed.$t)
      }
      return [];
    }))
    .toPromise();
  }

  /**
   * Returns a record for a single pet.
   * @param id
   */
  public getPet(id: string | number): Promise<Pet> {
    return this.callPetFinder('pet.get', {id})
    .pipe(map(result => PetFinderFactory.petFromRaw(result.pet)))
    .toPromise();
  }

  /**
   * Returns an id for a randomly selected pet.
   * You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Random Search Options, which include: animal, breed, location, sex, shelterId, size
   */
  public getRandomPetId(options: RandomSearchOptions = {}): Promise<number> {
    const requiredParams = {
      output: Options.output.id
    };

    return this.callPetFinder('pet.getRandom', requiredParams, options)
    .pipe(map(result => result.petIds.id.$t))
    .toPromise();
  }

  /**
   * Returns a record for a randomly selected pet.
   * You can choose the characteristics of the pet you want returned using the various arguments to this method.
   * @param options a set of Search Options, which include: animal, breed, location, sex, shelterId, size
   * @param provideDescription determines whether the pet description should be provided
   */
  public getRandomPet(options: RandomSearchOptions = {}, provideDescription: boolean = true): Promise<Pet> {
    const requiredParams = {
      output: (provideDescription) ? Options.output.full : Options.output.basic
    };

    return this.callPetFinder('pet.getRandom', requiredParams, options)
    .pipe(map(result =>  PetFinderFactory.petFromRaw(result.pet)))
    .toPromise();
  }

  /**
   * Searches for pets according to the criteria you provde and returns a collection of pet records matching your search.
   * The results will contain at most count records per query, and a lastOffset tag.
   * To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
   * @param location the ZIP/postal code or city and state the animal should be located (NOTE: the closest possible animal will be selected)
   * @param options a set of Search Options, which include: age, animal, breed, count, offset, output, sex, shelterId, size
   */
  public findPets(location: string, options: PetSearchOptions = {}): Promise<Pet[]> {
    const requiredParams = { location };

    return this.callPetFinder('pet.find', requiredParams, options)
    .pipe(map(result => {
      if (result.pets === undefined || result.pets.pet === undefined) {
        return [];
      }

      if (result.pets.pet.length > 0) {
        return result.pets.pet.map(pet => PetFinderFactory.petFromRaw(pet));
      }

      return [PetFinderFactory.petFromRaw(result.pets.pet)];
    }))
    .toPromise();
  }

  /**
   * Returns a list of pet records for an individual shelter.
   * @param id shelter ID (e.g. NJ94)
   * @param options a set of Search Options, which include: count, offset, output, status
   */
  public findShelterPets(id: string | number, options: ShelterPetSearchOptions = {}): Promise<Pet[]> {
    const requiredParams = { id };

    return this.callPetFinder('shelter.getPets', requiredParams, options)
    .pipe(map(result => {
      if (result.pets === undefined) {
        return [];
      }

      // if multiple pets returned, then pet is an array
      if (result.pets.pet.length > 0) {
        return result.pets.pet.map(pet => PetFinderFactory.petFromRaw(pet));
      }

      // otherwise pet is an object
      return [PetFinderFactory.petFromRaw(result.pets.pet)];
    }))
    .toPromise();
  }

  /**
   * Returns a collection of shelter records matching your search criteria.
   * @param location the ZIP/postal code or city and state where the search should begin
   * @param options a set of Search Options, which include: count, name, offset
   */
  public findShelters(location: string, options: ShelterSearchOptions = {}): Promise<Shelter[]> {
    const requiredParams = { location };

    return this.callPetFinder('shelter.find', requiredParams, options)
    .pipe(map(result => {
      if (result.shelters === undefined) {
        return [];
      }

      return result.shelters.shelter.map(shelter => PetFinderFactory.shelterFromRaw(shelter));
    }))
    .toPromise();
  }

  /**
   * Returns a record for a single shelter.
   * @param id shelter ID (e.g. NJ94)
   */
  public getShelter(id: string | number): Promise<Shelter> {
    const requiredParams = { id };

    return this.callPetFinder('shelter.get', requiredParams)
    .pipe(map(result => PetFinderFactory.shelterFromRaw(result.shelter)))
    .toPromise();
  }

  /**
   * Returns a list of shelters, listing animals of a particular breed.
   * WARNING: Shelter name is not returned!
   * @param animal type of animal, valid values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry.
   * For a safe list of values use Options.animal
   * @param breed breed of animal, use breedList() for a list of valid breeds
   * @param options a set of Search Options, which include: count, offset
   */
  public findSheltersByBreed(animal: string, breed: string, options: ShelterSearchByBreedOptions = {}): Promise<Shelter[]> {
    const requiredParams = { animal, breed };

    return this.callPetFinder('shelter.listByBreed', requiredParams, options)
    .pipe(map(result => {
      if (result.shelters === undefined) {
        return [];
      }

      return result.shelters.shelter.map(shelter =>  PetFinderFactory.shelterFromRaw(shelter));
    }))
    .toPromise();
  }

  /**
   * Performs the http get from the api.petfinder.com and returns the object containing the response.
   * @param method the name of the api method to call
   * @param params an object containing the required parameters
   * @param options an object containing optional parameters
   */
  private callPetFinder(method: string, params: any = {}, options: any = {}): Observable<any> {
    const searchParams: HttpParams = this.buildSearchParams(params, options);

    return this.http.get(
      // `${this.baseUrl}${method}`,
      this.baseUrl + method,
      { params: searchParams }
    )
    .pipe(
      map((data: any) => data.petfinder),
      tap(result => {
        const status = result.header.status;
        if (status.code.$t !== '100') {
          throw new Error(status.message.$t);
        }
      })
    )
  }

  /**
   * Constructs an http ready set of parameters based on the provided required and optional parameters.
   * @param params an object containing the required parameters
   * @param options an object containing optional parameters
   */
  private buildSearchParams(params: any, options: any): HttpParams {
    let searchParams: HttpParams = new HttpParams();
    searchParams = searchParams.append('key', this.apiKey);
    searchParams = searchParams.append('format', 'json');

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams = searchParams.append(key, params[key]);
      }
    }

    for (const key in options)  {
      if (options.hasOwnProperty(key)) {
        searchParams = searchParams.append(key, options[key]);
      }
    }

    return searchParams;
  }
}
