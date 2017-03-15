"use strict";
class Options {
}
Options.ageArray = ['Baby', 'Young', 'Adult', 'Senior'];
Options.animalArray = ['barnyard', 'bird', 'cat', 'dog', 'horse', 'pig', 'reptile', 'smallfurry'];
Options.sexArray = ['M', 'F'];
Options.sizeArray = ['S', 'M', 'L', 'XL'];
/** age of the animal (Baby, Young, Adult, Senior) */
Options.age = {
    baby: 'Baby',
    young: 'Young',
    adult: 'Adult',
    senior: 'Senior'
};
/** type of animal (barnyard, bird, cat, dog, horse, pig, reptile, smallfurry) */
Options.animal = {
    barnyard: 'barnyard',
    bird: 'bird',
    cat: 'cat',
    dog: 'dog',
    horse: 'horse',
    pig: 'pig',
    reptile: 'reptile',
    smallfurry: 'smallfurry'
};
/** A=adoptable, H=hold, P=pending, X=adopted/removed */
Options.character = {
    adoptable: 'A',
    hold: 'H',
    pending: 'P',
    adopted_removed: 'X'
};
/** How much of the pet record to return: id, basic, full */
Options.output = {
    id: 'id',
    basic: 'basic',
    full: 'full'
};
/** M=male, F=female */
Options.sex = {
    male: 'M',
    female: 'F'
};
/** size of animal (S=small, M=medium, L=large, XL=extra-large) */
Options.size = {
    small: 'S',
    medium: 'M',
    large: 'L',
    extraLarge: 'XL'
};
exports.Options = Options;
//# sourceMappingURL=search-options.js.map