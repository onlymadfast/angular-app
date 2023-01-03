export class Address {

  constructor(id: string, created: string,
              country: string, city: string,
              zip: string, street: string,
              house: string, appartment: string) {
    this.id = id;
    this.created = created;
    this.country = country;
    this.city = city;
    this.zip = zip;
    this.street = street;
    this.house = house;
    this.apartment = appartment;
  }

  id: string;
  created: string;
  country: string;
  city: string;
  zip: string;
  street: string;
  house: string;
  apartment: string;

}
