import { Pet, Media, Contact, Shelter } from './models';
import { RawPet, $t } from './models/raw-pet.model';

export class PetFinderFactory {
  static petFromRaw(rawPet: RawPet): Pet {
    return new Pet(
      (rawPet.id.$t) ? rawPet.id.$t : undefined,
      (rawPet.name.$t) ? rawPet.name.$t : undefined,
      (rawPet.animal.$t) ? rawPet.animal.$t : undefined,
      PetFinderFactory.extractBreeds(rawPet),
      (rawPet.mix.$t) ? rawPet.mix.$t === 'yes' : undefined,
      (rawPet.age.$t) ? rawPet.age.$t : undefined,
      (rawPet.sex.$t) ? rawPet.sex.$t : undefined,
      (rawPet.size.$t) ? rawPet.size.$t : undefined,
      (rawPet.description.$t) ? rawPet.description.$t : undefined,
      PetFinderFactory.extractOptions(rawPet),
      (rawPet.status.$t) ? rawPet.status.$t : undefined,
      (rawPet.lastUpdate.$t) ? new Date(rawPet.lastUpdate.$t) : undefined,
      (rawPet.media.photos) ? PetFinderFactory.mediaFromRaw(rawPet.media) : PetFinderFactory.mediaFromEmpty(),
      (rawPet.contact) ? PetFinderFactory.contactFromRaw(rawPet.contact) : undefined,
      (rawPet.shelterId.$t) ? rawPet.shelterId.$t : undefined,
      (rawPet.shelterPetId.$t) ? rawPet.shelterPetId.$t : undefined,
    );
  }

  static extractBreeds(pet: RawPet): string[] {
    // if no breeds provided then return an empty array
    if (!pet.breeds.breed) {
      return [];
    }

    if (Array.isArray(pet.breeds.breed)) {
      return pet.breeds.breed.map(breed => breed.$t);
    }

    return [pet.breeds.breed.$t];
  }

  static extractOptions(pet: RawPet): string[] {
    // if no options provided then return an empty array
    if (!pet.options.option) {
      return [];
    }

    if (Array.isArray(pet.options.option)) {
      return pet.options.option.map(option => option.$t);
    }

    return [pet.options.option.$t];
  }

  static contactFromRaw(rawContact: any): Contact {
    return new Contact(
      (rawContact.city.$t) ? rawContact.city.$t : undefined,
      (rawContact.address1.$t) ? rawContact.address1.$t : undefined,
      (rawContact.address2.$t) ? rawContact.address2.$t : undefined,
      (rawContact.state.$t) ? rawContact.state.$t : undefined,
      (rawContact.zip.$t) ? rawContact.zip.$t : undefined,
      (rawContact.phone.$t) ? rawContact.phone.$t : undefined,
      (rawContact.fax.$t) ? rawContact.fax.$t : undefined,
      (rawContact.email.$t) ? rawContact.email.$t : undefined,
    );
  }

  static mediaFromRaw(rawMedia: any): Media {
    return new Media(
      rawMedia.photos.photo
    );
  }

  static mediaFromEmpty(): Media {
    return new Media([]);
  }

  static shelterFromRaw(rawShelter: any): Shelter {
    return new Shelter(
      (rawShelter.id.$t) ? rawShelter.id.$t : undefined,
      (rawShelter.name.$t) ? rawShelter.name.$t : undefined,
      (rawShelter.address1.$t) ? rawShelter.address1.$t : undefined,
      (rawShelter.address2.$t) ? rawShelter.address2.$t : undefined,
      (rawShelter.city.$t) ? rawShelter.city.$t : undefined,
      (rawShelter.state.$t) ? rawShelter.state.$t : undefined,
      (rawShelter.country.$t) ? rawShelter.country.$t : undefined,
      (rawShelter.latitude.$t) ? rawShelter.latitude.$t : undefined,
      (rawShelter.longitude.$t) ? rawShelter.longitude.$t  : undefined,
      (rawShelter.phone.$t) ? rawShelter.phone.$t : undefined,
      (rawShelter.fax.$t) ? rawShelter.fax.$t : undefined,
      (rawShelter.email.$t) ? rawShelter.email.$t : undefined
    );
  }
}
