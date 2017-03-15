"use strict";
class Pet {
    constructor(id, name, animal, // Pet type ,possible values: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
        breeds, mix, // Indicates wheter the pet is a mixed breed or not 
        age, // Possible values: Baby, Young, Adult, Senior
        sex, //  Possible values: m or f
        size, // Possible values: S, M, L, XL
        description, options, // Addtional info about the pet, like: vacinations
        status, // Possible values: A=adoptable, H=hold, P=pending, X=adopted/removed
        lastUpdate, media, contact, // Shelter contact info that holds the pet
        shelterId, shelterPetId) {
        this.id = id;
        this.name = name;
        this.animal = animal;
        this.breeds = breeds;
        this.mix = mix;
        this.age = age;
        this.sex = sex;
        this.size = size;
        this.description = description;
        this.options = options;
        this.status = status;
        this.lastUpdate = lastUpdate;
        this.media = media;
        this.contact = contact;
        this.shelterId = shelterId;
        this.shelterPetId = shelterPetId;
    }
    ;
}
exports.Pet = Pet;
//# sourceMappingURL=pet.model.js.map