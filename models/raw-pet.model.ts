import { Contact } from './contact.model';
import { Media } from './media.model';

export interface RawPet {
  id: $t<string>
  name: $t<string>
  animal: $t<string> // Pet type ,possible values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
  breeds: RawBreeds
  // mix: $t<string> // Indicates wheter the pet is a mixed breed or not 
  mix: $t<string> // Indicates wheter the pet is a mixed breed or not 
  age: $t<string> // Possible values: Baby, Young, Adult, Senior
  sex: $t<string> //  Possible values: m or f
  size: $t<string> // Possible values: S, M, L, XL
  description: $t<string>
  options: RawOptions // Addtional info about the pet, like: vacinations
  status: $t<string> // Possible values: A=adoptable, H=hold, P=pending, X=adopted/removed
  lastUpdate: $t<Date>
  media: RawMedia
  contact: Contact // Shelter contact info that holds the pet
  shelterId: $t<string>
  shelterPetId: $t<string>
}

export interface RawBreeds {
  breed: $t<string>[] | $t<string>;
}

export interface RawOptions {
  option: $t<string>[] | $t<string>;
}

export interface RawMedia {
  photos: any[]
}

export interface $t<T> {
  $t: T;
}

