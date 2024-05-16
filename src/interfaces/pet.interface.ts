interface Pet {
    idPet: number;
    namePet: string;
    isActive: number;
    description: string;
    softDeleteDat: Date;
    image: string
  }

  /**
   * 
        "idPet": 2,
        "namePet": "cloe",
        "pet": "cat",
        "age": 8,
        "description": "linda",
        "image": "images.jpg",
        "createdAt": "2024-05-14T15:36:56.137Z",
        "updateAt": "2024-05-14T15:36:56.174Z",
        "isActive": 1,
        "softDeleteDate": "2024-04-12T17:31:33.000Z",
        "userIdFk": 2,
        "idPostFk": 2,
        "breed": {
            "idBreed": 1,
            "nameBreed": "angora",
            "isActive": 1,
            "softDeleteDate": "2024-04-12T17:31:34.000Z"
   */