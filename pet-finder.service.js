"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const models_1 = require("./models");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
let PetFinderService = class PetFinderService {
    constructor(http) {
        this.http = http;
        this.apiKey = '3b3fe2619dfd3c4e94c2d7efd24592e1';
        this.baseUrl = 'https://api.petfinder.com/';
    }
    /**
     * Returns a list of breeds for a particular animal.
     * @param animal type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry): for a safe list values use Options.animal
     */
    breedList(animal) {
        const requiredParams = { animal };
        return this.callPetFinder('breed.list', requiredParams)
            .map(petfinder => petfinder.breeds.breed
            .map(breed => breed.$t))
            .toPromise();
    }
    /**
     * Returns a record for a single pet.
     * @param id
     */
    getPet(id) {
        return this.callPetFinder('pet.get', { id })
            .map(result => models_1.PetFinderFactory.petFromRaw(result.pet))
            .toPromise();
    }
    /**
     * Returns an id for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
     * @param options a set of Random Search Options, which include: animal, breed, location, sex, shelterId, size
     */
    getRandomPetId(options = {}) {
        const requiredParams = {
            output: models_1.Options.output.id
        };
        return this.callPetFinder('pet.getRandom', requiredParams, options)
            .map(result => result.petIds.id.$t)
            .toPromise();
    }
    /**
     * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
     * @param options a set of Search Options, which include: animal, breed, location, sex, shelterId, size
     * @param provideDescription determines whether the pet description should be provided
     */
    getRandomPet(options = {}, provideDescription = true) {
        const requiredParams = {
            output: (provideDescription) ? models_1.Options.output.full : models_1.Options.output.basic
        };
        return this.callPetFinder('pet.getRandom', requiredParams, options)
            .map(result => models_1.PetFinderFactory.petFromRaw(result.pet))
            .toPromise();
    }
    /**
     * Searches for pets according to the criteria you provde and returns a collection of pet records matching your search.
     * The results will contain at most count records per query, and a lastOffset tag.
     * To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
     * @param location the ZIP/postal code or city and state the animal should be located (NOTE: the closest possible animal will be selected)
     * @param options a set of Search Options, which include: age, animal, breed, count, offset, output, sex, shelterId, size
     */
    findPets(location, options) {
        const requiredParams = { location };
        return this.callPetFinder('pet.find', requiredParams, options)
            .map(result => {
            if (result.pets === undefined) {
                return [];
            }
            return result.pets.pet.map(pet => models_1.PetFinderFactory.petFromRaw(pet));
        })
            .toPromise();
    }
    /**
     * Returns a list of pet records for an individual shelter.
     * @param id shelter ID (e.g. NJ94)
     * @param options a set of Search Options, which include: count, offset, output, status
     */
    findShelterPets(id, options = {}) {
        const requiredParams = { id };
        return this.callPetFinder('shelter.getPets', requiredParams, options)
            .map(result => {
            if (result.pets === undefined) {
                return [];
            }
            return result.pets.pet.map(pet => models_1.PetFinderFactory.petFromRaw(pet));
        })
            .toPromise();
    }
    /**
     * Returns a collection of shelter records matching your search criteria.
     * @param location the ZIP/postal code or city and state where the search should begin
     * @param options a set of Search Options, which include: count, name, offset
     */
    findShelters(location, options = {}) {
        const requiredParams = { location };
        return this.callPetFinder('shelter.find', requiredParams, options)
            .map(result => {
            if (result.shelters === undefined) {
                return [];
            }
            return result.shelters.shelter.map(shelter => models_1.PetFinderFactory.shelterFromRaw(shelter));
        })
            .toPromise();
    }
    /**
     * Returns a record for a single shelter.
     * @param id shelter ID (e.g. NJ94)
     */
    getShelter(id) {
        const requiredParams = { id };
        return this.callPetFinder('shelter.get', requiredParams)
            .map(result => models_1.PetFinderFactory.shelterFromRaw(result.shelter))
            .toPromise();
    }
    /**
     * Returns a list of shelters, listing animals of a particular breed.
     * WARNING: Shelter name is not returned!
     * @param animal type of animal, valid values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry. For a safe list of values use Options.animal
     * @param breed breed of animal, use breedList() for a list of valid breeds
     * @param options a set of Search Options, which include: count, offset
     */
    findSheltersByBreed(animal, breed, options = {}) {
        const requiredParams = { animal, breed };
        return this.callPetFinder('shelter.listByBreed', requiredParams, options)
            .map(result => {
            if (result.shelters === undefined) {
                return [];
            }
            return result.shelters.shelter.map(shelter => models_1.PetFinderFactory.shelterFromRaw(shelter));
        })
            .toPromise();
    }
    /**
     * Performs the http get from the api.petfinder.com and returns the object containing the response.
     * @param method the name of the api method to call
     * @param params an object containing the required parameters
     * @param options an object containing optional parameters
     */
    callPetFinder(method, params = {}, options = {}) {
        let searchParams = this.buildSearchParams(params, options);
        return this.http.get(
        // `${this.baseUrl}${method}`,
        this.baseUrl + method, { search: searchParams })
            .map(response => response.json())
            .map((data) => data.petfinder)
            .do(result => {
            const status = result.header.status;
            if (status.code.$t !== '100') {
                throw new Error(status.message.$t);
            }
        });
    }
    /**
     * Constructs an http ready set of parameters based on the provided required and optional parameters.
     * @param params an object containing the required parameters
     * @param options an object containing optional parameters
     */
    buildSearchParams(params, options) {
        let searchParams = new http_1.URLSearchParams();
        searchParams.set('key', this.apiKey);
        searchParams.set('format', 'json');
        for (let key in params) {
            searchParams.set(key, params[key]);
        }
        for (let key in options) {
            searchParams.set(key, options[key]);
        }
        return searchParams;
    }
};
PetFinderService = __decorate([
    core_1.Injectable()
], PetFinderService);
exports.PetFinderService = PetFinderService;
//# sourceMappingURL=pet-finder.service.js.map